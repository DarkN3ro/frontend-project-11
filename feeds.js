const createFeedsElements = () => {
  const feeds = document.querySelector('.feeds');
  const divCardBorderFeeds = document.createElement('div');
  divCardBorderFeeds.classList.add('card', 'border-0');
  const divBodyFeeds = document.createElement('div');
  divBodyFeeds.classList.add('card-body');
  const h2TitleFeeds = document.createElement('h2');
  h2TitleFeeds.classList.add('card-title', 'h4');
  h2TitleFeeds.textContent = 'Фиды';

  feeds.appendChild(divCardBorderFeeds);
  divCardBorderFeeds.appendChild(h2TitleFeeds);
  const feedsUl = document.createElement('ul');
  feedsUl.classList.add('list-group', 'border-0', 'rounder-0');

  const feedsLi = document.createElement('li');
  feedsLi.classList.add('list-group-item', 'border-0', 'border-end-0');
  const feedsH3 = document.createElement('h3');
  feedsH3.classList.add('h6', 'm-0');
  feedsH3.textContent = 'Lorem ipsum feed for an interval of 1 minutes with 10 item(s)';
  const feedsAttrP = document.createElement('p');
  feedsAttrP.classList.add('m-0', 'small', 'text-black-50');
  feedsAttrP.textContent = 'This is a constantly updating lorem ipsum feed';
  feedsUl.appendChild(feedsLi);
  feedsLi.appendChild(feedsH3);
  feedsLi.appendChild(feedsAttrP);
  feeds.appendChild(feedsUl);
};

export default createFeedsElements;
