/* eslint-disable no-unused-expressions */
import { consoleInfoTest } from './modules/console.mjs';

console.log(consoleInfoTest);

const getButton = document.querySelector('.js-button');

getButton.addEventListener('click', (event) => {
  event.preventDefault;

  document.querySelector('body').classList.toggle('is-clicked');
});
