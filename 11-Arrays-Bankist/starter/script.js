// @flow
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

type accountData = {
  owner: string,
  movements: number[],
  interestRate: number,
  pin: number,
  username: string,
  balance: number
}

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  username: '',
  balance: 0
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  username: '',
  balance: 0
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  username: '',
  balance: 0
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  username: '',
  balance: 0
};

const accounts = [account1, account2, account3, account4];

//add usernames
accounts.forEach((account) => account.username = createUserName(account.owner));


// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername: HTMLInputElement = (document.querySelector('.login__input--user'): any);
const inputLoginPin: HTMLInputElement = (document.querySelector('.login__input--pin'): any);
const inputTransferTo: HTMLInputElement = (document.querySelector('.form__input--to'): any);
const inputTransferAmount: HTMLInputElement = (document.querySelector('.form__input--amount'): any);
const inputLoanAmount: HTMLInputElement = (document.querySelector('.form__input--loan-amount'): any);
const inputCloseUsername: HTMLInputElement = (document.querySelector('.form__input--user'): any);
const inputClosePin: HTMLInputElement = (document.querySelector('.form__input--pin'): any);

// UTIL FUNCTIONS

function displayMovements(movements: number[], sort: boolean = false) {

  containerMovements && (containerMovements.innerHTML = '');

  let movs = sort ? movements.toSorted((a, b) => a - b) : movements;

  movs.forEach((movement, index) => {

    let type = movement > 0 ? 'deposit' : 'withdrawal';

    // IMPORTANT: If you want to convert the string into an HTML doc or even a Node or Element,
    // you'd have to use the DOMParser Object...,but since the insertAdjacentHTML accepts string,
    // we don't need to do that here!
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__value">${movement}$</div>
        </div>`;

    containerMovements && containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function login() {

  if (currentAccount && labelWelcome && containerApp) {

    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements);
    calcDisplaySummery(currentAccount.movements);
    containerApp.style.opacity = '100';
  }
}

function updateUI() {

  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount.movements);
  calcDisplaySummery(currentAccount.movements);
}

function transfer(transferTo: string, transferAmount: number) {

  let balance = currentAccount.balance;

  if (balance >= transferAmount && transferAmount > 0 && (currentAccount.username !== transferTo)) {

    currentAccount.movements.push(-transferAmount);
    let targetAccount = accounts.find((account) => (account.username === transferTo));
    (targetAccount && targetAccount.movements.push(transferAmount)) || console.error('wrong TransferTo account name!');

  } else console.error('Invalid Transfer!');
}

function createUserName(userName: string) {

  return (userName.match(/(^\w)|(\s\w)/gm) || []).map((match) => match.trim()).join('').trim().toLowerCase();
}


function calcDisplayBalance(movements: number[]) {

  currentAccount.balance = movements.reduce((acc, currMovement) => currMovement + acc, 0);

  labelBalance && (labelBalance.textContent = `${currentAccount.balance}€`);
}

function calcDisplaySummery(movements: number[]) {

  let income = movements.filter((movement) => movement > 0).reduce((accu, curr) => accu + curr, 0);
  let outGoing = Math.abs(movements.filter((movement) => movement < 0).reduce((accu, curr) => accu + curr, 0));

  let interest = movements
    .filter((movement) => movement > 0)
    .map(movement => movement * (currentAccount.interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((accu, curr) => accu + curr, 0);

  //or just do this: .reduce((accu,curr ) => accu + ((curr * interestRate) > 1 ? (curr * interestRate) : 0) , 0);

  labelSumIn && (labelSumIn.textContent = `${income}€`);
  labelSumOut && (labelSumOut.textContent = `${outGoing}€`);
  labelSumInterest && (labelSumInterest.textContent = `${interest}€`);

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////

let currentAccount;

btnLogin && inputLoginPin && inputLoginUsername && btnLogin.addEventListener('click', (e) => {

    //prevent Form from submitting
    e.preventDefault();

    let inputAccount = accounts.find((account) => account.username === inputLoginUsername.value) || console.error('credentials are incorrect!');

    inputAccount && (Number(inputLoginPin.value) === inputAccount.pin ? currentAccount = inputAccount : console.error('credentials are incorrect!'));

    login();

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
);


btnTransfer && btnTransfer.addEventListener('click', (e) => {

  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const transferTo = inputTransferTo.value;

  transfer(transferTo, amount);
  updateUI();

  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
});


btnClose && inputCloseUsername && inputClosePin && btnClose.addEventListener('click', (e) => {

  e.preventDefault();

  if ((inputCloseUsername.value === currentAccount.username) && (Number(inputClosePin.value) === currentAccount.pin)) {

    containerApp && (containerApp.style.opacity = '0');

    // or use findIndex for custom conditions
    accounts.splice(accounts.indexOf(currentAccount), 1);
  }
  console.error('incorrect credentials!');

  labelWelcome && (labelWelcome.textContent = 'Log in to get started');

  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});


btnLoan && inputLoanAmount && btnLoan.addEventListener('click', (e) => {

  e.preventDefault();

  let amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(movement => movement > amount * 0.1)) {

    currentAccount.movements.push(amount);
    updateUI();
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

let sorted = false;
btnSort && btnSort.addEventListener('click', (e) => {


  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);

  //flipping the sorted flag
  sorted = !sorted;


});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling']
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


// SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2, 4));
console.log(arr.slice(-1)); // returns last element of any array in an array
console.log(arr.slice()); // returns shallow copy of the array, works like [...arr]

// SPLICE

//remember that slice and splice work differently, splice mutates the original array,
//but slice doesn't...also the second argument of the splice method is the delete count unlike the slice method
console.log(`spliced off array: ${arr.splice(-1).join('')}`);

//the original arr loses the part extracted by slice!
console.log(`Original Array: ${arr.join(', ')}`);

// REVERSE
let arr2 = ['j', 'i', 'h', 'g', 'f'];

//mutates the original array!
arr2.reverse();
console.log(arr2);


// CONCAT
const letters = arr.concat(arr2);
console.log(letters);

//replacement
console.log(...arr, ...arr2);

// JOIN
console.log(letters.join(' - '));

// AT (ES22)
let arr3 = [23, 11, 64];

//same thing
console.log(arr3[0]);
console.log(arr3.at(0));

//same thing but traditional
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);


// new ES22 way!
also used for method chaining...will also work for strings
console.log(arr.at(-1));


const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];


// FOR EACH (solution to having access to index and array inside the for each method)

//unfortunately, java doesn't support the accessing the index and array inside forEach
movements1.forEach((movement,index, array) =>
  movement > 0 ?
  console.log(`Movement ${index + 1}: You deposited ${movement}`) : console.log(`Movement ${index + 1}:
  You Withdrew ${Math.abs(movement)}`));


//the only benefit of using the for of loop over the forEach method is being able to break out of the loop midway



// FOR EACH (maps and sets)

const currencies2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling']
])


currencies2.forEach((currValue, key, map) => console.log(`${key}: ${currValue}`));


const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR'])

//in sets since we don't have keys, the forEach method just calls the value again!
currenciesUnique.forEach((currValue, key, map) => console.log(`${key}: ${currValue}`));

*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// const euroToUSD = 1.1;
//
//
// //TOOlS FOR ARRAY DATA TRANSFORMATION
//
// // MAP (Doesn't mutate the original array!)
//
// //return a value in each callback function to be placed in the same index as the curr element in a new array
// console.log(movements.map((movement) => Math.trunc(movement *= euroToUSD)));
//
//
// // FILTER
//
// // return either true for current index to be included in the new array or false for the curr index to be skipped over!
// console.log(movements.filter((movement) => movement > 0));
//
// const withdrawals = movements.filter((movement) => movement < 0);
// console.log(withdrawals);
//
//
// // REDUCE
// //return curr value to be added to accumulator
//
// const balance = movements.reduce((acc, currMovement,i, arr) => currMovement + acc,0)
//
// console.log(balance);
//
//
// // finding max value of an array using reduce
//
// //pay attention to the fact
// // that the 4 arguments of the callback function can't be used outside the function
// // and that if we need the array we just call
// //it by the original name
//
// let maximum = movements.reduce((accumulator, curr) => curr > accumulator ? curr : accumulator ,movements[0]);
// console.log(maximum);
//
//
// // FIND
// movements.find((movement) => movement < 0);
// accounts.find((account) => account.owner === 'Jessica Davis')
//
//
//
//
// // SOME
//
//checks if any of the elements match the specified condition!
//can be used instead of the find method
// console.log(movements.some(movement => movement > 0));

// // every
//
// console.log(movements.every((movement) => movement > 0));
//
//
// // Flat
// const arr = [[1,2,3],[4,5,6],7,8];
// console.log(arr.flat());
//
// const deepArr = [[...arr], [1,2,3],[4,5,6]];
// console.log(deepArr.flat(2));
// console.log(deepArr.flat());
//
//
//
// // FLATMAP
//
// const allMovements = accounts.flatMap((acc) => acc.movements);
//
// console.log(allMovements);
//
// // SORT => return > 0 -> a > b
//            return < 0 -> a < b
//            return = 0 -> a === b
//
// console.log(movements.sort((a, b) => a - b));
//
//
// /////////////////////////////////////////////////


//watch episode 25 for Array.from()


// /////////////////////////////////////////////////

// Array methods practice:
///////////////////////////////////////////////////

//1.

//my initial solution
const bankDepositSum = accounts.reduce((accumulator, account) => accumulator + account.movements.filter((movement) => movement > 0).reduce((accu, curr) => accu + curr, 0), 0);

//much simpler solution
const bankDepositSum1 =
  accounts
    .flatMap((account) => account.movements)
    .filter(movement => movement > 0)
    .reduce((a, b) => a + b, 0);


console.log(bankDepositSum);
console.log(bankDepositSum1);
////////////////////////////////

//2.

let bankDeposit1000 = accounts.flatMap((account) => account.movements).filter((movement) => movement >= 1000).length

let bankDeposit1000New = accounts.flatMap((account) => account.movements).reduce((count,curr) => curr >= 1000 ? ++count : count,0)


console.log(bankDeposit1000);
console.log(bankDeposit1000New);
/////////////////////////////////

//3.
//notice how the accumulator can be anything including an object

let sums = accounts
  .flatMap((account => account.movements))
  .reduce((sums,curr) => {

    sums[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
    return sums;

  }, {deposits: 0, withdrawals: 0});


console.log(sums);
///////////////////////////////

//4.



