import openDisplayFeeds from './displayFeeds.js';
import generateId from './counter.js';

const createPostElements = (data) => {
  const rssText = data.contents;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'application/xml');
  const items = Array.from(xmlDoc.getElementsByTagName('item'));
  const postsUl = document.querySelector('.list-group');

  const existingPostLinks = new Set(Array.from(postsUl.children).map((li) => li.querySelector('a').href));

  const newPosts = items.filter((item) => {
    const link = item.getElementsByTagName('link')[0].textContent;
    return !existingPostLinks.has(link);
  });

  if (newPosts.length === 0) {
    return;
  }

  const existingPostsCount = postsUl.children.length;

  if (existingPostsCount + items.length > 10) {
    const excessPostsCount = (existingPostsCount + items.length) - 10;
    for (let i = 0; i < excessPostsCount; i += 1) {
      if (postsUl.firstChild) {
        postsUl.removeChild(postsUl.firstChild);
      }
    }
  }

  items.forEach((item) => {
    const title = item.getElementsByTagName('title')[0].textContent;
    const link = item.getElementsByTagName('link')[0].textContent;
    const description = item.getElementsByTagName('description')[0].textContent;
    const id = generateId();

    const postsLi = document.createElement('li');
    postsLi.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-start', 'border-0', 'border-end-0');

    const postsAttr = document.createElement('a');
    postsAttr.href = link;
    postsAttr.classList.add('fw-bold');
    postsAttr.setAttribute('data-id', id);
    postsAttr.target = '_blank';
    postsAttr.rel = 'noopener noreferrer';
    postsAttr.textContent = title;

    const postsButton = document.createElement('button');
    postsButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    postsButton.setAttribute('data-id', id);
    postsButton.type = 'button';
    postsButton.textContent = 'Просмотр';
    postsLi.appendChild(postsAttr);
    postsLi.appendChild(postsButton);
    postsUl.appendChild(postsLi);
    postsButton.addEventListener('click', (e) => {
      e.preventDefault();

      openDisplayFeeds(title, description, link, postsAttr);
    });
  });
};

export default createPostElements;
