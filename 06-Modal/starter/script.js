// @flow
'use strict';

function closeModel() {
  if (modalElement) modalElement.classList.add('hidden'); else console.error('modal Not Found');
  if (overlayElement) overlayElement.classList.add('hidden'); else console.error('overlay Not Found');
}

function openModel() {
  if (modalElement) modalElement.classList.remove('hidden'); else console.error('modal Not Found');
  if (overlayElement) overlayElement.classList.remove('hidden'); else console.error('overlay Not Found');
}

const modalElement: ?HTMLElement = document.querySelector('.modal');
const overlayElement: ?HTMLElement = document.querySelector('.overlay');
const btnCloseModalElement: ?HTMLElement = document.querySelector('.close-modal');
const showModalElements: NodeList<HTMLElement> = document.querySelectorAll('.show-modal');

console.log(showModalElements);

showModalElements.forEach((showModalElement: HTMLElement) => {

  showModalElement.addEventListener('click', () => {

    openModel();

  });
});

if (btnCloseModalElement) btnCloseModalElement.addEventListener('click', () => {

  if (modalElement) modalElement.classList.add('hidden'); else console.error('modal Not Found');
  if (overlayElement) overlayElement.classList.add('hidden'); else console.error('overlay Not Found');

}); else console.error('overlay Not Found');

//keyboard events: 1.keydown(most used) 2.keyup 3.keypress(holding a keyboard button)
document.addEventListener('keydown', (e: KeyboardEvent) => {


  if (modalElement && e.code === 'Escape' && !modalElement.classList.contains('hidden')) {
    closeModel();
  }

});




