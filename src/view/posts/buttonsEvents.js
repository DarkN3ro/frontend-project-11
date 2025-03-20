/* eslint-disable no-param-reassign */
const buttonsEvents = (buttons, body, divModal) => {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      body.classList.remove('modal-open');
      body.style.overflow = '';
      body.style.paddingRight = '';
      divModal.classList.remove('show');
      divModal.removeAttribute('style');
      divModal.style.display = 'none';
      divModal.removeAttribute('aria-modal');
      divModal.setAttribute('aria-hidden', 'true');
      divModal.removeAttribute('role');
    });
  });
};

export default buttonsEvents;
