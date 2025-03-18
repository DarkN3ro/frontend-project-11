const createFeeds = () => {
  const feeds = document.querySelector('.feeds');
  if (feeds.querySelectorAll('.card').length > 0) {
    return;
  }
  const divCardBorderFeeds = document.createElement('div');
  divCardBorderFeeds.classList.add('card', 'border-0');

  const divBodyFeeds = document.createElement('div');
  divBodyFeeds.classList.add('card-body');

  const h2TitleFeeds = document.createElement('h2');
  h2TitleFeeds.classList.add('card-title', 'h4');
  h2TitleFeeds.textContent = 'Фиды';

  const feedsUl = document.createElement('ul');
  feedsUl.classList.add('list-group', 'border-0', 'rounder-0');
  divBodyFeeds.appendChild(h2TitleFeeds);
  divCardBorderFeeds.appendChild(divBodyFeeds);
  divCardBorderFeeds.appendChild(feedsUl);
  feeds.appendChild(divCardBorderFeeds);
};

export default createFeeds;
