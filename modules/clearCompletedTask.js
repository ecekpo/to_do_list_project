/* eslint-disable import/no-cycle */
import deleteTask from '../src/index.js';

const clearCompletedTask = () => {
  const localStoreData = JSON.parse(localStorage.getItem('list'));
  const todoContainer = document.querySelectorAll('.todoContainer');
  todoContainer.forEach((task) => {
    if (task.classList.contains('checkedTodo')) {
      deleteTask(task);
    }
  });

  // Update Local storage to remove deleted tasks
  const data = Array.from(localStoreData).filter((task) => task.completed === false);

  data.map((todo, index) => {
    todo.index = index + 1;
    return todo;
  });
  localStorage.setItem('list', JSON.stringify(data));
};

export default clearCompletedTask;