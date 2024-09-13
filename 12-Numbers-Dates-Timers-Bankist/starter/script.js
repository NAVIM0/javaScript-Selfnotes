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
  balance: number,
  currency: string,
  locale: string,
  movementsDates: string[],
}

// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2024-08-14T12:01:20.894Z',
    '2024-08-15T12:01:20.894Z',
    '2024-08-16T12:01:20.894Z'
  ],
  currency: 'EUR',
  locale: 'en-PT', // de-DE
  username: 'js',
  balance: 0
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  username: 'jd',
  balance: 0,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2024-08-16T12:01:20.894Z'
  ],
  currency: 'USD',
  locale: 'en-US'
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

let now = new Date();
// labelDate && (labelDate.textContent = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()).padStart(2,'0')}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`);

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  weekday: 'short'
};

// //from browser
// const locale = navigator.language;


// UTIL FUNCTIONS

function calcDaysPassed(date1: Date, date2: Date) {

  return Math.round(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
}

function formatMovementDate(date: Date, locale: string) {

  let daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
}

let numberFormatter;

function displayMovements(account: accountData, sort: boolean = false) {

  numberFormatter = Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currentAccount.currency,
  });

  containerMovements && (containerMovements.innerHTML = '');

  let movs = sort ? account.movements.toSorted((a, b) => a - b) : account.movements;

  movs.forEach((movement, index) => {

    let date = new Date(account.movementsDates[index]);

    let displayDate = formatMovementDate(date, currentAccount.locale);

    let type = movement > 0 ? 'deposit' : 'withdrawal';

    // IMPORTANT: If you want to convert the string into an HTML doc or even a Node or Element,
    // you'd have to use the DOMParser Object...,but since the insertAdjacentHTML accepts string,
    // we don't need to do that here!
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${numberFormatter.format(movement)}</div>
        </div>`;

    containerMovements && containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

let timer;

function login() {

  if (currentAccount && labelWelcome && containerApp) {

    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    labelDate && (labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now));
    displayMovements(currentAccount);
    calcDisplayBalance(currentAccount.movements);
    calcDisplaySummery(currentAccount.movements);

    if(timer) clearInterval(timer);
    timer = startLogoutTimer();
    containerApp.style.opacity = '100';
  }
}

function updateUI() {

  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount.movements);
  calcDisplaySummery(currentAccount.movements);
}

function transfer(transferTo: string, transferAmount: number) {

  let balance = currentAccount.balance;

  if (balance >= transferAmount && transferAmount > 0 && (currentAccount.username !== transferTo)) {

    let targetAccount = accounts.find((account) => (account.username === transferTo));

    if (targetAccount) {
      let date = new Date().toISOString();
      currentAccount.movements.push(-transferAmount);
      currentAccount.movementsDates.push(date);
      targetAccount.movements.push(transferAmount);
      targetAccount.movementsDates.push(date);

    } else console.error('wrong TransferTo account name!');

  } else console.error('Invalid Transfer!');
}

function createUserName(userName: string) {

  return (userName.match(/(^\w)|(\s\w)/gm) || []).map((match) => match.trim()).join('').trim().toLowerCase();
}


function calcDisplayBalance(movements: number[]) {

  currentAccount.balance = movements.reduce((acc, currMovement) => currMovement + acc, 0);

  labelBalance && (labelBalance.textContent = `${numberFormatter.format(currentAccount.balance)}`);
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

  labelSumIn && (labelSumIn.textContent = `${numberFormatter.format(income)}`);
  labelSumOut && (labelSumOut.textContent = `${numberFormatter.format(outGoing)}`);
  labelSumInterest && (labelSumInterest.textContent = `${numberFormatter.format(interest)}`);
}

function startLogoutTimer() {

  let time = 300;

  let tick = () => {

    const min = Math.trunc(time / 60);
    const sec = time % 60;

    labelTimer && (labelTimer.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`);

    if (time === 0) {
      clearInterval(timer);
      labelWelcome && (labelWelcome.textContent = 'Log in to get started');
      containerApp && (containerApp.style.opacity = '0');
    }

    time--;
  }

  tick();
  let timer = setInterval(tick,1000);
  return timer;
}
/////////////////////////////////////////////////
////////////////////EventListeners////////////////////

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

  clearInterval(timer);
  timer = startLogoutTimer();
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

  let amount = Math.floor(Number.parseFloat(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(movement => movement > amount * 0.1)) {

    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI();
    }, 2500)
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  clearInterval(timer);
  timer = startLogoutTimer();
});

let sorted = false;
btnSort && btnSort.addEventListener('click', (e) => {


  e.preventDefault();
  displayMovements(currentAccount, !sorted);

  //flipping the sorted flag
  sorted = !sorted;
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//
// // all numbers are floating-point on a 64-bit Base 2 system
// console.log(23 === 23.0);
//
// console.log(Number.parseInt('32A',16));
//
//
// // Numeric Separator
// const diameter = 287_460_000_000;
//
// console.log(diameter);
//
// console.log(Number('230_000'));
//
//
// //bigInt
//
// let bigInt: bigint = 32n;
// let BigInt1 = BigInt(32);
//
// // Math.sqrt(15n) => won't work
//
// console.log(bigInt);
// console.log(bigInt);
//
// console.log(11n / 3n); //bigInt as the name suggests is always an integer
//
// console.log(new Date());
//
// console.log(new Date('Fri Aug 16 2024 16:56:33 GMT+0330 (Iran Standard Time'));
//
// const future = new Date(2037, 10, 19, 15,23);
//
// console.log(future.getFullYear());
// console.log(future.getMonth()); // ⇒ zero based there are months 0 to 11
// console.log(future.getDate()); // day of the month
// console.log(future.getDay()); // day of the week
// console.log(future.toISOString());
// console.log(Date.now()); // gives the timestamp (EPOCH time by milliseconds)
// console.log(new Date(Date.now()));
//
//

//Date calculations are done by getting timestamps(get milliseconds) and +/- ed

// //Internationalization

// const num = 2888888.47;
//
// console.log(new Intl.NumberFormat(navigator.language,
//   {
//     style: 'currency',
//     unit: 'celsius',
//     currency: 'EUR',
//     useGrouping: true
//
//   }).format(num));


// //setTimeout
// const ingredients = ['olives','spinach'];
//
// let pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}🍕`),
//   3000,
//   ...ingredients);
//
// console.log('Waiting...');
//
// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
//

// //setInterval
// setInterval(() => {
//   const now = new Date();
//   console.log(now);
// }, 3000)