// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { spawn, exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const dotenv = require('dotenv');
require('dotenv').config();

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Track focus session state
let isRunning = false;
let blockedSites = [];
let focusEndTime = null;
let hostsBackup = null;
const HOSTS_PATH = os.platform() === 'win32' 
    ? 'C:/Windows/System32/drivers/etc/hosts' 
    : '/etc/hosts';

// For demo purposes - in-memory users
const demoUsers = [
    {
        _id: '1',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
        username: 'demo',
        password: '$2a$10$aNAw42MJEZItdHBFpO3Xb.2MYJqzO6YymRBRbTXe3hIEALqWUzVT6' // hashed 'password'
    }
];

// Connect to MongoDB (try but don't require)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deepsync';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Running in demo mode without database connection...');
});

// Define User schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// User model - conditional setup based on MongoDB connection
let User;
try {
    User = mongoose.model('User', userSchema);
} catch (error) {
    console.log('Using memory-based user management');
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(session({
    secret: process.env.SESSION_SECRET || 'deepsync-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 hour
}));

// Middleware to check if user is authenticated - Simple version
const isAuthenticated = (req, res, next) => {
    // For simple login without real authentication, allow all access
    return next();
};

// Website blocking functionality
function backupHostsFile() {
    try {
        if (fs.existsSync(HOSTS_PATH)) {
            hostsBackup = fs.readFileSync(HOSTS_PATH, 'utf8');
            console.log('Hosts file backed up successfully');
            return true;
        } else {
            console.error('Hosts file not found at:', HOSTS_PATH);
            return false;
        }
    } catch (error) {
        console.error('Error backing up hosts file:', error);
        return false;
    }
}

function restoreHostsFile() {
    try {
        if (hostsBackup) {
            fs.writeFileSync(HOSTS_PATH, hostsBackup, 'utf8');
            console.log('Hosts file restored successfully');
            return true;
        } else {
            console.error('No hosts backup found');
            return false;
        }
    } catch (error) {
        console.error('Error restoring hosts file:', error);
        return false;
    }
}

function blockWebsites(websites) {
    try {
        if (!backupHostsFile()) {
            return false;
        }

        let hostsContent = hostsBackup;
        const blockHeader = '\n\n# FocusShield Block - DeepSync\n';
        hostsContent += blockHeader;

        websites.forEach(site => {
            // Remove http(s):// if present
            let domain = site.replace(/^https?:\/\//, '');
            // Remove path if present
            domain = domain.split('/')[0];
            
            if (domain && domain.length > 0) {
                hostsContent += `127.0.0.1 ${domain}\n`;
                hostsContent += `127.0.0.1 www.${domain}\n`;
            }
        });

        fs.writeFileSync(HOSTS_PATH, hostsContent, 'utf8');
        console.log('Websites blocked successfully:', websites);
        return true;
    } catch (error) {
        console.error('Error blocking websites:', error);
        return false;
    }
}

// Run Focus Command
app.post('/run-focus', (req, res) => {
    const { action, time, task, websites } = req.body;

    console.log("Received Action:", action);
    console.log("Received Time:", time);
    console.log("Received Task:", task);
    
    if (websites && Array.isArray(websites)) {
        console.log("Websites to block:", websites);
    }

    if (action === "start" && !isRunning) {
        isRunning = true;
        
        // Calculate end time
        const durationMinutes = parseInt(time) || 25; // Default to 25 minutes
        const endTime = new Date(Date.now() + durationMinutes * 60 * 1000);
        focusEndTime = endTime;
        
        // Block websites if provided
        let blockingSuccess = true;
        if (websites && Array.isArray(websites) && websites.length > 0) {
            blockedSites = websites;
            blockingSuccess = blockWebsites(websites);
        }
        
        // Store session details
        const focusSession = {
            task,
            time: durationMinutes,
            startTime: new Date(),
            endTime,
            blockedSites: blockedSites
        };
        
        // Set a timeout to end the session
        setTimeout(() => {
            if (isRunning) {
                isRunning = false;
                // Unblock websites
                if (blockedSites.length > 0) {
                    restoreHostsFile();
                    blockedSites = [];
                }
                console.log(`Focus session '${task}' completed after ${durationMinutes} minutes`);
            }
        }, durationMinutes * 60 * 1000);
        
        res.json({ 
            success: true, 
            message: "Focus session started successfully. " + 
                    (blockingSuccess ? "Distracting websites blocked." : "Website blocking failed."),
            session: focusSession
        });

    } else if (action === "pause" && isRunning) {
        // End the focus session and restore hosts file
        isRunning = false;
        if (blockedSites.length > 0) {
            restoreHostsFile();
            blockedSites = [];
        }
        console.log("Focus session paused");
        res.json({ success: true, message: "Focus session paused successfully. Blocked websites are now accessible." });

    } else if (action === "start" && isRunning) {
        res.status(400).json({ success: false, message: "Focus session is already running." });

    } else {
        res.status(400).json({ success: false, message: "Invalid action or focus session not started yet." });
    }
});

// Get Focus Session Status
app.get('/focus-status', (req, res) => {
    if (isRunning) {
        res.json({
            isRunning,
            endTime: focusEndTime,
            blockedSites,
            timeRemaining: focusEndTime ? Math.max(0, Math.round((focusEndTime - new Date()) / 1000)) : 0
        });
    } else {
        res.json({ isRunning: false });
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', async (req, res) => {
    try {
        // Get form data - either email/password or username only
        const { email, password } = req.body;
        
        console.log(`Login attempt with: ${email ? 'Email: ' + email : 'No email provided'}`);
        
        // Simple login without real authentication
        let username = "User";
        
        // If email is provided, extract username from it
        if (email) {
            // Extract username from email (everything before @)
            if (email.includes('@')) {
                username = email.split('@')[0];
            } else {
                username = email; // If @ not found, use the whole string
            }
        }
        
        // Store user info in session
        req.session.username = username;
        if (email) req.session.email = email;
        req.session.userId = '1'; // Set a dummy userId
        
        console.log(`Login successful for: ${username}`);
        res.redirect('/dashboard');
        
    } catch (error) {
        console.error('Login error:', error);
        res.redirect('/error?code=500&message=Internal server error occurred');
    }
});

app.get('/register', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, username, password, confirm_password } = req.body;
        console.log('Registration attempt with data:', { first_name, last_name, email, username });
        
        // Validate required fields
        if (!first_name || !last_name || !email || !username || !password || !confirm_password) {
            console.log('Missing required fields');
            return res.redirect('/error?code=400&message=All fields are required');
        }

        // Validate passwords match
        if (password !== confirm_password) {
            console.log('Passwords do not match');
            return res.redirect('/error?code=400&message=Passwords do not match');
        }

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email format');
            return res.redirect('/error?code=400&message=Please enter a valid email address');
        }
        
        // Check if username exists in demo users
        const demoUserExists = demoUsers.some(u => u.username === username || u.email === email);
        if (demoUserExists) {
            console.log('Username or email already exists in demo users');
            if (demoUsers.some(u => u.email === email)) {
                return res.redirect('/error?code=400&message=This email is already registered. Please use a different email or try logging in.');
            } else {
                return res.redirect('/error?code=400&message=This username is already taken. Please choose a different username.');
            }
        }
        
        // If MongoDB is connected
        if (mongoose.connection.readyState === 1 && User) {
            try {
                // Check if email already exists
                const emailExists = await User.findOne({ email });
                if (emailExists) {
                    console.log('Email already exists in database');
                    return res.redirect('/error?code=400&message=This email is already registered. Please use a different email or try logging in.');
                }
                
                // Check if username already exists
                const usernameExists = await User.findOne({ username });
                if (usernameExists) {
                    console.log('Username already exists in database');
                    return res.redirect('/error?code=400&message=This username is already taken. Please choose a different username.');
                }
                
                // Create new user
                const newUser = new User({
                    firstName: first_name,
                    lastName: last_name,
                    email,
                    username,
                    password
                });
                
                await newUser.save();
                console.log('New user saved to database:', username);
                
                // Set session
                req.session.userId = newUser._id;
                req.session.username = username;
                req.session.email = email;
            } catch (dbError) {
                console.error('Database error during registration:', dbError);
                return res.redirect('/error?code=500&message=Database error occurred. Please try again later.');
            }
        } else {
            // Store in demo users for testing
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                
                const newUserId = (demoUsers.length + 1).toString();
                const newUser = {
                    _id: newUserId,
                    firstName: first_name,
                    lastName: last_name,
                    email,
                    username,
                    password: hashedPassword
                };
                
                demoUsers.push(newUser);
                req.session.userId = newUserId;
                req.session.username = username;
                req.session.email = email;
                console.log('New demo user created:', username);
            } catch (demoError) {
                console.error('Error creating demo user:', demoError);
                return res.redirect('/error?code=500&message=Failed to create user. Please try again later.');
            }
        }
        
        console.log('Registration successful, redirecting to dashboard');
        res.redirect('/dashboard');
        
    } catch (error) {
        console.error('Registration error:', error);
        res.redirect('/error?code=500&message=Registration failed. Please try again later.');
    }
});

app.get('/dashboard', isAuthenticated, async (req, res) => {
    // Send dashboard.html with added script to set user data in localStorage
    const username = req.session.username || 'User';
    const email = req.session.email || '';
    
    // Read the dashboard HTML file
    let dashboardHtml = fs.readFileSync(path.join(__dirname, 'dashboard.html'), 'utf8');
    
    // Add script to set the user data in localStorage
    const userDataScript = `
    <script>
        // Set the user data in localStorage
        localStorage.setItem('username', '${username}');
        localStorage.setItem('email', '${email}');
    </script>
    `;
    
    // Insert the script before the closing body tag
    dashboardHtml = dashboardHtml.replace('</body>', `${userDataScript}</body>`);
    
    // Send the modified HTML
    res.send(dashboardHtml);
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/error?code=500&message=Failed to logout');
        }
        res.redirect('/');
    });
});

app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'error.html'));
});

// Handle 404
app.use((req, res) => {
    res.status(404).redirect('/error?code=404&message=Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).redirect('/error?code=500&message=Internal server error');
});

// Clean up focus session on server shutdown
process.on('SIGINT', () => {
    if (isRunning && blockedSites.length > 0) {
        restoreHostsFile();
    }
    process.exit();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Demo user available for testing - username: demo, password: password`);
});

