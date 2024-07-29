// @flow
'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


type openingHoursObject = {
  [string]: {
    open: number,
      close: number
  }
}

type restaurantObject = {
  name: string,
  location: string,
  categories: string[],
  starterMenu: string[],
  mainMenu: string[],
  numGuests: null,
  openingHours: openingHoursObject,
  order: (number, number) => string[],
  orderDelivery: (any) => void,
  orderPasta: (string, string, string) => void,
  orderPizza: (string, ...string[]) => void
}

const weekDays = ['sat','sun','mon','tue','wed','day-6th','fri'];

const openingHours : openingHoursObject = {

  //Enhanced Object Literals, You can now have computed property names instead of literally specified
  //previously only values could be computed and not the property names
  [weekDays[3]]: {
    open: 12,
    close: 22
  },
  fri: {
    open: 11,
    close: 23
  },
  [`day-${2+4}th`]: {
    open: 0, // Open 24 hours
    close: 24
  }
};


// Data needed for the first part of the section
const restaurant: restaurantObject = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Brochette', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  numGuests: null,

  //Enhanced Object Literals (Previous way: openingHours: openingHours)
  openingHours,

  order: function(this: restaurantObject, starterIndex, mainIndex) {

    return [this.starterMenu[starterIndex], this.starterMenu[mainIndex]];
  },

  //Enhanced Object Literals (Examples of previous way is the above function)
  //function using destructuring
  orderDelivery ({ starterIndex, mainIndex, time, address }) {

    console.log(`Order Received ${restaurant.starterMenu[starterIndex]} ,and ${restaurant.mainMenu[mainIndex]}
will be delivered to ${address} at time: ${time}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Your Pasta is Ready with ${ing1}, ${ing2}, and ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {

    console.log('Main Ingredient: ' + mainIngredient);
    console.log('Other Ingredient: ' + otherIngredients.toString() + '\n');
  }

};


//********************* DESTRUCTURING *******************************

const array = [2, 3, 4];

const a = array[0];
const b = array[1];
const c = array[2];

console.log('--------------#Deconstructing Examples:----------------');
//or use destructuring
const [x, y, z] = array;
console.log(x, y, z);


//first and second elements
let [first, second] = restaurant.categories;
console.log(first, second);

//third elements
const [, , third] = restaurant.categories;
console.log(third);

//----------------------------------------------------------------------

console.log('--------------#Swaping Demonstration:----------------');
console.log(first, second);
//#### Normal swapping

//let temp = first;
//first = second;
//second = temp

//Or swapping using destructuring
[first, second] = [second, first];
// the left side represents the re-assignment order

console.log(first, second);
console.log('--------------swapping object properties----------------');


//another more practical example of swapping object properties!

//############## receiving 2 return values out of one function call!!
let [starter, mainCourse] = restaurant.order(2, 0);

console.log('Before Swapping:');
console.log(`${starter}, ${mainCourse}`);

[starter, mainCourse] = [mainCourse, starter];

console.log('\nAfter Swapping:');
console.log(`${starter}, ${mainCourse}`);

//--------------- NESTED DESTRUCTURING -----------------------------------

console.log('--------------NESTED DESTRUCTURING----------------');

const nested = [1, 2, [3, 4]];

let [i, , j] = nested;
console.log(i, j);


let [k, , [d, q]] = nested;
console.log(k, d, q);


//########## default values ############ (in case of undefined value)

// const [p, r, g] = [8 , 9] => p = 8 , r = 9 , g = undefined

const [p = 1, r = 2, g = 3] = [8, 9];

console.log(p, r, g);

console.log('--------------OBJECT DESTRUCTURING----------------');

//it's the same idea, but we use {} instead of [] and property names!

const { name, openingHours: opening, categories } = restaurant;

console.log('Opening Hours: ');
console.log(opening);
console.log(`Restaurant Name: ${name},
Food Categories: ${categories.toString()}`);

//same thing, but we can change variable names!
const {
  name: restaurantName, openingHours: hours
  , categories: tags
} = restaurant;

console.log('\n-----------------------------MUTATING VALUES WHILE DESTRUCTURING----------------');

let menu: string[];
//default value assignment Notice the current syntax:

// (you have to put it in () since you can't assign an object to an object literal)

({ menu = ['No Menu Was Found In Object Restaurant'] } = restaurant);

console.log(`Default Menu Value Set While Destructuring:  "${menu}"`);

console.log('\n-----------------------------');

let number1 = 111;
let number2 = 999;

console.log(`Previous number1: ${number1} & number2: ${number2}`);
const object = {
  number1: 23,
  number2: 7,
  c: 14
};

//notice the syntax, () is needed!
({ number1, number2 } = object);

console.log(`number1 After Mutation By Destructuring: ${number1} & number2: ${number2}`);

console.log('\n--------------NESTED OBJECT DESTRUCTURING----------------');

const { fri: { open: openF, close: closeF } } = openingHours;

//we for some reason can't access fri or the parent object
//console.log(fri) => exception
console.log(openF, closeF);


console.log('\n-----------------------------');
console.log('Passing Object to method and destructuring it in runtime using Object Destructuring:\n ');

restaurant.orderDelivery({
  time: '22:30',
  address: 'Babol, ShahabNia, Madar blvd.',
  mainIndex: 2,
  starterIndex: 2
});

console.log('\n--------------THE SPREAD OPERATOR----------------');

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
const goodNewArray = [1, 2, ...arr];
const otherArr = [1, 2, arr];

console.log(badNewArr, goodNewArray, otherArr);


//another usage: for Iterables Like arrays, Strings, maps, sets. NOT OBJECTS!
console.log(...goodNewArray);

let str = new String('string');
console.log(...str);

//shallow copy of an array
const mainMenuCopy = [...restaurant.mainMenu];

//Joining 2 Arrays
const joinArray = [...badNewArr, ...goodNewArray];

//using spread operator for any place expecting arguments separated by commas
// const ingredients = [prompt("Ingredient1?"),
//   prompt("Ingredient2?"),
//   prompt("Ingredient3?")];
//
// console.log(ingredients);
//
// restaurant.orderPasta(...ingredients);

//apparently spread operator also works on objects:
const newRestaurant = {
  ...restaurant,
  founder: 'Mahjoub',
  foundedIn: new Date().getFullYear()
};

console.log(newRestaurant);

console.log('\n--------------THE REST OPERATOR----------------');

//REST Operator because ... is on the left side of =
const [number01, number02, ...others] = [1, 2, 3, 4, 5, 6];
console.log(others);

//Rest Operator For Objects
const { sat, ...weekdays } = restaurant.openingHours;

//object only containing friday and thuesday's opening hours!
console.log(weekdays);


//in function arguments
//Rest operator (You spread the array at line 275, and then they are collected at function call)
const add = function(...numbers: number[]) {
  let sum = 0;
  numbers.forEach((number: number) => sum += number);
  return sum;
};

console.log(add(1, 2, 1, 11));

//add(2,3) | add(2,3,4,5) | add()

const addArray = [23, 5, 7];

//spread Operator
console.log(add(...addArray));


restaurant.orderPizza('mushrooms');
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

console.log('\n--------------SHORT CIRCUITING USING "||", "&&"----------------');

// logical operators can use ANY Data Type, and return any data type

//3 is not a falsy value, so it's shortly circuited and returned
console.log(3 || 'navid');
console.log('' || 'navid');
console.log(true || 0);
console.log(undefined || null);


//or operation returns the first non-falsy value in the expression!
console.log(undefined || 0 || '' || 'Hello' || 23 || null);


//we could use:

// const guests = restaurant.numGuests || 10;

//instead of:

// const guests = restaurant.numGuests ? restaurant.numGuests : 10;

console.log('\n--------------THE NULLISH COALESCING OPERATOR (??)----------------');

//this operator works only on NULL-ish values like null and undefined not falsy values(NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//HOW IT WORKS: the first expression is evaluated,
// and if not NULL, the evaluation continues until a non-nullish expression is found and returned!

console.log('\n--------------THE LOGICAL ASSIGNMENT OPERATORS----------------');

const rest1 = {
  name: 'capri',
  numGuests: 0
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi'
};


//OR Assignment Operator (Works for assigning values to falsy variables and properties!)

//rest1.numGuests = rest1.numGuests || 10;
console.log(rest1.numGuests ||= 10);

//rest2.numGuests ||= 10; => works but flow doesn't like it!


//Nullish assignment operator
// rest2.numGuests ??= 10; => this is the proper way, but flow still doesn't like this!

//And assignment operator (replaces if else statements)

console.log('\n--------------ENHANCED OBJECT LITERALS----------------');

console.log(`check the openingHours and restaurant object literal declarations for this section!`);

console.log('\n--------------OPTIONAL CHAINING (?.)----------------');
//this basically checks if the value on the left exists
// and is set to undefined if it doesn't, instead of throwing a runtime error!


//instead of:

// if (restaurant.openingHours && restaurant.openingHours.mon) {
// console.log(restaurant.openingHours.mon.open);
//}

console.log(restaurant.openingHours?.mon?.open);

console.log('\n------------------------------');

//Example
const days = ['sat','sun','mon','tue','wed','day-6th','fri'];

//the For Of Loop used for Iterables!
for (let day of days) {

  //using Nullish coalescing operator
  console.log(`On ${day}, We Open At ${restaurant.openingHours[day]?.open ?? "NaN"}`);

}


// Optional Chaining On Methods
console.log(restaurant.order?.(0,1) ?? "Method Does Not Exist");

// Optional Chaining On Arrays
const users = [{name: 'John', email: 'john@example.com'}];
console.log(users[0]?.name ?? "User Not Available");


console.log('\n--------------Looping Over Objects----------------');

for (let day of Object.keys(openingHours)) {

  console.log(day);
}

const values = Object.values(openingHours);
console.log(values);

const entries = Object.entries(openingHours);


//logging the entries by deconstructing them!
for (let [key , {open, close}] of entries) {

  console.log(`On ${key} we open at ${open} and close at ${close}`);
}






