'use strict';

export const btnCardAnimals = () => {
  let cat_count = 2;
  let mouse_count = 4;

  const getButton = document.querySelector('.js-btn__card-animals');
  const getAnimal = document.querySelectorAll('.js-card-animals > ol > li');

  const animal = getAnimal;

  for (let i = 0; i < animal.length; i++) {
    animal[i].setAttribute('data-animal-count', `${i}`);
  }

  getButton.addEventListener('click', function () {
    cat_count++;
    mouse_count--;

    const cat = animal[0];
    cat.innerHTML = `cat : ${cat_count}`;

    const mouse = animal[2];
    mouse.innerHTML = `mouse : ${mouse_count}`;

    if (mouse_count === 0) {
      this.setAttribute('disabled', '');
      cat.innerHTML = `Cats win!`;
    } else {
      this.removeAttribute('disabled', '');
    }
  });
};
