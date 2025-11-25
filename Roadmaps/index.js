const roleRoadmaps = {
  frontend: [
    { title: 'HTML', topics: ['Basics', 'Forms', 'Semantic HTML', 'Accessibility', 'Web Performance', 'Custom Elements', 'HTML5 APIs'] },
    { title: 'CSS', topics: ['Selectors', 'Box Model', 'Flexbox', 'Grid', 'Animations', 'CSS Variables', 'Media Queries', 'SASS/SCSS'] },
    { title: 'JavaScript', topics: ['Syntax', 'DOM Manipulation', 'ES6+', 'Events', 'Asynchronous JavaScript', 'APIs and Fetch', 'Modules', 'Error Handling'] },
    { title: 'React', topics: ['Components', 'Props', 'State Management', 'Hooks', 'React Router', 'Context API', 'Redux', 'Testing with Jest'] }
  ],
  backend: [
    { title: 'Node.js', topics: ['Basics', 'Asynchronous Programming', 'Express', 'REST APIs', 'Socket.IO', 'Authentication', 'Testing', 'GraphQL'] },
    { title: 'Databases', topics: ['SQL Basics', 'Joins and Relationships', 'Indexing', 'NoSQL Basics', 'Aggregation Pipelines', 'Replication and Sharding', 'Database Security'] }
  ],
  fullstack: [
    { title: 'Frontend', topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'] },
    { title: 'Backend', topics: ['Node.js', 'Databases', 'API Design', 'Server-side Rendering (SSR)', 'DevOps Basics'] }
  ],
  ai: [
    { title: 'Python', topics: ['Basics', 'Libraries: NumPy, Pandas', 'Data Cleaning', 'Matplotlib', 'Scikit-learn'] },
    { title: 'ML', topics: ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning with TensorFlow/PyTorch', 'Model Deployment'] },
    { title: 'NLP', topics: ['Text Preprocessing', 'Tokenization', 'Transformers (BERT, GPT)', 'Sentiment Analysis', 'Named Entity Recognition (NER)'] }
  ],
  aws: [
    { title: 'Basics', topics: ['EC2', 'S3', 'RDS', 'IAM', 'AWS CLI'] },
    { title: 'Networking', topics: ['VPC', 'Load Balancers', 'Route 53', 'Security Groups', 'CloudFront'] },
    { title: 'DevOps', topics: ['CI/CD with CodePipeline', 'Serverless with Lambda', 'CloudWatch', 'Infrastructure as Code (IaC) using Terraform'] }
  ],
  cybersecurity: [
    { title: 'Network Security', topics: ['Encryption Techniques', 'Firewall Configuration', 'VPN Setup', 'Intrusion Detection Systems (IDS)', 'Penetration Testing'] },
    { title: 'Application Security', topics: ['Secure Coding Practices', 'Authentication Mechanisms', 'Session Management', 'Web Application Firewalls (WAF)'] }
  ],
  game_developer: [
    { title: 'C++', topics: ['Syntax', 'STL', 'Memory Management', 'Game Physics', 'Rendering Engines', 'Collision Detection'] },
    { title: 'Unity', topics: ['2D/3D Game Development', 'C# Scripting', 'Lighting and Shading', 'Physics Systems', 'Game Optimization'] }
  ],
  data_scientist: [
    { title: 'Python', topics: ['Data Manipulation', 'Statistics', 'Machine Learning Algorithms', 'EDA (Exploratory Data Analysis)'] },
    { title: 'R', topics: ['Statistical Modeling', 'Data Visualization', 'Hypothesis Testing', 'Time Series Analysis'] }
  ],
  blockchain: [
    { title: 'Basics', topics: ['Cryptography', 'Consensus Mechanisms', 'Blockchain Architecture', 'Smart Contracts'] },
    { title: 'Ethereum', topics: ['DApp Development', 'Solidity Basics', 'Truffle Suite', 'ERC Standards', 'Interacting with Smart Contracts'] }
  ]
};

const skillRoadmaps = {
  python: [
    { title: 'Basics', topics: ['Variables', 'Data Types', 'Functions', 'Loops', 'OOP Concepts', 'Error Handling'] },
    { title: 'Libraries', topics: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Requests', 'BeautifulSoup'] },
    { title: 'Machine Learning', topics: ['Regression Models', 'Classification Models', 'Clustering', 'Model Evaluation', 'Deep Learning Basics'] }
  ],
  java: [
    { title: 'Syntax', topics: ['Data Types', 'Functions', 'Loops', 'Classes', 'Inheritance', 'Polymorphism'] },
    { title: 'Frameworks', topics: ['Spring Basics', 'Spring Boot', 'Hibernate', 'JPA', 'Microservices'] },
    { title: 'Advanced Topics', topics: ['Multithreading', 'Garbage Collection', 'Collections Framework', 'Java Streams'] }
  ],
  cplusplus: [
    { title: 'Basics', topics: ['Syntax', 'Pointers', 'STL', 'Classes and Objects', 'Inheritance', 'Polymorphism'] },
    { title: 'Game Development', topics: ['Rendering with OpenGL', 'Physics Engines', 'AI for Games', 'Optimization Techniques'] }
  ],
  dsa: [
    { title: 'Arrays', topics: ['Linear Search', 'Binary Search', 'Sorting Algorithms', 'Two Pointers'] },
    { title: 'Linked Lists', topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Reversing a Linked List'] },
    { title: 'Trees', topics: ['Binary Trees', 'Binary Search Trees', 'AVL Trees', 'Trie'] },
    { title: 'Graphs', topics: ['DFS', 'BFS', 'Shortest Path Algorithms (Dijkstra)', 'Minimum Spanning Tree (Kruskal/Prim)'] }
  ],
  c: [
    { title: 'Basics', topics: ['Variables', 'Functions', 'Pointers', 'File I/O', 'Memory Allocation'] },
    { title: 'System Programming', topics: ['Process Management', 'Inter-Process Communication', 'Threads and Concurrency'] }
  ],
  csharp: [
    { title: 'Basics', topics: ['Variables', 'Functions', 'OOP Concepts', 'LINQ', 'File I/O'] },
    { title: 'Game Development', topics: ['Unity Basics', 'Physics Systems', 'Game Loop', '3D Development'] }
  ],
  swift: [
    { title: 'Syntax', topics: ['Variables', 'Functions', 'Classes', 'Enums', 'Protocols', 'Extensions'] },
    { title: 'iOS Development', topics: ['UIKit Basics', 'Auto Layout', 'Core Data', 'SwiftUI', 'Networking with URLSession'] }
  ]
};

// Roadmap data
const roadmaps = {
    role: [
        {
            id: 'frontend',
            title: 'Frontend Developer',
            description: 'Learn to build modern user interfaces and websites with the latest frontend technologies',
            icon: 'laptop-code',
            color: 'blue',
            difficulty: 'beginner',
            timeEstimate: '6 months',
            steps: [
                {
                    title: 'HTML & CSS Fundamentals',
                    description: 'Learn the building blocks of the web and how to style web pages',
                    resources: [
                        { name: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
                        { name: 'CSS-Tricks', url: 'https://css-tricks.com/' }
                    ]
                },
                {
                    title: 'JavaScript Basics',
                    description: 'Learn the programming language of the web',
                    resources: [
                        { name: 'JavaScript.info', url: 'https://javascript.info/' },
                        { name: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/' }
                    ]
                },
                {
                    title: 'Frontend Framework',
                    description: 'Choose a modern frontend framework like React, Vue, or Angular',
                    resources: [
                        { name: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
                        { name: 'Vue.js Guide', url: 'https://vuejs.org/v2/guide/' }
                    ]
                }
            ]
        },
        {
            id: 'backend',
            title: 'Backend Developer',
            description: 'Learn to build robust server-side applications and APIs',
            icon: 'server',
            color: 'green',
            difficulty: 'intermediate',
            timeEstimate: '8 months',
            steps: [
                {
                    title: 'Programming Fundamentals',
                    description: 'Choose a backend language like Node.js, Python, Java, or C#',
                    resources: [
                        { name: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/' },
                        { name: 'Python.org', url: 'https://www.python.org/doc/' }
                    ]
                },
                {
                    title: 'Database Fundamentals',
                    description: 'Learn SQL and NoSQL database concepts',
                    resources: [
                        { name: 'MongoDB University', url: 'https://university.mongodb.com/' },
                        { name: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/' }
                    ]
                },
                {
                    title: 'RESTful API Design',
                    description: 'Learn to design and build RESTful APIs',
                    resources: [
                        { name: 'RESTful API Design Best Practices', url: 'https://restfulapi.net/' },
                        { name: 'Express.js', url: 'https://expressjs.com/' }
                    ]
                }
            ]
        }
    ],
    skill: [
        {
            id: 'javascript',
            title: 'JavaScript Mastery',
            description: 'From basics to advanced concepts in JavaScript',
            icon: 'js-square',
            color: 'orange',
            difficulty: 'intermediate',
            timeEstimate: '4 months',
            steps: [
                {
                    title: 'JavaScript Fundamentals',
                    description: 'Learn variables, data types, functions, and control structures',
                    resources: [
                        { name: 'JavaScript.info', url: 'https://javascript.info/' },
                        { name: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/' }
                    ]
                },
                {
                    title: 'DOM Manipulation',
                    description: 'Learn to interact with the Document Object Model',
                    resources: [
                        { name: 'MDN - DOM', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model' },
                        { name: 'JavaScript DOM Manipulation', url: 'https://www.javascripttutorial.net/javascript-dom/' }
                    ]
                },
                {
                    title: 'Asynchronous JavaScript',
                    description: 'Learn Promises, async/await, and handling asynchronous code',
                    resources: [
                        { name: 'MDN - Promises', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise' },
                        { name: 'JavaScript.info - Async/await', url: 'https://javascript.info/async-await' }
                    ]
                }
            ]
        },
        {
            id: 'machine-learning',
            title: 'Machine Learning',
            description: 'Learn the fundamentals of machine learning and AI',
            icon: 'brain',
            color: 'purple',
            difficulty: 'advanced',
            timeEstimate: '12 months',
            steps: [
                {
                    title: 'Mathematics for ML',
                    description: 'Linear algebra, calculus, and statistics fundamentals',
                    resources: [
                        { name: 'Khan Academy - Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra' },
                        { name: 'Statistics and Probability', url: 'https://www.khanacademy.org/math/statistics-probability' }
                    ]
                },
                {
                    title: 'Python for Data Science',
                    description: 'Learn Python and essential libraries like NumPy, Pandas, and Matplotlib',
                    resources: [
                        { name: 'Python.org', url: 'https://www.python.org/doc/' },
                        { name: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/' }
                    ]
                },
                {
                    title: 'ML Algorithms & Frameworks',
                    description: 'Learn about different ML algorithms and frameworks like TensorFlow and PyTorch',
                    resources: [
                        { name: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/learn' },
                        { name: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/' }
                    ]
                }
            ]
        }
    ],
    custom: []
};

// DOM Elements
const roadmapContainer = document.getElementById('roadmap-container');
const detailsContainer = document.getElementById('details-container');
const detailsTitle = document.getElementById('details-title');
const detailsContent = document.getElementById('details-content');
const searchInput = document.getElementById('roadmap-search');
const createRoadmapBtn = document.getElementById('create-roadmap-btn');
const customRoadmapModal = document.getElementById('custom-roadmap-modal');
const closeModalBtn = document.querySelector('.close-modal');
const customRoadmapForm = document.getElementById('custom-roadmap-form');
const addStepBtn = document.getElementById('add-step-btn');
const cancelRoadmapBtn = document.getElementById('cancel-roadmap-btn');
const iconOptions = document.querySelectorAll('.icon-option');
const colorOptions = document.querySelectorAll('.color-option');
const saveProgressBtn = document.getElementById('save-progress-btn');
const shareRoadmapBtn = document.getElementById('share-roadmap-btn');
const printRoadmapBtn = document.getElementById('print-roadmap-btn');

// DOM Elements for Preview
const previewBtn = document.getElementById('preview-roadmap-btn');
const previewModal = document.getElementById('preview-modal');
const closePreviewBtn = document.getElementById('close-preview');
const backToEditBtn = document.getElementById('back-to-edit-btn');
const previewCreateBtn = document.getElementById('preview-create-btn');
const previewTitle = document.querySelector('.preview-title');
const previewDescription = document.querySelector('.preview-description');
const previewIcon = document.querySelector('.preview-icon i');
const previewHeader = document.querySelector('.preview-header');
const previewDifficulty = document.querySelector('.preview-difficulty span');
const previewTime = document.querySelector('.preview-time span');
const previewStepsContainer = document.getElementById('preview-steps-container');

// State
let currentCategory = 'role';
let selectedRoadmap = null;
let customRoadmaps = JSON.parse(localStorage.getItem('customRoadmaps')) || [];
roadmaps.custom = customRoadmaps;

// Initial render
renderRoadmaps(currentCategory);

// Category selector
function showCategory(category) {
    currentCategory = category;
    
    // Update active button
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        }
    });
    
    // Reset details view
    resetDetailsView();
    
    // Render roadmaps for the selected category
    renderRoadmaps(category);
}

// Render roadmaps
function renderRoadmaps(category) {
    // Clear container
    roadmapContainer.innerHTML = '';
    
    // Filter by search term if applicable
    const searchTerm = searchInput.value.toLowerCase();
    let filteredRoadmaps = roadmaps[category].filter(roadmap => {
        return roadmap.title.toLowerCase().includes(searchTerm) || 
               roadmap.description.toLowerCase().includes(searchTerm);
    });
    
    // Create and append roadmap cards
    if (filteredRoadmaps.length === 0) {
        roadmapContainer.innerHTML = `
            <div class="empty-roadmaps">
                <i class="fas fa-search"></i>
                <p>No roadmaps found</p>
                ${category === 'custom' ? 
                    '<p class="empty-hint">Create your own custom roadmap!</p>' : 
                    '<p class="empty-hint">Try a different search term or category</p>'}
            </div>
        `;
        return;
    }
    
    filteredRoadmaps.forEach(roadmap => {
      const card = document.createElement('div');
        card.className = `roadmap-card theme-${roadmap.color}`;
        card.setAttribute('data-id', roadmap.id);
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">
                    <i class="fas fa-${roadmap.icon}"></i>
                </div>
                <h3 class="card-title">${roadmap.title}</h3>
            </div>
            <div class="card-content">
                <p class="card-description">${roadmap.description}</p>
                <div class="card-meta">
                    <div class="card-difficulty ${roadmap.difficulty}">
                        <i class="fas fa-signal"></i>
                        <span>${roadmap.difficulty.charAt(0).toUpperCase() + roadmap.difficulty.slice(1)}</span>
                    </div>
                    <div class="card-time">
                        <i class="fas fa-clock"></i>
                        <span>${roadmap.timeEstimate}</span>
                    </div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            showRoadmapDetails(category, roadmap.id);
        });
        
        roadmapContainer.appendChild(card);
    });
}

// Show roadmap details
function showRoadmapDetails(category, roadmapId) {
    // Find the roadmap
    const roadmap = roadmaps[category].find(r => r.id === roadmapId);
    if (!roadmap) return;
    
    selectedRoadmap = { category, id: roadmapId };
    
    // Update details container
    detailsTitle.textContent = roadmap.title;
    detailsContent.innerHTML = '';
    
    // Create steps
    roadmap.steps.forEach((step, index) => {
        const completed = isStepCompleted(category, roadmapId, index);
        
        const stepEl = document.createElement('div');
        stepEl.className = `roadmap-step ${completed ? 'completed' : ''}`;
        stepEl.setAttribute('data-step', index);
        
        let resourcesHTML = '';
        if (step.resources && step.resources.length > 0) {
            resourcesHTML = `
                <div class="step-resources">
                    <h4 class="resources-title"><i class="fas fa-link"></i> Resources</h4>
                    <ul class="resource-list">
                        ${step.resources.map(resource => `
                            <li class="resource-item">
                                <a href="${resource.url}" class="resource-link" target="_blank" rel="noopener">${resource.name}</a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }
        
        stepEl.innerHTML = `
            <div class="step-number" data-step-index="${index + 1}"></div>
            <h3 class="step-title">${step.title}</h3>
            <p class="step-description">${step.description}</p>
            ${resourcesHTML}
            <button class="toggle-complete-btn ${completed ? 'completed' : ''}">
                ${completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
        `;
        
        // Add event listener for completion toggle
        const toggleBtn = stepEl.querySelector('.toggle-complete-btn');
        toggleBtn.addEventListener('click', () => {
            toggleStepCompletion(category, roadmapId, index);
            
            // Update UI
            const isCompleted = stepEl.classList.toggle('completed');
            toggleBtn.textContent = isCompleted ? 'Mark as Incomplete' : 'Mark as Complete';
            toggleBtn.classList.toggle('completed', isCompleted);
        });
        
        detailsContent.appendChild(stepEl);
    });
    
    // Show details container
    detailsContainer.style.display = 'block';
    
    // Scroll to details
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Reset details view
function resetDetailsView() {
    detailsTitle.textContent = 'Select a card to see its detailed roadmap';
    detailsContent.innerHTML = '';
    selectedRoadmap = null;
}

// Check if step is completed
function isStepCompleted(category, roadmapId, stepIndex) {
    const progress = JSON.parse(localStorage.getItem('roadmapProgress')) || {};
    return progress[`${category}-${roadmapId}`] && 
           progress[`${category}-${roadmapId}`].includes(stepIndex);
}

// Toggle step completion
function toggleStepCompletion(category, roadmapId, stepIndex) {
    const progress = JSON.parse(localStorage.getItem('roadmapProgress')) || {};
    const progressKey = `${category}-${roadmapId}`;
    
    if (!progress[progressKey]) {
        progress[progressKey] = [];
    }
    
    const index = progress[progressKey].indexOf(stepIndex);
    if (index === -1) {
        progress[progressKey].push(stepIndex);
    } else {
        progress[progressKey].splice(index, 1);
    }
    
    localStorage.setItem('roadmapProgress', JSON.stringify(progress));
}

// Create Custom Roadmap
function showCreateRoadmapModal() {
    customRoadmapModal.style.display = 'block';
}

function hideCreateRoadmapModal() {
    customRoadmapModal.style.display = 'none';
    customRoadmapForm.reset();
    
    // Reset steps container to just one step
    const stepsContainer = document.getElementById('steps-container');
    stepsContainer.innerHTML = `
        <div class="step-item">
            <input type="text" class="step-title" placeholder="Step 1: Title" required>
            <textarea class="step-description" placeholder="Description and resources for this step"></textarea>
            <div class="resources-section">
                <h4><i class="fas fa-link"></i> Resources <button type="button" class="add-resource-btn"><i class="fas fa-plus-circle"></i></button></h4>
                <div class="resource-list-container">
                    <p class="no-resources-message">No resources added yet</p>
                </div>
            </div>
            <button type="button" class="remove-step"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add event listener for the add resource button
    const addResourceBtn = stepsContainer.querySelector('.add-resource-btn');
    addResourceBtn.addEventListener('click', function() {
        addResourceToStep(this.closest('.step-item').querySelector('.resource-list-container'));
    });
    
    // Reset icon and color selections
    document.getElementById('roadmap-icon').value = 'rocket';
    document.getElementById('roadmap-color').value = 'blue';
    iconOptions.forEach(option => {
        option.classList.toggle('selected', option.dataset.icon === 'rocket');
    });
    colorOptions.forEach(option => {
        option.classList.toggle('selected', option.dataset.color === 'blue');
    });
}

function addStep() {
    const stepsContainer = document.getElementById('steps-container');
    const stepCount = stepsContainer.children.length + 1;
    
    const stepItem = document.createElement('div');
    stepItem.className = 'step-item';
    stepItem.innerHTML = `
        <input type="text" class="step-title" placeholder="Step ${stepCount}: Title" required>
        <textarea class="step-description" placeholder="Description and resources for this step"></textarea>
        <div class="resources-section">
            <h4><i class="fas fa-link"></i> Resources <button type="button" class="add-resource-btn"><i class="fas fa-plus-circle"></i></button></h4>
            <div class="resource-list-container">
                <p class="no-resources-message">No resources added yet</p>
            </div>
        </div>
        <button type="button" class="remove-step"><i class="fas fa-times"></i></button>
    `;
    
    // Add event listener for remove button
    const removeBtn = stepItem.querySelector('.remove-step');
    removeBtn.addEventListener('click', () => {
        stepItem.remove();
        updateStepNumbers();
    });
    
    // Add event listener for add resource button
    const addResourceBtn = stepItem.querySelector('.add-resource-btn');
    addResourceBtn.addEventListener('click', function() {
        addResourceToStep(this.closest('.step-item').querySelector('.resource-list-container'));
    });
    
    stepsContainer.appendChild(stepItem);
}

function addResourceToStep(resourceListContainer) {
    // Remove "no resources" message if it exists
    const noResourcesMsg = resourceListContainer.querySelector('.no-resources-message');
    if (noResourcesMsg) {
        noResourcesMsg.remove();
    }
    
    const resourceItem = document.createElement('div');
    resourceItem.className = 'resource-item-input';
    resourceItem.innerHTML = `
        <input type="text" class="resource-name-input" placeholder="Resource Name" required>
        <input type="url" class="resource-url-input" placeholder="URL (https://...)" required>
        <button type="button" class="remove-resource-btn"><i class="fas fa-times"></i></button>
    `;
    
    // Add event listener for remove resource button
    const removeResourceBtn = resourceItem.querySelector('.remove-resource-btn');
    removeResourceBtn.addEventListener('click', function() {
        resourceItem.remove();
        
        // If no resources left, add back the "no resources" message
        if (resourceListContainer.children.length === 0) {
            resourceListContainer.innerHTML = `<p class="no-resources-message">No resources added yet</p>`;
        }
    });
    
    resourceListContainer.appendChild(resourceItem);
    
    // Focus on the new input
    resourceItem.querySelector('.resource-name-input').focus();
}

function updateStepNumbers() {
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
        const titleInput = item.querySelector('.step-title');
        titleInput.placeholder = `Step ${index + 1}: Title`;
    });
}

function createCustomRoadmap(event) {
    event.preventDefault();
    
    // Get form values
    const title = document.getElementById('roadmap-title').value;
    const description = document.getElementById('roadmap-description').value;
    const icon = document.getElementById('roadmap-icon').value;
    const color = document.getElementById('roadmap-color').value;
    const difficulty = document.getElementById('roadmap-difficulty').value;
    const timeEstimate = document.getElementById('roadmap-time').value;
    
    // Generate unique ID
    const id = 'custom-' + Date.now();
    
    // Get steps
    const stepItems = document.querySelectorAll('.step-item');
    const steps = Array.from(stepItems).map(item => {
        const stepTitle = item.querySelector('.step-title').value;
        const stepDescription = item.querySelector('.step-description').value;
        
        // Get resources for this step
        const resourceItems = item.querySelectorAll('.resource-item-input');
        const resources = Array.from(resourceItems).map(resourceItem => {
            const resourceName = resourceItem.querySelector('.resource-name-input').value;
            const resourceUrl = resourceItem.querySelector('.resource-url-input').value;
            
            return {
                name: resourceName,
                url: resourceUrl
            };
        });
        
        return {
            title: stepTitle,
            description: stepDescription,
            resources: resources
        };
    });
    
    // Create new roadmap
    const newRoadmap = {
        id,
        title,
        description,
        icon,
        color,
        difficulty,
        timeEstimate,
        steps
    };
    
    // Add to custom roadmaps
    customRoadmaps.push(newRoadmap);
    roadmaps.custom = customRoadmaps;
    
    // Save to localStorage
    localStorage.setItem('customRoadmaps', JSON.stringify(customRoadmaps));
    
    // Hide modal
    hideCreateRoadmapModal();
    
    // Switch to custom category and render
    showCategory('custom');
    
    // Show success message
    showNotification('Custom roadmap created successfully!');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Event Listeners
searchInput.addEventListener('input', () => {
    renderRoadmaps(currentCategory);
});

createRoadmapBtn.addEventListener('click', showCreateRoadmapModal);
closeModalBtn.addEventListener('click', hideCreateRoadmapModal);
cancelRoadmapBtn.addEventListener('click', hideCreateRoadmapModal);
customRoadmapForm.addEventListener('submit', createCustomRoadmap);
addStepBtn.addEventListener('click', addStep);

// Initialize remove step buttons
document.querySelectorAll('.remove-step').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.step-item').remove();
        updateStepNumbers();
    });
});

// Initialize add resource buttons for initial step
document.querySelectorAll('.add-resource-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        addResourceToStep(this.closest('.step-item').querySelector('.resource-list-container'));
    });
});

// Icon and color selectors
iconOptions.forEach(option => {
    option.addEventListener('click', () => {
        iconOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        document.getElementById('roadmap-icon').value = option.dataset.icon;
    });
});

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        document.getElementById('roadmap-color').value = option.dataset.color;
    });
});

// Button actions in details view
saveProgressBtn.addEventListener('click', () => {
    if (!selectedRoadmap) return;
    showNotification('Progress saved successfully!');
});

shareRoadmapBtn.addEventListener('click', () => {
    if (!selectedRoadmap) return;
    
    // Create a shareable URL - in a real app this would be more sophisticated
    const shareableUrl = `${window.location.origin}${window.location.pathname}?category=${selectedRoadmap.category}&id=${selectedRoadmap.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableUrl)
        .then(() => {
            showNotification('Link copied to clipboard!');
        })
        .catch(() => {
            showNotification('Failed to copy link. Please try again.');
        });
});

printRoadmapBtn.addEventListener('click', () => {
    if (!selectedRoadmap) return;
    window.print();
});

// Check URL params for direct linking
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const id = urlParams.get('id');
    
    if (category && id && roadmaps[category]) {
        const roadmap = roadmaps[category].find(r => r.id === id);
        if (roadmap) {
            showCategory(category);
            showRoadmapDetails(category, id);
        }
    }
}

// Call on page load
checkUrlParams();

// Preview functions
function showPreview() {
    // Get current form data
    const title = document.getElementById('roadmap-title').value || 'Your Roadmap Title';
    const description = document.getElementById('roadmap-description').value || 'Your roadmap description will appear here.';
    const icon = document.getElementById('roadmap-icon').value || 'rocket';
    const color = document.getElementById('roadmap-color').value || 'blue';
    const difficulty = document.getElementById('roadmap-difficulty').value || 'beginner';
    const timeEstimate = document.getElementById('roadmap-time').value || 'Time estimate';
    
    // Update preview card
    previewTitle.textContent = title;
    previewDescription.textContent = description;
    previewIcon.className = `fas fa-${icon}`;
    previewHeader.style.background = `var(--theme-${color})`;
    previewDifficulty.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    previewDifficulty.className = ''; // Reset class
    previewDifficulty.classList.add(difficulty);
    previewTime.textContent = timeEstimate;
    
    // Update preview steps
    previewStepsContainer.innerHTML = '';
    const stepItems = document.querySelectorAll('.step-item');
    
    if (stepItems.length === 0) {
        previewStepsContainer.innerHTML = '<p class="no-steps-message">No steps added yet</p>';
    } else {
        stepItems.forEach((item, index) => {
            const stepTitle = item.querySelector('.step-title').value || `Step ${index + 1}`;
            const stepDescription = item.querySelector('.step-description').value || 'Step description';
            
            // Get resources
            const resourceItems = item.querySelectorAll('.resource-item-input');
            let resourcesHTML = '';
            
            if (resourceItems.length > 0) {
                resourcesHTML = `
                    <div class="preview-step-resources">
                        <h4><i class="fas fa-link"></i> Resources</h4>
                `;
                
                resourceItems.forEach(resourceItem => {
                    const resourceName = resourceItem.querySelector('.resource-name-input').value || 'Resource';
                    resourcesHTML += `<div class="preview-resource-item">${resourceName}</div>`;
                });
                
                resourcesHTML += '</div>';
            }
            
            const stepEl = document.createElement('div');
            stepEl.className = 'preview-step';
            stepEl.innerHTML = `
                <h4 class="preview-step-title">${stepTitle}</h4>
                <p class="preview-step-description">${stepDescription}</p>
                ${resourcesHTML}
            `;
            
            previewStepsContainer.appendChild(stepEl);
        });
    }
    
    // Show preview modal
    previewModal.style.display = 'block';
}

function hidePreview() {
    previewModal.style.display = 'none';
}

// Event listeners for preview
previewBtn.addEventListener('click', showPreview);
closePreviewBtn.addEventListener('click', hidePreview);
backToEditBtn.addEventListener('click', hidePreview);
previewCreateBtn.addEventListener('click', function() {
    hidePreview();
    // Submit the form programmatically
    customRoadmapForm.dispatchEvent(new Event('submit'));
});
