//============================ primitive types(not objects) ================================
//javascript primitive types:
//
//
// 1.number 2.string 3.boolean 4.undefined 5.bigint 6.null 7.symbol




// ================== variables and values (only values have types in JS) ===================
//we use let that may change during runtime/compile time and generally for assignment/reassignments of variables
let js = "amazing";



console.log(40 + 8 + 23 - 10);
console.log( 'Jonas');
console.log(23);
console.log(typeof null);
//null is an object which is a known bug not fixed due to legacy codebase!


//==================================== Operators ===========================================

//math operators
const now = 2037
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageSarah / 10,  2 ** 3);
// 2**3 means 2 to the power of 3
let x = 10 + 5;
console.log(x);

//String operator
const firstName = "Jonas"
const lastName = "Schliemann"
console.log(firstName + " " + lastName);
//typeof operator
console.log(typeof undefined);

// Assignment Operators
x += 10;
x -= 10;
x *= 10;
x /= 10;
x++;
x--;


// comparison operators
console.log(ageSarah < ageJonas);
console.log(ageSarah > ageJonas);
console.log(ageSarah === ageJonas);
console.log(ageSarah <= ageJonas);
console.log(ageSarah >= ageJonas);
//read precedence of operators from the mdn manual





//====================== strings & template literals =================================
const introduction = "I'm " +  firstName+ ', a ' + (2037 - 2010) + " year old student!\n";

//`back ticks` are necessary for using placeholders but can also work with any string
const introduction1 = `\nI'm ${firstName}, a ${2037 - 2010} year old student!\n`;
console.log(introduction, introduction1);



console.log("String with \n\
Multiple\n\
lines\n");

//made easier with backticks
console.log(`String
with multiple
lines!`)
