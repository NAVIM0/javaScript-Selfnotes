// @flow
"use strict";

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true

if (hasDriversLicense) console.log("I can Drive!")
const friends = ['radan', 'parsa', 'mmd'];

const array = [32563, ...friends, 'xkwhbx kbwx']
console.log(array);


type module = {
    firstName: string,
    birthYear: number,
    calcAge: () => number
}


//object literal, different from a class...since this isn't a blueprint and has values assigned inside
//this basically an initialized class that has values assigned to its field (Class Instance)
let object =

    {
        firstName: "navid",
        birthYear: 2003,
        //writing the function keyword is absolutely necessary
        calcAge: function (this: module) {
            let date = new Date();
            return date.getFullYear() - this.birthYear;
        }
    };

console.log(object.calcAge())
