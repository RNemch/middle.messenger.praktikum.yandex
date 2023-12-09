export const addActive = (fromClass: string) => {
  const actives = document.querySelectorAll('.active') as NodeListOf<HTMLElement>;
  actives.forEach(function (active: HTMLElement) {
    active.classList.remove('active');
  });
  document.querySelector(fromClass)?.classList.add('active');
};
