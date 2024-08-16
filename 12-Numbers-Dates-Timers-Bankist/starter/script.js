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
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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
