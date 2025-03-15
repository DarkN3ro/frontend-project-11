const openDisplayFeeds = (title, description, link, postsAttr) => {
  const body = document.querySelector('body');
  body.classList.add('modal-open');
  body.style = 'overflow: hidden; padding-right: 15px;';
  const divModal = document.querySelector('#modal');
  divModal.classList.add('show');
  divModal.style = 'display: block;';
  const showFeeds = document.querySelector('h5');
  showFeeds.textContent = title;
  const discriptionText = document.querySelector('.text-break');
  discriptionText.textContent = description;
  const btnInfo = document.querySelector('.full-article');
  btnInfo.href = link;
  postsAttr.classList.remove('fw-bold');
  postsAttr.classList.add('fw-normal', 'link-secondary');

  const btnClosed = document.querySelector('.btn-secondary');
  btnClosed.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.remove('modal-open');
    body.removeAttribute('style');
    divModal.classList.remove('show');
    divModal.removeAttribute('style');
  });
};

export default openDisplayFeeds;
