// @flow
'use strict';

//by testing,
// you can clearly see that JavaScript is interpreted
// and JIT-compiled only in some modern browsers like chrome using the V8 engine!
//for optimization purposes!

//like this code:
/*
  function sayHello(name) {

  name.charAt(0);
  }

  console.log("js is");
  console.log("definitely");
  console.log("interpreted");

  name = [32,45,5,6645];

  sayHello(name);
 */

// also that dom manipulation and some other super Important stuff are not part of js
// and are api are provided by browsers!

function calcAge(birthYear : number) {

  //function Scope
  let currentDate = new Date();
  const age = currentDate.getFullYear() - birthYear;


  function printAge () {
    const output = `${firstName} is ${age} and is Born in ${birthYear}`;
    console.log(output);

    
    if (birthYear >= 1981 && birthYear <= 1996) {


      //hoisting of variable is mostly the same in java too except the "undefined" of var variables!

      //won't work and is *uninitialized* since lastName is defined later,
      // and let and const variables aren't hoisted and so it's in TDZ (Temporal Dead Zone)
      // if (lastName) {
      //
      // }

      // const lastName = "mahjoub"

      const firstName = "scott";


      //var variables aren't hoisted and just become *undefined* if accessed before their declaration!
      //var is function scoped!
      // ->
      // not block scoped
      var millennial = true;


      //since a firstName is defined in this scope already, there will be no variable look-up
      //and it wil just use the one in this scope!!!
      const message = `inside the block scope the firstName is: ${firstName}`;
      console.log(message);


      function add(a:number, b: number) {

        return a + b;
      }

      //add function can only be used in this block in strict mode!
      console.log(add(2,3));
    }

    //since the variable firstName isn't defined in this function scope, there will be a variable lookup
    //that will result in using the global scope variable first name being used, and hence the first name
    //will be "John"!
    console.log(`outside the block scope the firstName is: ${firstName}`);


    /*
    VERY IMPORTANT INFORMATION:

      Code like the above example (Two FirstName Variables in one scope) won't be accepted in
      other languages such as java...since two variables with the same name Can't exist in a single scope!

     */

    
    //add function will not be recognized since functions are block scoped in strict mode!
    //add(3,4);
    console.log(millennial);
  }

  printAge();
  return age;
}

//global scope
let firstName = 'John';
calcAge(1986);






//variable hoisting


console.log(me);
//console.log(job);
//console.log(year);



var me = "jonas";
let job = "teacher";
const year = 1991;




//function hoisting

console.log(addDecl(2,3));
// console.log(addExpr(2,3));
// console.log(addArrow(2,3));


//hoisting only works for function declaration!
function addDecl(a : number, b: number) {
  return a + b;
}




//arguments keyword!
const addExpr = function(a: number, b: number) {

  console.log(arguments);

  return a + b;
}

addExpr(2,5);

const addArrow = (a: number,b: number) => a + b;



//*** THIS KEYWORD ****//


//also around the subject of the "this" keyword...it simply references the object calling it!
//in JavaScript, you can copy an objects function by doing => "let f = jonas.clacAge;"
//and the value of the function by doing => "let f = jonas.calcAge();"

//also notice that if the copied method is the borrowed by another object, the "this" keyword used inside
//the borrowed function will belong to the object calling the function like this:

//navid.calcAge = omid.func
//navid.calcAge(); ==> the this keyword will refer to the navid object

//also arrow function's this keyword belongs to the parent scope unlike a regular function
//if no object is calling a method, then the "this" keyword used inside that method will be undefined
//even if it's called inside an object!

//except if the function call calls an arrow function, in which case the arrow function just uses its parent scope's this


type module = {
  birthYear: number,
  calcAge?: () => number
}

type alternativeType = {
  [string]:mixed

  //could add + or - before [String] to specify Read-Only and Write-Only
}

let navid = {
  birthYear: 2003,

  calcAge: function(this: {birthYear : number,...}) {

    //only works if it's an arrow function!
    let isYoung = () => {
      console.log(this);
      if (this.birthYear < 2004) {

        console.log("Message from the isYoung function in the navid Object");
      }
    };
    isYoung();
    return 2024 - this.birthYear;
  },
};

let omid : module = {
  birthYear: 1998,
}

//don't need the | | because exact_by_default is on in .flowConfig
let omid2 : {|birthYear: number|} = {
  birthYear: 1998
}

console.log(navid.calcAge());

omid.calcAge = navid.calcAge;

//this will refer to Omid
console.log(omid.calcAge());






//javaScript & Java are pass-by-value since the value of the passed
// argument to the function(which is the address of "object" in heap)
// wasn't changed for the passed variable to the changeValue Function
//and navid's actual value which is the address of the object literal that it contains the address of
// stays the same after the function is called
// as seen by the result of console.log

//note that the same logic applies for variables that contain primitive types instead of object addresses!
function changeValue(object:module) {

  return object = omid;
}


console.log(changeValue(navid));
console.log(navid);


//languages like c++ can pass the actual reference to the function which will result in
//potential change to the initial value of the variable passed unlike what we see here!


//C is kinda pass by reference by some trickery with address and dereferencing of variables!




//JavaScript being Pass-By-Value Example!
function swap(a: number, b: number) {
  let temp = a;
  a = b;
  b = temp;

  //the variables created temporarily for this execution context are changed but not the OG Variables!
  console.log(a,b);
}

let a = 3;
let b = 5;

swap(a,b);
console.log(a,b);


//COPY AN OBJECT -> won't work on a nested object...it's a shallow copy, not a deep clone!
//{} was marked as a dictionary of string: number which is what our object literals are basically
const navidCopy = Object.assign(({}: {[string]:number|Function}),navid);

navidCopy.birthYear = 2005;

console.log(navid.birthYear);
console.log(navidCopy.birthYear);