import createPostElements from './posts/postsElements.js';
import createFeedsElements from './feeds/feedsElements.js';

const parseData = (data) => {
  const rssText = data.contents;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'application/xml');
  const items = Array.from(xmlDoc.getElementsByTagName('item'));

  items.reverse();
  items.forEach((item) => {
    const title = item.getElementsByTagName('title')[0].textContent;
    const link = item.getElementsByTagName('link')[0].textContent;
    const description = item.getElementsByTagName('description')[0].textContent;

    createPostElements(title, link, description);
  });

  const channels = Array.from(xmlDoc.getElementsByTagName('channel'));
  channels.forEach((channel) => {
    const title = channel.getElementsByTagName('title')[0].textContent;
    const description = channel.getElementsByTagName('description')[0].textContent;

    createFeedsElements(title, description);
  });
};

export default parseData;
