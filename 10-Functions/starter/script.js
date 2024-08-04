// @flow
'use strict';


console.log('\n---------------------------DEFAULT PARAMETERS-------------------------------');
const bookings: { [string]: number | string } [] = [];

//ES6 way of defining default values for function parameters
function bookingConstructor(flightNum: string, numPassengers: number = 1, price: number = 199 * numPassengers) {

  //default argument in ES5!
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum: flightNum,
    numPassengers: numPassengers,
    price: price
  };

  console.log(booking);
  bookings.push(booking);
}
 

bookingConstructor('LH123');

bookingConstructor('LH123', 4);

bookingConstructor('LH123', 4, 500);

bookingConstructor('LH123', undefined, 500);

console.log('\n---------------------------PASSING BY VALUE/REFERENCE-------------------------------');

const flight = 'LH123';

type passengerType = {
  name: string,
  passportNum: number
}

const jonas = {
  name: 'Jonas Schmedtmann',
  passportNum: 2051211523
};

function checkIn(flightNum: string, passenger: passengerType) {

  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passportNum === 2051211523) {
    console.log('checked In!');
  } else {
    console.log('wrong passport!');
  }
}


checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function(person: passengerType) {

  person.passportNum = Math.trunc(Math.random() * 1000000000000);
  console.log(person.passportNum);
};

newPassport(jonas);

console.log('\n------------------HIGHER ORDER FUNCTION(excepting other functions as input)--------------------');

//callBack function
function upperFirstWord(str: string) {

  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}

//callback function
function oneWord(str: string) {

  return str.replace(/ /gm, '').toLowerCase();
}


//higher order function
const transformer = function(str: string, fn: Function) {

  console.log(`Transformed String: ${fn(str)}`);
  console.log(`Transformed By: ${fn.name} \n`);
};

transformer('JavaScript is the best!', upperFirstWord);

transformer('JavaScript is the best!', oneWord);


//A JavaScript implementation of higher order functions
function highFive(str: string) {
  console.log(`✋ ${str}`);
}


// document.body.addEventListener('click', highFive)

['jonas', 'martha', 'adam'].forEach((name) => highFive(name));


//higher order function returning a function
function greet (greeting: string) {

  return function (name : string) {
    console.log(`${greeting} ${name}`);
  }
}

//arrow function implementation
// const greet = (greeting: string) => (name: string) => console.log(`${greeting} ${name}`);


const greeterHey = greet('hey');

greeterHey('Navid');
greeterHey('mmd');


//useful for functional programming!
greet('Hello')('Jonas');

type myObject = {
  airline: string,
  iataCode: string,
  bookings: Array<Object>,
  planes: number,
  buyPlane: () => void,

  book: (number, string) => void

}


//for some reason, flow doesn't allow the use of this keyword inside an ES6 syntax written method in an object literal!
const lufthansa : myObject = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  planes: 300,
  buyPlane: function(this:myObject) {
    console.log(this);

    this.planes++;
    console.log(this.planes);
  },

  book: function(this: myObject, flightNum: number, name: string ) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`);
    this.bookings.push({flight: `${this.iataCode} ${flightNum}`}, name);
  }
}

lufthansa.book(239,"navid mahjoub");
lufthansa.book(635, "Mmd Ghafori");



const euroWings = {
  airline: 'EuroWings',
  iataCode: 'EW',
  bookings: []
}

const book = lufthansa.book;

// book(...) -> wont work since isn't called by an object!


console.log('\n---------------------------CALL, APPLY, BIND FUNCTION METHODS-------------------------------');

//if the given method
// that is passes as an argument to the call method doesn't have this keyword inside,
// it is just called like normal but from the inside of another object!

book.call(lufthansa, 251, "Omid Mahjoub")

//calling the function from a different object
book.call(euroWings, 23, 'sarah Williams')

console.log(lufthansa);
console.log(euroWings);

const swiss = {
  airline: 'Swiss AirLine',
  iataCode: 'LX',
  bookings: []
}


book.call(swiss, 583, "Mary Cooper");

// apply method (does exactly the same but instead gets arguments as an array);
//not used anymore since spread operator exists.
const flightData = [599, "George Cooper"];

book.apply(swiss,flightData)
book.call(swiss,...flightData)

console.log(swiss);


//bind method
// (does the exact same as call and apply but doesn't immediately call the function
// but returns a function that is bound to the given "this" keyword)

const bookEW = book.bind(euroWings);

bookEW(23, "Steven Williams");


//we can do the same for all the airlines
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);


//we can also pass arguments to the function
// (e.g., create a function that is bound to an airline and has the flight number set by default)
const bookEW23 = book.bind(euroWings,73);

bookEW23("martha cooper");

console.log(euroWings);

// let buyElement :?HTMLElement = document.querySelector('.buy');


//won't work, since the "this" keyword inside the addEventListener points to the Buy element instead of lufthansa object
// buyElement.addEventListener('click', lufthansa.buyPlane);


//we need bind not call, since we need to pass the function as a variable not call it at the spot!

// if(buyElement){
//   buyElement.addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// }

//partial applications (using a function but with a pre-set number of arguments)

function addTax(rate: number,value: number) {
  return value + value * rate;
}


function addTaxHigherOrder(rate: number) {

  return function(value: number) {

    return value + value * rate
  };
}

console.log(addTax(0.1,200));

//could be anything instead of null
const addVAT = addTax.bind(null,0.23);

//A Partial Application of the addTax function
console.log(addVAT(200));

//basically the .bind() method is the same as the custom function we made that returns
//a function with the given value pre-set
const addVAT1 = addTaxHigherOrder(0.23);

console.log(addVAT1(200));

console.log('\n---------------------------immediately invoked function expression-------------------------------');

// IIFE (A Pattern used for encapsulation)
(function () {
  console.log("this will never happen again!\n");
})();


(() => console.log("this will also never happen again!\n"))();

console.log('\n-------------------------------------CLOSURES-----------------------------------------');

//to review, please watch the video on this subject
function secureBooking() {
  let passengerCount = 0;

  return function() {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  }
}

const booker = secureBooking();

booker();
booker();
booker();


// this also a case of closure apparently even when the variable f was defined outside the
// g function's execution context
let f : Function = undefined;

function g() {
  let a = 23;

  //counts as function definition, I guess
  f = function() {
    console.log(a * 2);
  }
}


function h() {
  const b = 777;

  //also counts as function definition
  f = function() {
    console.log(b * 2);
  }
}


g();
f();

// re-assigning f function
h();
f();




// example 2
function boardPassengers(n : number , wait: number) {

  const perGroup = Math.trunc(n / 3);

  //the arrow callback function's Execution context variable environment closure is the boardPassengers function's VE
  setTimeout(() => {
    console.log(`we are now boarding all ${n} passengers`);
    console.log(`there are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);



  console.log(`will start boarding in ${wait} seconds`);
}

//notice the priority of the closure's VE over the Global scope/ the scope where the arrow function is called
const perGroup = 1000;

boardPassengers(100,3);


