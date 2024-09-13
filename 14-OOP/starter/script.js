//this file doesn't have flow because it contains pre ES6 ways of creating classes which aren't
//supported in flow
'use strict';


//this file contains the pre ES6 era of classes in JavaScript/////////////////////////////


// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} is linked to prototype (prototype attribute added to the newly created object)
// 4. Function automatically returns {}

const Person = function(firstName, birthYear) {

  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;


  //it's good practice to not assign a function to this since if we create 100 instances we'll
  //have 100 different copies of the same function in the instances

  // this.calcAge = function() {
  //   console.log(2037 - this.birthYear);
  // }
}


const jonas = new Person('Jonas',1991);
const navid = new Person('navid',2003);
const jack = new Person('Jack',1991);


console.log(jonas);
console.log(jonas instanceof Person);


///////////////////////////////////////////////PROTOTYPES/////////////////////////////////////////////

Person.prototype.calcAge = function() {

  console.log(2024 - this.birthYear);
}
console.log(Person.prototype);


jonas.calcAge();
navid.calcAge();

console.log(navid.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));


Person.prototype.species = 'Homo Sapiens';

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

//This is better since It can also be used with null-prototype objects.
// These do not inherit from Object.prototype, and so hasOwnProperty() is inaccessible.
// It isn't supported in safari though

// console.log(jonas.hasOwn('firstName'));


// bi-directional one to many mapping

console.log(navid.constructor === Person);
console.log(jonas.constructor === Person);
console.log(Person.prototype === navid.__proto__);

//the Person Function
console.dir(Person.prototype.constructor);

console.log(navid.__proto__);

// Object.prototype (top of the prototype chain)
console.log(navid.__proto__.__proto__);

console.log([2,3,4].__proto__ === Array.prototype);

console.dir([1,2,3].__proto__.filter)



// adding functionality using prototype (Not recommended for built-in js objects)

Array.prototype.unique = function () {

  return [...new Set(this)]
}

const duplicateArr = [1,2,2,3,4,4,4,5,6,6];

console.log(duplicateArr.unique());

//study the prototype chain
// const h1 = document.querySelector('h1');

// Function.prototype
console.dir(x => x+1)


//this will not be inherited!
Person.hey = function() {
  console.log('hey there ✋');
  console.log(this);
};

Person.hey();



