const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

if (container) {
  registerBtn &&
    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

  loginBtn &&
    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
}
