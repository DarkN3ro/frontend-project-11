import { v4 as uuidv4 } from 'uuid';
import openDisplayFeeds from '../display/displayFeeds.js';

const postsSet = new Set();

const createPostElements = (title, link, description) => {
  const postsUl = document.querySelector('.list-group');

  const postKey = title + link;

  if (!postsSet.has(postKey)) {
    postsSet.add(postKey);

    const id = uuidv4();

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
};

export default createPostElements;
