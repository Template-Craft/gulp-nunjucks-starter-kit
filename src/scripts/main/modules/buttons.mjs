/* eslint-disable no-unused-expressions */
'use strict';

export const btnCardAnimals = () => {
  const getButton = document.querySelector('.js-btn__card-animals');
  const getCardItem = document.querySelector('.js-card-animals');

  getButton.addEventListener('click', (event) => {
    event.preventDefault;
    const styles = ['background: #faebd7; box-shadow: 0 4px 16px -4px rgb(239 146 23); transform: scale(1.2);'];

    getCardItem.classList.toggle('is-active');

    if (document.querySelector('.js-card-animals.is-active') !== null) {
      getCardItem.setAttribute('style', styles);
    } else {
      getCardItem.removeAttribute('style');
    }
  });
};
