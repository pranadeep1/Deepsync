// Chatbot Component for DeepSync
// This script adds an intelligent chatbot to any page it's included on
// The chatbot uses an enhanced knowledge base to provide helpful responses about
// productivity techniques and DeepSync features

document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot HTML structure
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chatbot-toggle">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chatbot-panel">
                <div class="chatbot-header">
                    <h3>DeepSync Assistant</h3>
                    <div class="chatbot-controls">
                        <button class="minimize-btn"><i class="fas fa-minus"></i></button>
                        <button class="close-btn"><i class="fas fa-times"></i></button>
                    </div>
                </div>
                <div class="chatbot-messages">
                    <div class="message bot-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>Hello! I'm your DeepSync Assistant. I can help with productivity techniques, using DeepSync features, and troubleshooting. Try asking me about the Pomodoro technique, focus tips, or how to use any of our tools!</p>
                        </div>
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" id="chat-input" placeholder="Type your message here...">
                    <button id="send-btn"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;
    
    // Create styles
    const chatbotStyles = `
        .chatbot-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
            font-family: 'Poppins', sans-serif;
        }
        
        .chatbot-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color, #6c63ff), var(--primary-dark, #5a52e0));
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s, box-shadow 0.3s;
            position: relative;
        }
        
        .chatbot-toggle:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }
        
        .chatbot-toggle.active {
            transform: scale(0);
            opacity: 0;
        }
        
        .chatbot-panel {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background-color: var(--card-bg, #0a0a0a);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform-origin: bottom right;
            transform: scale(0);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            border: 1px solid var(--border-color, #272727);
            color: var(--text-color, #ffffff);
        }
        
        body.light-theme .chatbot-panel {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.08);
            background-color: #ffffff;
            color: #212529;
        }
        
        .chatbot-panel.active {
            transform: scale(1);
            opacity: 1;
        }
        
        .chatbot-header {
            background: linear-gradient(135deg, var(--primary-color, #6c63ff), var(--primary-dark, #5a52e0));
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color, #272727);
        }
        
        .chatbot-header h3 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        .chatbot-controls {
            display: flex;
            gap: 10px;
        }
        
        .chatbot-controls button {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            cursor: pointer;
            font-size: 14px;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
        }
        
        .chatbot-controls button:hover {
            color: white;
        }
        
        .chatbot-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
            background-color: var(--card-bg, #0a0a0a);
        }
        
        body.light-theme .chatbot-messages {
            background-color: #ffffff;
        }
        
        .message {
            display: flex;
            margin-bottom: 15px;
            max-width: 80%;
        }
        
        .bot-message {
            align-self: flex-start;
        }
        
        .user-message {
            align-self: flex-end;
            flex-direction: row-reverse;
        }
        
        .message-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 8px;
            flex-shrink: 0;
        }
        
        .bot-message .message-avatar {
            background: linear-gradient(135deg, var(--primary-color, #6c63ff), var(--primary-dark, #5a52e0));
            color: white;
        }
        
        .user-message .message-avatar {
            background: var(--accent-color, #00d9b8);
            color: white;
        }
        
        .message-content {
            background: var(--surface-color, #121212);
            padding: 12px 15px;
            border-radius: 15px;
            border: 1px solid var(--border-color, #272727);
        }
        
        body.light-theme .message-content {
            background: #f8f9fa;
            border: 1px solid #eee;
        }
        
        .bot-message .message-content {
            border-top-left-radius: 5px;
        }
        
        .user-message .message-content {
            border-top-right-radius: 5px;
            background-color: var(--primary-color, #6c63ff);
            color: white;
        }
        
        .message-content p {
            margin: 0;
            line-height: 1.4;
            color: var(--text-color, #ffffff);
        }
        
        body.light-theme .message-content p {
            color: #212529;
        }
        
        .user-message .message-content p {
            color: white;
        }
        
        .chatbot-input {
            display: flex;
            padding: 15px;
            border-top: 1px solid var(--border-color, #272727);
            background-color: var(--card-bg, #0a0a0a);
        }
        
        body.light-theme .chatbot-input {
            background-color: #ffffff;
            border-top: 1px solid #eee;
        }
        
        #chat-input {
            flex: 1;
            padding: 12px 15px;
            border: 1px solid var(--border-color, #272727);
            border-radius: 25px;
            outline: none;
            background-color: var(--surface-color, #121212);
            color: var(--text-color, #ffffff);
            font-family: 'Poppins', sans-serif;
            transition: border-color 0.3s;
        }
        
        body.light-theme #chat-input {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            color: #212529;
        }
        
        #chat-input:focus {
            border-color: var(--primary-color, #6c63ff);
            box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.1);
        }
        
        #send-btn {
            width: 40px;
            height: 40px;
            margin-left: 10px;
            border: none;
            border-radius: 50%;
            background-color: var(--primary-color, #6c63ff);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
        }
        
        #send-btn:hover {
            background-color: var(--primary-light, #8A84FF);
            transform: translateY(-2px);
        }
        
        #send-btn:active {
            transform: translateY(0);
        }
        
        @media (max-width: 480px) {
            .chatbot-panel {
                width: 300px;
                height: 450px;
                bottom: 70px;
                right: 0;
            }
            
            .chatbot-toggle {
                width: 50px;
                height: 50px;
                font-size: 20px;
            }
        }

    `;
    
    // Create style element and append to head
    const styleElement = document.createElement('style');
    styleElement.textContent = chatbotStyles;
    document.head.appendChild(styleElement);
    
    // Create div for chatbot and append to body
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotContainer);
    
    // Get DOM elements
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotPanel = document.querySelector('.chatbot-panel');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const closeBtn = document.querySelector('.close-btn');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.querySelector('.chatbot-messages');
    
    // Knowledge base for simple responses
    const knowledgeBase = {
        // Greetings
        'hello': 'Hello! How can I assist you today?',
        'hi': 'Hi there! How can I help you?',
        'hey': 'Hey! What can I do for you?',
        'how are you': 'I\'m doing well, thanks for asking! How can I help you?',
        'good morning': 'Good morning! How can I help you start your day productively?',
        'good afternoon': 'Good afternoon! Need help with your productivity goals today?',
        'good evening': 'Good evening! Looking for some productivity assistance?',
        
        // About chatbot
        'what can you do': 'I can help you with information about DeepSync features, productivity tips, or navigating the platform. Just ask me anything!',
        'what are you': 'I\'m DeepSync Assistant, an AI chatbot designed to help you navigate the platform and provide productivity advice.',
        'who created you': 'I was created by the DeepSync development team to assist users with productivity questions and platform navigation.',
        'how do you work': 'I work by matching your questions with my knowledge base to provide helpful information about productivity and DeepSync features.',
        
        // Help
        'help': 'I can assist with DeepSync tools, productivity techniques, or technical issues. What do you need help with?',
        'support': 'I\'m here to help! What issue are you experiencing with DeepSync?',
        'contact': 'You can reach the DeepSync team at support@deepsync.io or through the Contact Us form in the footer.',
        'feedback': 'We value your feedback! You can submit suggestions through the Feedback option in your account settings.',
        
        // DeepSync Features
        'pomodoro': 'The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. You can use our Pomodoro timer to implement this technique!',
        'pomodoro technique': 'The Pomodoro Technique involves working in focused 25-minute intervals followed by 5-minute breaks. After 4 cycles, take a longer 15-30 minute break. Our timer automates this process for you!',
        'focus shield': 'Focus Shield is a feature that blocks distracting websites during your focus sessions to help maintain productivity. You can customize which sites to block.',
        'roadmaps': 'DeepSync Roadmaps provide structured learning paths to help you master new skills and technologies. Each roadmap breaks down complex subjects into manageable steps.',
        'todo list': 'Our Todo List feature helps you organize tasks, set priorities, and track completion. It integrates with other DeepSync tools for comprehensive productivity management.',
        'dashboard': 'The Dashboard gives you an overview of your productivity metrics, recent activity, and quick access to all DeepSync tools.',
        'insights': 'The Insights feature provides detailed analytics about your productivity patterns, focus time, and accomplishments to help you optimize your workflow.',
        'streak': 'Streaks track your consecutive days of productivity. Maintaining a streak can boost motivation and help establish consistent habits.',
        
        // Productivity Tips
        'productivity tips': 'Here are some productivity tips: 1) Use the Pomodoro technique, 2) Plan your day the night before, 3) Tackle your most important task first, 4) Take regular breaks, 5) Minimize distractions with Focus Shield.',
        'procrastination': 'To overcome procrastination: 1) Break tasks into smaller steps, 2) Use the 2-minute rule for quick tasks, 3) Set specific deadlines, 4) Use our Pomodoro timer to maintain focus, 5) Remove distractions with Focus Shield.',
        'focus tips': 'To improve focus: 1) Use the Pomodoro technique, 2) Block distracting websites with Focus Shield, 3) Create a dedicated workspace, 4) Use noise-cancelling headphones or background sounds, 5) Take regular breaks.',
        'motivation': 'To boost motivation: 1) Break large goals into smaller milestones, 2) Track your progress with DeepSync streaks, 3) Reward yourself after completing tasks, 4) Visualize successful outcomes, 5) Join accountability groups.',
        'work from home': 'For productive remote work: 1) Establish a routine, 2) Create a dedicated workspace, 3) Use the Pomodoro technique, 4) Take regular breaks, 5) Set boundaries between work and personal time.',
        'morning routine': 'A productive morning routine might include: 1) Waking up at a consistent time, 2) Hydrating, 3) Physical activity, 4) Planning your day, 5) Tackling your most important task first.',
        'time management': 'Effective time management involves: 1) Prioritizing tasks, 2) Using the Pomodoro technique, 3) Time-blocking your calendar, 4) Eliminating distractions, 5) Regular reviews of your productivity.',
        'deep work': 'Deep work is the ability to focus without distraction on cognitively demanding tasks. Use our Pomodoro timer and Focus Shield to facilitate deep work sessions.',
        
        // Specific Questions
        'how to use pomodoro': 'To use our Pomodoro timer: 1) Set your work duration (default 25 min), 2) Set break durations, 3) Click Start, 4) Work until the timer rings, 5) Take a break when indicated, 6) Repeat the cycle.',
        'how to set up focus shield': 'To set up Focus Shield: 1) Go to the Focus Shield page, 2) Add websites you want to block during focus sessions, 3) Choose blocking duration, 4) Enable the feature when you need to focus.',
        'how to create a todo': 'To create a todo: 1) Navigate to the Todo List feature, 2) Click the "+" button, 3) Enter task details, 4) Set priority and deadline if needed, 5) Click Save. You can integrate todos with your Pomodoro sessions too!',
        'how to track progress': 'Track your progress using the Dashboard and Insights features. They show your focus time, completed tasks, streaks, and productivity patterns over time.',
        'how to change theme': 'To change between light and dark theme, click the theme toggle switch in the header (sun/moon icon).',
        'account settings': 'Access your account settings by clicking on your profile picture in the top-right corner and selecting "Settings" from the dropdown menu.',
        'change password': 'To change your password: 1) Go to Account Settings, 2) Select the Security tab, 3) Click "Change Password", 4) Follow the prompts to update it.',
        
        // Troubleshooting
        'timer not working': 'If the Pomodoro timer isn\'t working: 1) Check your browser notifications settings, 2) Refresh the page, 3) Clear your browser cache, 4) Try a different browser.',
        'lost my streak': 'Streaks reset if you miss a day. However, if you believe there\'s an error, contact support with details of your recent activity.',
        'site is slow': 'If the site is running slowly: 1) Check your internet connection, 2) Clear your browser cache, 3) Close unnecessary tabs, 4) Try a different browser.',
        'can\'t login': 'If you can\'t log in: 1) Verify your username/email and password, 2) Try the "Forgot Password" option, 3) Clear your browser cookies, 4) Contact support if the issue persists.',
        
        // Conversational
        'thanks': 'You\'re welcome! Is there anything else I can help you with?',
        'thank you': 'You\'re welcome! Is there anything else I can help you with?',
        'bye': 'Goodbye! Feel free to chat again if you need any assistance.',
        'goodbye': 'Bye! Have a productive day!',
        'yes': 'Great! What would you like to know more about?',
        'no': 'Alright! Is there something else I can help you with?'
    };
    

    
    // Toggle chatbot panel
    chatbotToggle.addEventListener('click', () => {
        chatbotPanel.classList.add('active');
        chatbotToggle.classList.add('active');
        chatInput.focus();
    });
    
    // Minimize chatbot
    minimizeBtn.addEventListener('click', () => {
        chatbotPanel.classList.remove('active');
        chatbotToggle.classList.remove('active');
    });
    
    // Close chatbot
    closeBtn.addEventListener('click', () => {
        chatbotPanel.classList.remove('active');
        chatbotToggle.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Get bot response after a small delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }
    
    // Add message to chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender + '-message');
        
        // Create avatar
        const avatar = document.createElement('div');
        avatar.classList.add('message-avatar');
        
        // Add appropriate icon
        const icon = document.createElement('i');
        icon.classList.add('fas');
        if (sender === 'user') {
            icon.classList.add('fa-user');
        } else {
            icon.classList.add('fa-robot');
        }
        avatar.appendChild(icon);
        
        // Create message content
        const content = document.createElement('div');
        content.classList.add('message-content');
        
        const paragraph = document.createElement('p');
        paragraph.textContent = message;
        content.appendChild(paragraph);
        
        // Assemble message
        messageElement.appendChild(avatar);
        messageElement.appendChild(content);
        
        // Add to chat
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Get bot response based on user input
    function getBotResponse(userMessage) {
        // Convert to lowercase for matching
        const lowerCaseMessage = userMessage.toLowerCase();
        
        // Check for direct matches in knowledge base
        for (const key in knowledgeBase) {
            if (lowerCaseMessage.includes(key)) {
                const response = knowledgeBase[key];
                // For certain topics, suggest follow-up questions
                return response + suggestQuestions(key);
            }
        }
        
        // Intent recognition - categorize the message
        const intents = {
            greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
            farewell: ['bye', 'goodbye', 'see you', 'later', 'farewell'],
            thanks: ['thanks', 'thank', 'appreciate', 'grateful'],
            help: ['help', 'support', 'assist', 'guidance', 'stuck'],
            features: ['feature', 'tool', 'function', 'capability', 'option'],
            
            // Feature-specific intents
            pomodoro: ['pomodoro', 'timer', 'tomato', 'time management', '25 minute', '25 min', 'work session', 'focus session', 'break time'],
            focus: ['focus', 'distraction', 'concentrate', 'attention', 'block', 'website blocker', 'shield'],
            todo: ['todo', 'task', 'list', 'checklist', 'to-do', 'to do', 'to-dos', 'todos', 'tasks'],
            roadmap: ['roadmap', 'learning', 'path', 'course', 'skill', 'learn', 'study', 'progress'],
            dashboard: ['dashboard', 'overview', 'metrics', 'statistics', 'stats', 'data', 'analytics', 'insight'],
            
            // Productivity topics
            productivity: ['productive', 'productivity', 'efficiency', 'effective', 'output', 'performance'],
            procrastination: ['procrastinate', 'procrastination', 'delay', 'putting off', 'avoid', 'lazy', 'postpone'],
            motivation: ['motivate', 'motivation', 'inspire', 'drive', 'energy', 'enthusiasm', 'excited'],
            timeManagement: ['time management', 'schedule', 'planning', 'organize time', 'time blocking', 'calendar'],
            deepWork: ['deep work', 'flow state', 'concentration', 'focused work'],
            
            // How-to questions
            howTo: ['how to', 'how do i', 'how can i', 'steps to', 'guide for', 'tutorial', 'instructions'],
            
            // Troubleshooting
            troubleshooting: ['not working', 'issue', 'problem', 'error', 'bug', 'fix', 'trouble', 'help me with', 'doesn\'t work']
        };
        
        // Check if message matches any intent
        for (const [intent, keywords] of Object.entries(intents)) {
            for (const keyword of keywords) {
                if (lowerCaseMessage.includes(keyword)) {
                    // Return response based on matched intent
                    const response = getIntentResponse(intent, lowerCaseMessage);
                    return response + suggestQuestions(intent);
                }
            }
        }
        
        // Check for specific questions or keywords for backwards compatibility
        if (lowerCaseMessage.includes('feature') || lowerCaseMessage.includes('tool')) {
            return "DeepSync offers several productivity tools: Pomodoro Timer, Focus Shield, Todo List, and Learning Roadmaps. Which one would you like to know more about?";
        }
        
        if (lowerCaseMessage.includes('time') || lowerCaseMessage.includes('focus')) {
            return "To manage your time effectively, try our Pomodoro Timer. It helps break work into focused intervals with short breaks to maintain productivity.";
        }
        
        if (lowerCaseMessage.includes('task') || lowerCaseMessage.includes('todo')) {
            return "You can manage your tasks with our Todo List feature. It allows you to create, organize, and track your tasks efficiently.";
        }
        
        if (lowerCaseMessage.includes('learn') || lowerCaseMessage.includes('roadmap')) {
            return "Our Learning Roadmaps provide structured paths to master new skills. Each roadmap breaks down complex subjects into manageable steps.";
        }
        
        if (lowerCaseMessage.includes('distract') || lowerCaseMessage.includes('block')) {
            return "Our Focus Shield feature can block distracting websites during your focus sessions to help maintain productivity.";
        }
        
        if (lowerCaseMessage.includes('streak') || lowerCaseMessage.includes('progress')) {
            return "You can view your productivity streaks and progress on the Dashboard. It provides insights into your focus time, completed tasks, and more.";
        }
        
        // Default response if no match found
        return "I'm not sure I understand. Could you rephrase your question? You can ask about our features like Pomodoro Timer, Focus Shield, Todo List, or Learning Roadmaps." + 
            suggestQuestions('default');
    }
    
    // Suggest related questions based on the current topic
    function suggestQuestions(topic) {
        const suggestions = {
            // General
            'default': "\n\nYou can try asking:\n- How does the Pomodoro timer work?\n- What productivity tips do you have?\n- How do I block distracting websites?",
            'help': "\n\nHere are some common questions:\n- How do I use the Pomodoro timer?\n- How can I track my progress?\n- What should I do if the timer isn't working?",
            
            // Features
            'pomodoro': "\n\nYou might also want to know:\n- How do I customize the timer durations?\n- How are my Pomodoro sessions tracked?\n- How do breaks work in the Pomodoro technique?",
            'focus': "\n\nRelated questions:\n- What websites should I block?\n- Can I schedule focus sessions?\n- How does Focus Shield improve productivity?",
            'todo': "\n\nYou might also ask:\n- Can I prioritize tasks?\n- How do I set deadlines?\n- Can I integrate todos with the Pomodoro timer?",
            'roadmap': "\n\nOther questions about roadmaps:\n- How do I start a new roadmap?\n- How are roadmaps structured?\n- Can I track my progress on a roadmap?",
            'dashboard': "\n\nMore about the dashboard:\n- What metrics are tracked?\n- How can I use dashboard insights?\n- How is productivity calculated?",
            
            // Productivity topics
            'productivity': "\n\nMore productivity questions:\n- How do I overcome procrastination?\n- What are good morning routines?\n- How do I maintain focus during work?",
            'procrastination': "\n\nYou might also ask:\n- How do I stay motivated?\n- What are the best focus techniques?\n- How can I break down overwhelming tasks?",
            'motivation': "\n\nRelated questions:\n- How do streaks help with motivation?\n- What are good productivity rewards?\n- How do I build consistent habits?",
            'timeManagement': "\n\nMore time management questions:\n- What is time blocking?\n- How do I prioritize tasks?\n- How much break time should I take?",
            'deepWork': "\n\nYou might also ask:\n- How long should deep work sessions be?\n- How often should I do deep work?\n- How do I eliminate distractions?",
            
            // How-to and troubleshooting don't need suggestions as they're already specific
        };
        
        // Return suggestions for the given topic or default if not found
        return suggestions[topic] || "";
    }
    
    // Get response based on intent
    function getIntentResponse(intent, message) {
        switch (intent) {
            case 'greeting':
                return "Hello! How can I help you with DeepSync today?";
                
            case 'farewell':
                return "Goodbye! Have a productive day. Feel free to chat again if you need assistance.";
                
            case 'thanks':
                return "You're welcome! Is there anything else I can help you with?";
                
            case 'help':
                return "I'm here to help! You can ask about DeepSync features, productivity techniques, or specific how-to questions. What do you need assistance with?";
                
            case 'features':
                return "DeepSync offers several productivity tools: Pomodoro Timer for focused work sessions, Focus Shield to block distractions, Todo List for task management, and Learning Roadmaps to guide your skill development. Which would you like to know more about?";
                
            case 'pomodoro':
                if (message.includes('how') || message.includes('use') || message.includes('start')) {
                    return "To use our Pomodoro timer: 1) Set your work duration (default 25 min), 2) Set break durations, 3) Click Start, 4) Work until the timer rings, 5) Take a break when indicated, 6) Repeat the cycle.";
                }
                return "The Pomodoro Technique uses focused work intervals (typically 25 minutes) followed by short breaks to maximize productivity and prevent burnout. Our timer automates this process and tracks your focus time.";
                
            case 'focus':
                if (message.includes('how') || message.includes('use') || message.includes('set')) {
                    return "To set up Focus Shield: 1) Go to the Focus Shield page, 2) Add websites you want to block during focus sessions, 3) Choose blocking duration, 4) Enable the feature when you need to focus.";
                }
                return "Focus Shield blocks distracting websites during your focus sessions. You can customize which sites to block and for how long, helping you maintain concentration on important tasks.";
                
            case 'todo':
                if (message.includes('how') || message.includes('create') || message.includes('add')) {
                    return "To create a todo: 1) Navigate to the Todo List feature, 2) Click the '+' button, 3) Enter task details, 4) Set priority and deadline if needed, 5) Click Save. You can integrate todos with your Pomodoro sessions too!";
                }
                return "Our Todo List helps you organize tasks, set priorities, and track completion. It integrates with other DeepSync tools like the Pomodoro timer for comprehensive productivity management.";
                
            case 'roadmap':
                return "DeepSync Roadmaps provide structured learning paths to help you master new skills. Each roadmap breaks down complex subjects into manageable steps with resources, milestones, and progress tracking.";
                
            case 'dashboard':
                return "The Dashboard provides an overview of your productivity metrics, including focus time, completed tasks, current streaks, and recent activity. It's your central hub for tracking progress and accessing all DeepSync tools.";
                
            case 'productivity':
                return "To boost productivity: 1) Use the Pomodoro technique for focused work, 2) Plan your day in advance, 3) Prioritize your most important tasks, 4) Minimize distractions with Focus Shield, 5) Take regular breaks, 6) Track your progress on the Dashboard.";
                
            case 'procrastination':
                return "To overcome procrastination: 1) Break tasks into smaller steps, 2) Use the 2-minute rule for quick tasks, 3) Set specific deadlines, 4) Use our Pomodoro timer to maintain focus, 5) Remove distractions with Focus Shield, 6) Reward yourself after completing tasks.";
                
            case 'motivation':
                return "To boost motivation: 1) Break large goals into smaller milestones, 2) Track your progress with DeepSync streaks, 3) Reward yourself after completing tasks, 4) Visualize successful outcomes, 5) Join accountability groups, 6) Celebrate your wins, even small ones.";
                
            case 'timeManagement':
                return "Effective time management involves: 1) Prioritizing tasks by importance and urgency, 2) Using the Pomodoro technique for focused work, 3) Time-blocking your calendar, 4) Eliminating distractions with Focus Shield, 5) Regular reviews of your productivity data on the Dashboard.";
                
            case 'deepWork':
                return "Deep work is the ability to focus without distraction on cognitively demanding tasks. To facilitate deep work: 1) Use our Pomodoro timer to structure your sessions, 2) Block distractions with Focus Shield, 3) Create a dedicated workspace, 4) Set clear goals for each session, 5) Practice regularly to build your focus muscle.";
                
            case 'howTo':
                if (message.includes('pomodoro') || message.includes('timer')) {
                    return "To use our Pomodoro timer: 1) Set your work duration (default 25 min), 2) Set break durations, 3) Click Start, 4) Work until the timer rings, 5) Take a break when indicated, 6) Repeat the cycle.";
                } else if (message.includes('focus') || message.includes('shield') || message.includes('block')) {
                    return "To set up Focus Shield: 1) Go to the Focus Shield page, 2) Add websites you want to block during focus sessions, 3) Choose blocking duration, 4) Enable the feature when you need to focus.";
                } else if (message.includes('todo') || message.includes('task')) {
                    return "To create a todo: 1) Navigate to the Todo List feature, 2) Click the '+' button, 3) Enter task details, 4) Set priority and deadline if needed, 5) Click Save. You can integrate todos with your Pomodoro sessions too!";
                } else if (message.includes('track') || message.includes('progress')) {
                    return "Track your progress using the Dashboard and Insights features. They show your focus time, completed tasks, streaks, and productivity patterns over time.";
                } else if (message.includes('theme') || message.includes('dark') || message.includes('light')) {
                    return "To change between light and dark theme, click the theme toggle switch in the header (sun/moon icon).";
                }
                return "I can help with specific how-to questions about DeepSync features. Could you specify which feature you need help with?";
                
            case 'troubleshooting':
                if (message.includes('timer') || message.includes('pomodoro')) {
                    return "If the Pomodoro timer isn't working: 1) Check your browser notifications settings, 2) Refresh the page, 3) Clear your browser cache, 4) Try a different browser.";
                } else if (message.includes('streak')) {
                    return "Streaks reset if you miss a day. However, if you believe there's an error, contact support with details of your recent activity.";
                } else if (message.includes('slow') || message.includes('performance')) {
                    return "If the site is running slowly: 1) Check your internet connection, 2) Clear your browser cache, 3) Close unnecessary tabs, 4) Try a different browser.";
                } else if (message.includes('login') || message.includes('sign')) {
                    return "If you can't log in: 1) Verify your username/email and password, 2) Try the 'Forgot Password' option, 3) Clear your browser cookies, 4) Contact support if the issue persists.";
                }
                return "I'm sorry to hear you're experiencing an issue. Could you provide more details about the problem so I can help troubleshoot?";
                
            default:
                return "I'm not sure I understand. Could you rephrase your question? You can ask about our features like Pomodoro Timer, Focus Shield, Todo List, or Learning Roadmaps.";
        }
    }
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Store chat history in sessionStorage to persist across pages
    window.addEventListener('beforeunload', () => {
        const chatHistory = chatMessages.innerHTML;
        sessionStorage.setItem('chatHistory', chatHistory);
    });
    
    // Load chat history if exists
    const savedChatHistory = sessionStorage.getItem('chatHistory');
    if (savedChatHistory) {
        chatMessages.innerHTML = savedChatHistory;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}); 