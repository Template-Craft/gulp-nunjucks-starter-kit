/* eslint-disable no-unused-expressions */
'use strict';

const getObjHeader = document.querySelector('.header');
const objHeader = getObjHeader; // переопределяем для удобства;

const headerRecolor = () => {
  objHeader.addEventListener('mouseover', (event) => {
    event.preventDefault;

    objHeader.setAttribute('data-header-state', 'focused');
  });

  objHeader.addEventListener('mouseout', (event) => {
    event.preventDefault;

    objHeader.removeAttribute('data-header-state');
  });
};

export { objHeader, headerRecolor };
