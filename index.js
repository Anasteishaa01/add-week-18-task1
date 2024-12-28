const taskInput = document.getElementById('taskInput');
        const addButton = document.getElementById('addButton');
        const taskList = document.getElementById('taskList');
        const clearButton = document.getElementById('clearButton');
        const noTasks = document.getElementById('noTasks');

        let tasks = JSON.parse(localStorage.getItem('tasks'));

        function renderTasks() {
            taskList.innerHTML = '';
            if (tasks.length === 0) {
                noTasks.style.display = 'block';
                clearButton.disabled = true;
            } else {
                noTasks.style.display = 'none';
                clearButton.disabled = false;
                tasks.forEach((task, index) => {
                    const taskDiv = document.createElement('div');
                    taskDiv.classList.add('task');
                    taskDiv.innerHTML = `
                        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                        <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.text}</span>
                        <button onclick="removeTask(${index})">Удалить</button>
                    `;
                    taskList.appendChild(taskDiv);
                });
            }
        }

        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText) {
                tasks.push({ text: taskText, completed: false });
                taskInput.value = '';
                saveTasks();
                renderTasks();
            }
        }

        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }

        function removeTask(index) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }

        function clearTasks() {
            tasks = [];
            saveTasks();
            renderTasks();
        }

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        addButton.onclick = addTask;
        clearButton.onclick = clearTasks;

        renderTasks();