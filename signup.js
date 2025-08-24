document.querySelector('.login-link').addEventListener('click', () => {
  document.querySelector('.container').classList.add('show-login');
});

document.querySelector('.back-to-signup').addEventListener('click', () => {
  document.querySelector('.container').classList.remove('show-login');
});