import openDisplayFeeds from './displayFeeds.js';
import generateId from './counter.js';

const postsSet = new Set();

const createPostElements = (data) => {
  const rssText = data.contents;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'application/xml');
  const items = Array.from(xmlDoc.getElementsByTagName('item'));
  const postsUl = document.querySelector('.list-group');
  items.reverse();
  items.forEach((item) => {
    const title = item.getElementsByTagName('title')[0].textContent;
    const link = item.getElementsByTagName('link')[0].textContent;
    const description = item.getElementsByTagName('description')[0].textContent;

    const postKey = title + link;

    if (!postsSet.has(postKey)) {
      postsSet.add(postKey);

      const id = generateId();

      const postsLi = document.createElement('li');
      postsLi.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

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
      postsButton.setAttribute('data-bs-toggle', 'modal');
      postsButton.setAttribute('data-bs-target', '#modal');
      postsButton.textContent = 'Просмотр';
      postsLi.appendChild(postsAttr);
      postsLi.appendChild(postsButton);
      postsUl.insertBefore(postsLi, postsUl.firstChild);
      postsButton.addEventListener('click', (e) => {
        e.preventDefault();
        openDisplayFeeds(title, description, link, postsAttr);
      });
    }
  });
};

export default createPostElements;
