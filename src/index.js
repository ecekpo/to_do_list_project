import './styles/styles.css';
import TaskObject from '../modules/taskObj.js';
// eslint-disable-next-line import/no-cycle
import clearCompletedTask from '../modules/clearCompletedTask.js';
import sendToLocalAgain from '../modules/updateLocStore.js';

const refresh = document.querySelector('.uil-sync');
const input = document.querySelector('input');
const todosParent = document.querySelector('.todos-container');
const clearCompletedTaskBtn = document.querySelector('button');

// Function to Delete Tasks
const deleteTask = (todo) => {
  // Delete task from browser
  todosParent.removeChild(todo);

  // Delete from localStorage
  const localStoreData = JSON.parse(localStorage.getItem('list'));
  const data = Array.from(localStoreData).filter((task) => task.complete === false);
  data.map((todo, index) => {
    todo.index = index + 1;
    return todo;
  });
  localStorage.setItem('list', JSON.stringify(data));
};

const myArray = [
  {
    description: 'An example description in string',
    completed: false,
    index: 1,
  }, {
    description: 'An example description in string',
    completed: false,
    index: 2,
  }];

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
    sendToLocalAgain();
  });

  // Delete Tasks
  const removeIcons = document.querySelectorAll('.uil-trash-alt');
  removeIcons.forEach((task) => {
    task.addEventListener('click', () => {
      deleteTask(task.parentElement);
    });
  });
};

const getTasksFromLocStore = () => {
  const locStoreData = JSON.parse(localStorage.getItem('list'));
  locStoreData.forEach((tasks) => {
    myArray.push(tasks);
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todoContainer');
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

  const checkTask = document.querySelectorAll('.checkbox');
  checkTask.forEach((task) => {
    task.addEventListener('click', () => {
      task.parentElement.classList.toggle('completedTask');
      task.nextElementSibling.classList.toggle('checkTodo');
      task.parentElement.lastElementChild.classList.toggle('trash-active');
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

  const checkTask = document.querySelectorAll('.checkbox');
  checkTask.forEach((task) => {
    task.addEventListener('click', () => {
      task.parentElement.classList.toggle('completedTask');
      task.nextElementSibling.classList.toggle('checkTodo');
    });
  });

  // Send Added Tasks  to Local Storage

  // New object instance
  const object = new TaskObject(todoValue, false, checkTask.length - 1);
  myArray.push(object);
  localStorage.setItem('list', JSON.stringify(myArray));

  // Edit Tasks
  const editBtns = document.querySelectorAll('.uil-ellipsis-v');
  editBtns.forEach((task) => {
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

// Click to Clear
clearCompletedTaskBtn.addEventListener('click', clearCompletedTask);

// Refresh
refresh.addEventListener('click', () => {
  const todoContainer = document.querySelectorAll('.todoContainer');
  todoContainer.forEach((task) => {
    deleteTask(task);
  });
});

export default deleteTask;