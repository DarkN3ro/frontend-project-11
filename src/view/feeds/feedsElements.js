const feedsSet = new Set();

const createFeedsElements = (title, description) => {
  const feedKey = title + description;
  if (!feedsSet.has(feedKey)) {
    feedsSet.add(feedKey);

    const feeds = document.querySelector('.feeds');
    const feedsUl = feeds.querySelector('ul');

    const feedsLi = document.createElement('li');
    feedsLi.classList.add('list-group-item', 'border-0', 'border-end-0');
    const feedsH3 = document.createElement('h3');
    feedsH3.classList.add('h6', 'm-0');
    feedsH3.textContent = title;
    const feedsAttrP = document.createElement('p');
    feedsAttrP.classList.add('m-0', 'small', 'text-black-50');
    feedsAttrP.textContent = description;
    feedsLi.appendChild(feedsH3);
    feedsLi.appendChild(feedsAttrP);
    feedsUl.insertBefore(feedsLi, feedsUl.firstChild);
  }
};

export default createFeedsElements;
