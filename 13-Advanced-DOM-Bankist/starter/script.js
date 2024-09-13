// @flow
'use strict';

///////////////////////////////////////
// Modal window

const modal:?HTMLElement = document.querySelector('.modal');
const overlay:?HTMLElement = document.querySelector('.overlay');
const btnCloseModal:?HTMLElement = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e: Event) {

  e.preventDefault();
  modal?.classList.remove('hidden');
  overlay?.classList.remove('hidden');
};

const closeModal = function () {
  modal?.classList.add('hidden');
  overlay?.classList.add('hidden');
};

btnsOpenModal.forEach((node, index) => btnsOpenModal[index].addEventListener('click', openModal));

btnCloseModal?.addEventListener('click', closeModal);
overlay?.addEventListener('click', closeModal);

modal && document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

//certain nodes can be accessed without the querySelector method of the document Object

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
// console.log(document.getElementById('section--1'));


/////////////////////////////////////////////////HTMLCollections/////////////////////////////////////////////////
/*
// is different from NodeList since it's a live collection meaning
// that it would change if the document was to be changed (Updates automatically)
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

//also returns live HTMLCollections
document.getElementsByClassName('btn');


 */
/////////////////////////////////////////////////CREATING AND INSERTING ELEMENTS TO THE DOM/////////////////////////////////////////////////

// 1.       .insertAdjacentHTML()

// 2.

let message = document.createElement('div')

message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improved analytics and functionality!';
message.innerHTML = 'we use cookies for improved analytics and functionality! <button class="btn btn--close-cookie">Got it!</button>'


//a single DOM Element can't be at 2 places at the same time! and is unique

// header && header.append(message);
// header && header.prepend(message);



//COPY ELEMENTS/////////////////////////////////////////////////

// header.prepend(message.cloneNode(true))

//BEFORE & AFTER/////////////////////////////////////////////////

// header && header.before(message)
// header && header.after(message)


/////////////////////////////////////////////////STYLES/////////////////////////////////////////////////

message.style.backgroundColor = 'rgb(55, 56, 61)';
message.style.width = '110%';

header && header.before(message)

// you can only access style attributes that you have set inline, not the one's in style.css
// console.log(message.style.backgroundColor);
// console.log(message.style.content);


// to get access to the computed styles, you need the getComputedStyle()

// console.log(getComputedStyle(message).height);

message.style.height = (Number.parseFloat(getComputedStyle(message).height) + 22) + 'px';

/////////////////////////////////////////////////DELETE ELEMENTS (remove() method)/////////////////////////////////////////////////

document.querySelector('.btn--close-cookie')?.addEventListener('click', () => message.remove());


// accessing variables defined in style.css
// document.documentElement?.style.setProperty('--color-primary', 'orangered')



/////////////////////////////////////////////////HTML ATTRIBUTES/////////////////////////////////////////////////
/*
const logo:HTMLImageElement = (document.querySelector('.nav__logo'): any);

//absolute URL
console.log(logo?.src);
//relative URL
console.log(logo?.getAttribute('src'));


console.log(logo?.className);



// setAttribute() & getAttribute()


// console.log(logo?.designer);
logo?.setAttribute('company','Bankist');
console.log(logo?.getAttribute('company'));


const link:HTMLLinkElement = (document.querySelector('.nav__link--btn'): any)

console.log(link?.href);
console.log(link?.getAttribute('href'));

//DATA ATTRIBUTES/////////////////////////////////////////////////

// data-version-number => dataset.versionNumber (camelCase)
console.log(logo.dataset.versionNumber);



/////////////////////////////////////////////////Classes/////////////////////////////////////////////////

logo.classList.add();
logo.classList.remove();
logo.classList.toggle('c');
logo.classList.contains('c');
 */
// OverRides every class and just lets you set it to one! (Do Not Use!)

// logo.className = 'jonas';



const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo?.addEventListener('click', (e) => {

  // const s1coords = section1?.getBoundingClientRect();


  //scrolling (Legacy way)/////////////////////////////////////////////////

  //1.
  // not smooth
  // window.scrollTo(s1coords?.left + window.scrollX,s1coords?.top + window.scrollY)

  //2.
  // window.scrollTo({
  //   left: s1coords?.left + window.scrollX,
  //   top: s1coords?.top + window.scrollY,
  //   behavior: 'smooth'
  // })


  //scrolling (Modern)/////////////////////////////////////////////////
  section1?.scrollIntoView({behavior: 'smooth'})
});

/////////////////////////////////////////////////EVENTS & EVENT LISTENERS/////////////////////////////////////////////////
/*
const h1 = document.querySelector('h1');

const eventListener = (e: Event) => {

  alert('Great! You are reading h1 now!')
  h1.removeEventListener('mouseenter',eventListener)
}


h1.addEventListener('mouseenter', eventListener);

setTimeout(() => h1.removeEventListener('mouseenter',eventListener), 3000);


const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomColor = () => `rgb(${randomInt(255,0)}, ${randomInt(255,0)}, ${randomInt(255,0)})`;

document.querySelector('.nav__link')?.addEventListener('click', function(this: HTMLElement,e) {

  console.log('LINK',e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();

});


document.querySelector('.nav__links')?.addEventListener('click', function(this: HTMLElement,e: Event) {

  console.log('CONTAINER',e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();


  //stop eventPropagation to parent nodes! (also study stopImmediatePropagation() & preventDefault())

  // e.stopPropagation()
})

//you can toggle eventListeners to get events either on the capturing phase or the bubbling phase!
//so if options is set to true, although this is on default behavior the last eventListener that the event propagates to, now it will
//be the first event listener that receives and captures the 'click' event
document.querySelector('.nav')?.addEventListener('click', function(this: HTMLElement,e: Event) {

  console.log('NAV',e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  this.style.backgroundColor = randomColor();
},false);


// note that event.currentTarget refers to the current element the event listener is attached to
//but event.target refers to the target element that the event was captured on, so it could refer to a child element!

 */

/////////////////////////////////////////////////PAGE NAVIGATION & EVENT DELEGATION/////////////////////////////////////////////////

// writing one event listener for the common parent node
// so that we use propagation and target node instead of adding 3 eventListener
document.querySelector('.nav__links')?.addEventListener('click', e => {

  e.preventDefault();

  //since there is optional chaining before scroll into view there is no need for matching since if the element doesn't have a href
  // attribute, the statement just ends!
  document.querySelector((e.target: any).getAttribute('href'))?.scrollIntoView({behavior: 'smooth'});

  /* Matching Strategy

  //or you could have a matching strategy:
  if ((e.target: any).classList.contains('nav__link')) {
    // the above code here!
  }
  */
});

function handleHover(this: string, e: Event) {

  if((e.target: any).classList.contains('nav__link')) {

    const clickedLink: HTMLLinkElement = (e.target: any);
    const linkSiblings = clickedLink.closest('.nav')?.querySelectorAll('.nav__link');
    const logo = clickedLink.closest('.nav')?.querySelector('img');

    linkSiblings?.forEach((link) => {

      if(link !== clickedLink) {
        link.style.opacity = this;
      }
    })
  }
}

const navigation = document.querySelector('.nav');

navigation?.addEventListener('mouseover', handleHover.bind('0.5'));

navigation?.addEventListener('mouseout', handleHover.bind('1'));

//instead of the reasonable way below, we apparently better use the above-mentioned way!

// document.querySelector('.nav')?.addEventListener('mouseout', e => handleHover(e,"1"));


/////////////////////////////////////////////////DOM TRAVERSING/////////////////////////////////////////////////

const h1 = document.querySelector('h1');

//this would go as deep as possible in the DOM Tree below the h1 element
console.log(h1.querySelectorAll('.highlight'));

//for the first and last Child Element we use:

// (h1.firstElementChild: any).style.color = 'white';
// (h1.lastElementChild: any).style.color = 'orangered';


//for direct children we use .childNodes/.children
//for nodes
console.log(h1.childNodes);
console.log(h1.children);


//Going upwards: parents
console.log(h1.parentElement);
//for nodes
console.log(h1.parentNode);


//finding a non-direct parent(searching upwards) closest()

// (h1.closest('.header'): any).style.background = 'var(--gradient-secondary)'


//Going sideways: Siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// for nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);


//if you need all the sibling instead of next and previous
console.log(h1.parentElement?.children);

// [...(h1.parentElement: any).children].forEach((element) => {
//
//   if( element !== h1) {
//     element.style.transform = 'scale(0.5)'
//   }
// })


/*
the querySelector() finds first matching children,
 the closest() finds first matching parent.

 */

/////////////////////////////////////////////////TABBED COMPONENT/////////////////////////////////////////////////

const tabs = document.querySelectorAll('.operations__tab')

const tabsContainer = document.querySelector('.operations__tab-container');

const tabContents = document.querySelectorAll('.operations__content')

//Event Delegation!
tabsContainer?.addEventListener('click', (e) => {

  //the closest will look for the closest upwards element that is a button with class operations__tab including targetEvent's element itself
  //this solves the issue of the span element being clicked!
  const clicked = (e.target: any).closest('.operations__tab');

  //Guard Clause
  if(!clicked) return;

  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');


  //Activate Content Area
  tabContents.forEach((tabContent) => tabContent.classList.remove('operations__content--active'));
  tabContents[Number(clicked.dataset.tab) - 1].classList.add('operations__content--active')
});

/////////////////////////////////////////////////STICKY NAVIGATION/////////////////////////////////////////////////

let initialCoords = header?.getBoundingClientRect();
const navHeight = navigation?.getBoundingClientRect().height;


// window.addEventListener('scroll', () => {
//
//   // window.scrollY > initialCoords?.top ? navigation?.classList.add('sticky') : navigation?.classList.remove('sticky');
//
// })

const obsOptions = {
  //if set to null, the entire viewport is considered is root (the element that is checked for intersection with the target element)
  root: null,

  //the percentage of the target element that is intersecting with the root, so in this case, if 10% of the viewport is intersecting with section1 the observer call back, is called!
  threshold: 0,

  //accounting for the height of the navigation bar...(the element appears navHeight pixels before where the threshold is reached)
  rootMargin: `-${navHeight || 100}px`
}

//
//
// const observer = new IntersectionObserver((entries,observer) => {
//
//   entries.forEach(entry => console.log(entry))
//
// },obsOptions);


const headerObserver = new IntersectionObserver((entries, observer) => {

  const [entry] = entries;

  !entry.isIntersecting ? navigation?.classList.add('sticky') : navigation?.classList.remove('sticky');

},obsOptions)

header && headerObserver.observe(header);

/////////////////////////////////////////////////CSS ANIMATIONS(REVEAL SECTIONS)/////////////////////////////////////////////////

const allSections = document.querySelectorAll('.section');

const sectionObserver: IntersectionObserver = new IntersectionObserver((entries, observer) => {

  const [entry] = entries;

  if(!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);


},{
  root: null,
  threshold: 0.15,
})



allSections.forEach((section) => {

  sectionObserver.observe(section);
  section.classList.add('section--hidden');

})
/////////////////////////////////////////////////LAZY LOADING IMAGES/////////////////////////////////////////////////

//selecting elements that have a certain attribute
const imgTargets = document.querySelectorAll('img[data-src]');

const imgObserver: IntersectionObserver = new IntersectionObserver((entries, observer) => {

  const [entry] = entries;

  if (!entry.isIntersecting) return

  //replace the src attribute with data-src
  (entry.target: any).src = (entry.target: any).dataset.src;

  //needed for slow internet when the loading of the image takes a long time!
  entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));

  imgObserver.unobserve(entry.target);

},{
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach((img) => imgObserver.observe(img))

/////////////////////////////////////////////////slider Component/////////////////////////////////////////////////

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


let curSlide = 0;
const maxNumberOfSlides = slides.length - 1;

(function createDots() {

  slides.forEach((_, index) => {

    dotContainer?.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${index}"></button>`)
  })
})();


function activateDot(slideNumber: number) {

  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

  document.querySelector(`.dots__dot[data-slide="${slideNumber}"]`)?.classList.add('dots__dot--active');
}


goToSlide(0);

function goToSlide(slideNumber: number) {

  slides.forEach((slide, index) => slide.style.transform = `translateX(${(index - slideNumber)*100}%)`);
  activateDot(slideNumber);
}

//Next Slide
const nextSlide = () => {

  if (curSlide === maxNumberOfSlides) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
}


const prevSlide = () => {

  if (curSlide === 0) {
    curSlide = maxNumberOfSlides;
  }else {
    curSlide--;
  }

  goToSlide(curSlide);
}


btnRight?.addEventListener('click', nextSlide)

btnLeft?.addEventListener('click',prevSlide)

document.addEventListener('keydown', (e) => {

  if (e.key === 'ArrowLeft') {
    prevSlide();

  }else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

dotContainer?.addEventListener('click', (event) => {

  const slideButton: HTMLButtonElement = (event.target: any)

  if(slideButton.classList.contains('dots__dot')){

    const { slide } = slideButton.dataset;

    goToSlide(Number(slide));
    activateDot(Number(slide))
  }
});

//this event doesn't wait for images and external resources
//just JavaScript and HTML
document.addEventListener('DOMContentLoaded', (e) => {

  console.log('HTML parsed and Dom Tree built', e);


})

window.addEventListener('load', (e) => console.log('page fully loaded', e))


// window.addEventListener('beforeunload', (e) => {
//
//   e.preventDefault();
//   console.log('exactly before Leaving Page!', e);
//
// })