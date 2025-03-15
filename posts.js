import openDisplayFeeds from './feeds.js';

const createPostElements = (data) => {
  const rssText = data.contents;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'application/xml');
  const items = Array.from(xmlDoc.getElementsByTagName('item'));

  const posts = document.querySelector('.posts');
  const divCardBorderPosts = document.createElement('div');
  divCardBorderPosts.classList.add('card', 'border-0');
  const divBodyPosts = document.createElement('div');
  divBodyPosts.classList.add('card-body');
  const h2TitlePosts = document.createElement('h2');

  h2TitlePosts.classList.add('card-title', 'h4');
  h2TitlePosts.textContent = 'Посты';
  posts.appendChild(divCardBorderPosts);
  divCardBorderPosts.appendChild(divBodyPosts);
  divBodyPosts.appendChild(h2TitlePosts);

  const postsUl = document.createElement('ul');
  postsUl.classList.add('list-group', 'border-0', 'rounded-0');

  let currentId = 0;
  const generateId = () => {
    currentId += 1;
    return currentId;
  };

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

  divCardBorderPosts.appendChild(postsUl);

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

export default createPostElements;
