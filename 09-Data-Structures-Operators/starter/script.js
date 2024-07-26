// @flow
'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


type restaurantObject = {
  name: string,
  location: string,
  categories: string[],
  starterMenu: string[],
  mainMenu: string[],
  openingHours: {
    [string]: {
      open: number,
      close: number
    }
  },
  order: (number,number) => string[]
}


// Data needed for the first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Brochette', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function(this: restaurantObject, starterIndex: number, mainIndex: number) {

    return [this.starterMenu[starterIndex], this.starterMenu[mainIndex]];
  }
};



//********************* DESTRUCTURING *******************************

const array = [2,3,4];

const a = array[0];
const b = array[1];
const c = array[2];


console.log("\n#Deconstructing Examples:");
//or use destructuring
const [x,y,z] = array;
console.log(x,y,z);


//first and second elements
let [first, second] = restaurant.categories;
console.log(first, second);

//third elements
const [ , , third] = restaurant.categories;
console.log(third);

//----------------------------------------------------------------------

console.log("\n#Swaping Demonstration:");
console.log("------------------------------");
console.log(first,second);
//#### Normal swapping

//let temp = first;
//first = second;
//second = temp

//Or swapping using destructuring
[first, second] = [second, first]
// the left side represents the re-assignment order

console.log(first, second);
console.log("------------------------------");


//another more practical example of swapping object properties!

//############## receiving 2 return values out of one function call!!
let [starter, mainCourse] = restaurant.order(2,0);

console.log("Before Swapping:");
console.log(`${starter}, ${mainCourse}`);

[starter, mainCourse] = [mainCourse, starter];

console.log("\nAfter Swapping:");
console.log(`${starter}, ${mainCourse}`);

//--------------- NESTED DESTRUCTURING -----------------------------------

console.log("--------------NESTED DESTRUCTURING----------------");

const nested = [1,2,[3,4]];

let [i, ,j] = nested;
console.log(i, j);


let [k, ,[d,q]] = nested
console.log(k,d,q);


//########## default values ############ (in case of undefined value)

// const [p, r, g] = [8 , 9] => p = 8 , r = 9 , g = undefined

const [p = 1,r= 2 ,g= 3 ] = [8 , 9];

console.log(p,r,g);


