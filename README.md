<div align="center">

# 🎯 DeepSync: Focus. Sync. Achieve.

### *Your Ultimate Productivity Platform for Deep Work*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.6.3-green)](https://www.mongodb.com/)

![DeepSync Logo](./media/Logo.jpg)

</div>

---

## 📖 About DeepSync

DeepSync is a **comprehensive productivity platform** designed to help users achieve a state of deep work and stay focused on what truly matters. In a world full of distractions, DeepSync creates an environment conducive to high-quality, distraction-free work by combining proven productivity tools and techniques into one seamless experience.

### ✨ Why DeepSync?

Modern life is filled with constant interruptions and digital distractions. DeepSync empowers you to:
- 🧠 **Enter Deep Focus Mode** - Eliminate distractions and achieve peak productivity
- 📚 **Learn Strategically** - Follow structured roadmaps for skill development
- ⏱️ **Manage Time Effectively** - Leverage the Pomodoro Technique for optimal focus
- ✅ **Track Progress** - Stay organized with powerful task management tools

---

## 🚀 Features

### 🗺️ Learning Roadmaps
Explore **guided learning paths** for various tech roles and skills. Whether you're learning web development, data science, or DevOps, DeepSync provides structured roadmaps to advance your career.

### ⏲️ Pomodoro Timer
Harness the power of the **Pomodoro Technique** to work in focused 25-minute intervals with strategic breaks. Boost your productivity and maintain mental clarity throughout the day.

### 📝 Todo List
Organize your tasks efficiently with our **intuitive task manager**. Prioritize work, set deadlines, and track your progress to ensure nothing falls through the cracks.

### 🛡️ Focus Shield
Block distracting websites and apps during your focus sessions with our **browser extension**. Stay on track and maintain deep concentration when it matters most.

### 👤 User Authentication
Secure **login and registration system** with encrypted passwords and session management. Your data stays private and protected.

### 📊 Interactive Dashboard
Access all your productivity tools from a **centralized dashboard**. Monitor your progress, manage tasks, and control your focus sessions from one place.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | bcryptjs, express-session |
| **Environment** | dotenv |
| **Development** | Nodemon |

---

## 📦 Installation

### Prerequisites
- **Node.js** (v14.0.0 or higher)
- **MongoDB** (local or Atlas cloud instance)
- **npm** or **yarn** package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranadeep1/Deepsync.git
   cd Deepsync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/deepsync
   SESSION_SECRET=your_super_secret_session_key_here
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For Windows (if MongoDB is installed as a service)
   net start MongoDB
   
   # Or run mongod directly
   mongod
   ```

5. **Run the application**
   
   **Production mode:**
   ```bash
   npm start
   ```
   
   **Development mode** (with auto-restart):
   ```bash
   npm run dev
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
DeepSync/
├── 📂 blocksites/              # Website blocking configurations
│   └── focus/
├── 📂 extension-helper/        # Browser extension core files
│   ├── background.js           # Extension background script
│   ├── content.js              # Content script for blocking
│   ├── manifest.json           # Extension manifest
│   └── README.md
├── 📂 extensions/              # Focus Shield extension
│   └── focus-shield-extension/
│       └── images/
├── 📂 frames/                  # UI components and frames
├── 📂 login-form/              # Login form assets
├── 📂 media/                   # Images, logos, and media files
├── 📂 Roadmaps/                # Learning roadmap resources
│   ├── index.html
│   ├── index.js
│   └── style.css
├── 📂 Time-Management/         # Time management tools
│   └── pomodoro-timer/
│       ├── index.html
│       ├── script.js
│       └── style.css
├── 📂 todo/                    # Task management system
│   └── Todo-List/
│       └── src/
│           ├── App.js
│           ├── index.html
│           ├── script.js
│           └── style.css
├── 📄 chatbot.js               # Chatbot functionality
├── 📄 dashboard.html           # User dashboard interface
├── 📄 error.html               # Error page
├── 📄 focus-shield.html        # Focus Shield settings
├── 📄 index.html               # Landing page
├── 📄 login.html               # Login page
├── 📄 register.html            # Registration page
├── 📄 script.js                # Main JavaScript file
├── 📄 server.js                # Express server & API endpoints
├── 📄 style.css                # Global styles
├── 📄 theme.js                 # Theme management
├── 📄 package.json             # Dependencies & scripts
├── 📄 .env                     # Environment variables (create this)
└── 📄 README.md                # Project documentation
```

---

## 🎮 Usage

### 1️⃣ Create an Account
- Navigate to the registration page
- Fill in your details and create a secure password
- Log in with your credentials

### 2️⃣ Explore Learning Roadmaps
- Browse curated learning paths for different tech domains
- Follow step-by-step guides to master new skills
- Track your learning progress

### 3️⃣ Use the Pomodoro Timer
- Set a 25-minute focus session
- Work without distractions until the timer completes
- Take a 5-minute break, then repeat
- After 4 sessions, take a longer 15-30 minute break

### 4️⃣ Manage Your Tasks
- Add new tasks with descriptions and deadlines
- Organize tasks by priority
- Mark tasks as complete when finished
- Review your productivity metrics

### 5️⃣ Activate Focus Shield
- Install the Focus Shield browser extension
- Configure websites to block during focus sessions
- Enable blocking when you start a Pomodoro session
- Stay focused without digital distractions

---

## 🔐 Security Features

- **Password Encryption**: All passwords are hashed using bcryptjs
- **Session Management**: Secure session handling with express-session
- **Environment Variables**: Sensitive data stored in `.env` files
- **Input Validation**: Protection against injection attacks

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
   ```bash
   git fork https://github.com/pranadeep1/Deepsync.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow the existing code style
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes in detail
   - Reference any related issues
   - Wait for review and feedback

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea for improvement? We'd love to hear from you!

- 🐛 **Report bugs** using the [Issues](https://github.com/pranadeep1/Deepsync/issues) page
- 💡 **Request features** by opening a new issue with the "enhancement" label
- 📧 **Contact us** for other inquiries

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Productivity Methodologies**: Inspired by Cal Newport's Deep Work, Francesco Cirillo's Pomodoro Technique, and David Allen's Getting Things Done
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Images**: [Unsplash](https://unsplash.com/)
- **Community**: Thanks to all contributors and users who make DeepSync better

---

## 🗺️ Roadmap

### Coming Soon
- [ ] Mobile application (iOS & Android)
- [ ] Team collaboration features
- [ ] Advanced analytics and insights
- [ ] Integration with calendar apps
- [ ] Customizable themes and UI
- [ ] Voice commands and AI assistant
- [ ] Export reports and data visualization

---

## 📊 Project Status

🟢 **Active Development** - We're continuously improving DeepSync with new features and bug fixes.

---

<div align="center">

### 💪 **DeepSync** - Work Smarter, Not Harder

*Modern life is distracting, but deep focus can be simple.*

**[Get Started](http://localhost:3000)** • **[Documentation](#)** • **[Report Bug](https://github.com/pranadeep1/Deepsync/issues)**

---

Made with ❤️ by pranadeep1

⭐ **Star this repo** if you find it helpful!

</div>


