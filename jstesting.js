const taskForm = document.getElementById('task-form');
    const taskTableBody = document.getElementById('task-table-body');

    // Load tasks from localStorage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const now = new Date();
      taskTableBody.innerHTML = '';

      tasks.forEach((task, index) => {
        const taskDueDate = new Date(task.dueDate);

        if (taskDueDate >= now) {
          const row = document.createElement('tr');

          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.dueDate}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
            </td>
          `;

          taskTableBody.appendChild(row);
        }
      });
    };

    // Save tasks to localStorage
    const saveTasks = (tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add new task
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('task-title').value;
      const description = document.getElementById('task-desc').value;
      const dueDate = document.getElementById('due-date').value;

      const newTask = { title, description, dueDate };
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      tasks.push(newTask);
      saveTasks(tasks);
      loadTasks();

      taskForm.reset();
    });

    // Delete task
    const deleteTask = (index) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    };

    // Edit task
    const editTask = (index) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const task = tasks[index];

      document.getElementById('task-title').value = task.title;
      document.getElementById('task-desc').value = task.description;
      document.getElementById('due-date').value = task.dueDate;

      deleteTask(index);
    };

    // Load tasks on page load
    window.addEventListener('load', loadTasks);