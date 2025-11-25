document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    const tasksLeftEl = document.getElementById('tasks-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categorySelect = document.getElementById('task-category');
    
    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    let draggedTask = null;
    
    // Task categories
    const categories = [
        { id: 'work', name: 'Work', icon: 'briefcase' },
        { id: 'personal', name: 'Personal', icon: 'user' },
        { id: 'study', name: 'Study', icon: 'book' },
        { id: 'health', name: 'Health', icon: 'heartbeat' },
        { id: 'shopping', name: 'Shopping', icon: 'shopping-cart' },
        { id: 'other', name: 'Other', icon: 'tag' }
    ];
    
    // Initialize categories dropdown
    function initCategories() {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.innerHTML = `<i class="fas fa-${category.icon}"></i> ${category.name}`;
            categorySelect.appendChild(option);
        });
    }
    
    // Initial render
    initCategories();
    renderTasks();
    updateTasksLeft();
    
    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Set current filter
            currentFilter = btn.dataset.filter;
            
            // Render filtered tasks
            renderTasks();
        });
    });
    
    // Drag and drop functionality
    todoList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragOverItem = e.target.closest('.todo-item');
        if (dragOverItem && draggedTask && dragOverItem !== draggedTask) {
            // Determine whether to place before or after based on mouse position
            const rect = dragOverItem.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            
            if (e.clientY < midpoint) {
                todoList.insertBefore(draggedTask, dragOverItem);
            } else {
                todoList.insertBefore(draggedTask, dragOverItem.nextSibling);
            }
            
            updateTaskOrder();
        }
    });
    
    // Functions
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') return;
        
        const category = categorySelect.value || 'other';
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            category: category,
            createdAt: new Date(),
            order: tasks.length // Default order is at the end
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        updateTasksLeft();
        
        // Show success notification
        showNotification('Task added successfully!', 'success');
        
        // Clear input
        taskInput.value = '';
        taskInput.focus();
    }
    
    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
        updateTasksLeft();
    }
    
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateTasksLeft();
        
        // Show notification
        showNotification('Task deleted', 'warning');
    }
    
    function clearCompleted() {
        const completedCount = tasks.filter(task => task.completed).length;
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateTasksLeft();
        
        if (completedCount > 0) {
            showNotification(`Cleared ${completedCount} completed task(s)`, 'info');
        }
    }
    
    function updateTaskOrder() {
        // Get all task elements in their current order
        const taskElements = todoList.querySelectorAll('.todo-item');
        
        // Create a map of id -> task for quick lookups
        const taskMap = tasks.reduce((map, task) => {
            map[task.id] = task;
            return map;
        }, {});
        
        // Update the order property of each task based on DOM order
        let newOrder = 0;
        taskElements.forEach(el => {
            const taskId = parseInt(el.dataset.id);
            if (taskMap[taskId]) {
                taskMap[taskId].order = newOrder++;
            }
        });
        
        // Sort tasks by their new order
        tasks.sort((a, b) => a.order - b.order);
        
        // Save the updated order
        saveTasks();
    }
    
    function renderTasks() {
        // Clear list
        todoList.innerHTML = '';
        
        // Filter tasks based on current filter
        let filteredTasks = tasks;
        
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        // Sort tasks by order first, then by creation time if order is the same
        filteredTasks.sort((a, b) => {
            if (a.order !== b.order) {
                return a.order - b.order;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        // Create and append task elements
        filteredTasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `todo-item ${task.completed ? 'completed' : ''}`;
            taskEl.setAttribute('draggable', 'true');
            taskEl.dataset.id = task.id;
            
            // Find category details
            const category = categories.find(c => c.id === task.category) || categories[5]; // Default to 'Other'
            
            taskEl.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-category-icon"><i class="fas fa-${category.icon}"></i></span>
                <span class="task-text">${task.text}</span>
                <button class="task-delete"><i class="fas fa-times"></i></button>
            `;
            
            // Add event listeners
            const checkbox = taskEl.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => toggleTask(task.id));
            
            const deleteBtn = taskEl.querySelector('.task-delete');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(task.id);
            });
            
            // Drag and drop event listeners
            taskEl.addEventListener('dragstart', (e) => {
                draggedTask = taskEl;
                setTimeout(() => {
                    taskEl.classList.add('dragging');
                }, 0);
            });
            
            taskEl.addEventListener('dragend', () => {
                taskEl.classList.remove('dragging');
                draggedTask = null;
            });
            
            todoList.appendChild(taskEl);
        });
        
        // Show empty state if no tasks
        if (filteredTasks.length === 0) {
            const emptyEl = document.createElement('div');
            emptyEl.className = 'empty-list';
            
            let emptyMessage = '';
            if (currentFilter === 'all') {
                emptyMessage = `
                    <i class="fas fa-clipboard-list"></i>
                    <p>Your task list is empty</p>
                    <p class="empty-hint">Add some tasks to get started!</p>
                `;
            } else if (currentFilter === 'active') {
                emptyMessage = `
                    <i class="fas fa-check-circle"></i>
                    <p>All tasks completed!</p>
                    <p class="empty-hint">Great job!</p>
                `;
            } else if (currentFilter === 'completed') {
                emptyMessage = `
                    <i class="fas fa-tasks"></i>
                    <p>No completed tasks</p>
                    <p class="empty-hint">Tasks you complete will appear here</p>
                `;
            }
            
            emptyEl.innerHTML = emptyMessage;
            todoList.appendChild(emptyEl);
        }
    }
    
    function updateTasksLeft() {
        const activeTasks = tasks.filter(task => !task.completed).length;
        tasksLeftEl.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on notification type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        if (type === 'error') icon = 'times-circle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}); 