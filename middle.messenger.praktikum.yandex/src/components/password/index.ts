let btnPass = document.querySelectorAll('.password-control') as NodeListOf<HTMLElement>;

btnPass.forEach(function (btn: HTMLElement) {
  btn.onclick = function () {
    const context = this as HTMLElement;
    let target = context.getAttribute('data-target');
    if (target) {
      let inputPass = document.querySelector(target);
      let iconEye = context.querySelector('img');
      if (inputPass?.getAttribute('type') === 'password') {
        inputPass.setAttribute('type', 'text');
        iconEye?.setAttribute('src', '/image/visibility_off.svg');
      } else {
        inputPass?.setAttribute('type', 'password');
        iconEye?.setAttribute('src', '/image/visibility.svg');
      }
    }
  };
});
