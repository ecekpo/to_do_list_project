import './styles/styles.css';

const refresh = document.querySelector('.uil-sync');
const input = document.querySelector('input');
const todosParent = document.querySelector('.todos-container');
const clearCompletedTaskBtn = document.querySelector('button');

// Object
class MyObject {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const myArray = [];

// editTodo
const editTodo = (todoContainer, todo) => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editInput';
  editInput.value = todo.textContent;
  todoContainer.replaceChild(editInput, todo);
  editInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const todoContainers = document.querySelectorAll('.todoContainer');
      const localData = JSON.parse(localStorage.getItem('list'));

      for (let i = 0; i < todoContainers.length; i += 1) {
        if (todoContainers[i].classList.contains('completedTask')) {
          localData[i].description = editInput.value;
          localStorage.setItem('list', JSON.stringify(localData));
        }
      }
      editInput.parentElement.classList.remove('completedTask');
      todoContainer.replaceChild(todo, editInput);
      todo.textContent = editInput.value;
    }
  });

  // Delete Tasks
  const removeIcons = document.querySelectorAll('.uil-trash-alt');
  removeIcons.forEach((task) => {
    task.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      deleteTask(task.parentElement);
    });
  });
};

// Function to Delete Tasks
const deleteTask = (todo) => {
  // Delete task from browser
  todosParent.removeChild(todo);

  // Delete from localStorage
  let count = 0;
  const localData = JSON.parse(localStorage.getItem('list'));
  const data = Array.from(localData).filter((task) => task.complete === false);
  // eslint-disable-next-line no-return-assign, no-multi-assign
  data.map((task) => task.index = count += 1);
  localStorage.setItem('list', JSON.stringify(data));
};
// Update Local Storage
const sendToLocalAgain = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const todos = document.querySelectorAll('span');

  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].classList.contains('checkTodo')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }

  localStorage.setItem('list', JSON.stringify(localData));
};

const getTasksFromLocStore = () => {
  const data = JSON.parse(localStorage.getItem('list'));
  // eslint-disable-next-line array-callback-return
  data.map((tasks) => {
    myArray.push(tasks);
    const todoContainer = document.createElement('div');
    todoContainer.className = 'todoContainer';
    todoContainer.innerHTML += `
        <input type='checkbox' class='checkbox'>
        <span>${tasks.description}</span>
        <i class="uil uil-ellipsis-v"></i>
        <i class="uil uil-trash-alt"></i>
    `;
    todosParent.appendChild(todoContainer);

    const editIcons = document.querySelectorAll('.uil-ellipsis-v');
    editIcons.forEach((task) => {
      task.addEventListener('click', () => {
        editTodo(todoContainer, task.previousElementSibling);
        task.parentElement.classList.add('completedTask');
      });
    });
  });

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((task) => {
    task.addEventListener('click', () => {
      task.parentElement.classList.toggle('completedTask');
      task.nextElementSibling.classList.toggle('checkTodo');
      task.parentElement.lastElementChild.classList.toggle('trash-active');
      task.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable');
      sendToLocalAgain();
    });
  });

  const removeIcons = document.querySelectorAll('.uil-trash-alt');
  removeIcons.forEach((task) => {
    task.addEventListener('click', () => {
      deleteTask(task.parentElement);
    });
  });

  localStorage.setItem('list', JSON.stringify(myArray));
};

// Add Tasks
const addTask = (todoValue) => {
  const todoContainer = document.createElement('div');
  todoContainer.className = 'todoContainer';
  todoContainer.innerHTML += `
        <input type='checkbox' class='checkbox'>
        <span>${todoValue}</span>
        <i class="uil uil-ellipsis-v"></i>
        <i class="uil uil-trash-alt"></i>
    `;
  todosParent.appendChild(todoContainer);

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((task) => {
    task.addEventListener('click', () => {
      task.parentElement.classList.toggle('completedTask');
      task.nextElementSibling.classList.toggle('checkTodo');
      task.parentElement.lastElementChild.classList.toggle('trash-active');
      task.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable');
      sendToLocalAgain();
    });
  });

  // Send Added Tasks  to Local Storage

  // New object instance
  const object = new MyObject(todoValue, false, checkbox.length - 1);
  myArray.push(object);
  localStorage.setItem('list', JSON.stringify(myArray));

  // Edit Tasks
  const editIcons = document.querySelectorAll('.uil-ellipsis-v');
  editIcons.forEach((task) => {
    task.addEventListener('click', () => {
      editTodo(todoContainer, task.previousElementSibling);
    });
  });
};

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && input.value) {
    event.preventDefault();
    addTask(input.value);
    input.value = '';
  }
});

window.addEventListener('DOMContentLoaded', getTasksFromLocStore);

// Delete All Completed
const clearCompletedTask = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const todoContainer = document.querySelectorAll('.todoContainer');
  todoContainer.forEach((task) => {
    if (task.classList.contains('checkedTodo')) {
      deleteTask(task);
    }
  });

  // Update Local storage to remove deleted tasks
  let count = 0;
  const data = Array.from(localData).filter((i) => i.completed === false);

  // eslint-disable-next-line no-return-assign, no-multi-assign
  data.map((i) => i.index = count += 1);
  localStorage.setItem('list', JSON.stringify(data));
};

// Click to Clear
clearCompletedTaskBtn.addEventListener('click', clearCompletedTask);

// Refresh
refresh.addEventListener('click', () => {
  const todoContainer = document.querySelectorAll('.todoContainer');
  todoContainer.forEach((task) => {
    deleteTask(task);
  });
});