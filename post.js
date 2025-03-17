const createPost = () => {
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
  divCardBorderPosts.appendChild(postsUl);
};

export default createPost;
