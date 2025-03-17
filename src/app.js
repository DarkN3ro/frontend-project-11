import * as yup from 'yup';
import i18next, { t } from 'i18next';
import resources from '../locales/index.js';
import createPostElements from '../createPosts.js';
import createFeedsElements from '../feeds.js';
import createPost from '../post.js';

await i18next.init({
  lng: 'ru',
  resources,
});

const existingRssLinks = [];
const lastInformationOfFeeds = {};

const schema = yup.object().shape({
  url: yup.string()
    .required(t('validate.rssRequired'))
    .url(t('validate.urlValidate'))
    .test('is-unique', t('validate.rssRepeat'), (value) => {
      if (!value) return true;
      return !existingRssLinks.includes(value);
    }),
});

const elements = {
  button: document.querySelector('[aria-label="add"]'),
  input: document.querySelector('#url-input'),
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
};

const renderError = (errorMessage, success) => {
  elements.feedback.classList.remove('text-danger', 'text-success');
  elements.feedback.classList.add(success ? 'text-success' : 'text-danger');
  elements.feedback.textContent = errorMessage;
};

const startCheckingUpdates = (url) => {
  const checkForUpdates = () => {
    fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(t('validate.rssRequest'));
        }
        return response.json();
      })
      .then((data) => {
        const { contents } = data;

        if (lastInformationOfFeeds[url] !== contents) {
          lastInformationOfFeeds[url] = contents;
          createPostElements(data);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
    setTimeout(checkForUpdates, 5000);
  };
  checkForUpdates();
};

const requestRss = (urlNames) => {
  const { input } = elements;
  fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(urlNames)}`, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(t('validate.rssRequest'));
      }
      return response.json();
    })
    .then((data) => {
      const { contents } = data;

      const isValidRss = /<rss[\s\S]*?>|<feed[\s\S]*?>/.test(contents);
      if (!isValidRss) {
        throw new Error(t('validate.rssRequest'));
      }

      existingRssLinks.push(urlNames);
      lastInformationOfFeeds[urlNames] = contents;
      input.classList.add('is-valid');
      renderError(t('validate.rssSuccess'), true);
      input.value = '';
      input.focus();

      createPost();
      createPostElements(data);
      createFeedsElements();
    })
    .catch((err) => {
      input.classList.add('is-invalid');
      renderError(err.message, false);
    })
    .finally(() => {
      startCheckingUpdates(urlNames);
    });
};

const app = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const { input } = elements;

    const urlValue = input.value;
    input.classList.remove('is-invalid', 'is-valid');

    schema.validate({ url: urlValue })
      .then(() => {
        requestRss(urlValue);
      })
      .catch((err) => {
        input.classList.add('is-invalid');
        renderError(err.message, false);
      });
  });
};

export default app;
