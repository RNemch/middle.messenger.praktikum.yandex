const addActive = (btnTag: string, fromClass: string) => {
  const button = document.querySelectorAll(btnTag) as NodeListOf<HTMLElement>;
  const div = document.querySelector(fromClass);

  button &&
    button.forEach(function (btn) {
      btn.addEventListener('click', () => {
        const actives = document.querySelectorAll('.active') as NodeListOf<HTMLElement>;
        actives.forEach(function (active: HTMLElement) {
          active.classList.remove('active');
        });
        div?.classList.add('active');
      });
    });
};

addActive('#change-data', '.profile-change-data');
addActive('#change-password', '.profile-change-password');
addActive('#save', '.profile-info');
