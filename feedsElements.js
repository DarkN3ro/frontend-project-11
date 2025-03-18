const createFeedsElements = (data) => {
    const rssText = data.contents;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, 'application/xml');
    const items = Array.from(xmlDoc.getElementsByTagName('channel'));
    const feeds = document.querySelector('.feeds');
    const feedsUl = feeds.querySelector('ul');
  
    items.forEach((item) => {
      const title = item.getElementsByTagName('title')[0].textContent;
      const description = item.getElementsByTagName('description')[0].textContent;
  
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
    });
  };
  
  export default createFeedsElements;
  