import './styles/styles.css';

// eslint-disable-next-line no-unused-vars
const refresh = document.querySelector('.uil-sync');
const input = document.querySelector('input');
const todosParent = document.querySelector('.todos-container');
// eslint-disable-next-line no-unused-vars
const clearCompletedTaskBtn = document.querySelector('button');

// Object
// eslint-disable-next-line no-unused-vars
class MyObject {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

// eslint-disable-next-line no-unused-vars
const myArray = [];

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
};

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && input.value) {
    event.preventDefault();
    addTask(input.value);
    input.value = '';
  }
});
