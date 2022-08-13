// Update Local Storage
const sendToLocalAgain = () => {
  const localStoreData = JSON.parse(localStorage.getItem('list'));
  const todos = document.querySelectorAll('span');

  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].classList.contains('checkTodo')) {
      localStoreData[i].completed = true;
    } else {
      localStoreData[i].completed = false;
    }
  }

  localStorage.setItem('list', JSON.stringify(localStoreData));
};

export default sendToLocalAgain;