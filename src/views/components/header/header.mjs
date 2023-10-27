/* eslint-disable no-unused-expressions */
'use strict';

const getObjHeader = document.querySelector('.header');
const objHeader = getObjHeader; // переопределяем для удобства;

objHeader.addEventListener('mouseover', (event) => {
  event.preventDefault;

  objHeader.setAttribute('data-header-state', 'focused');
});

objHeader.addEventListener('mouseout', (event) => {
  event.preventDefault;

  // objHeader.classList.remove('is-clicked');
  objHeader.removeAttribute('data-header-state');
});
