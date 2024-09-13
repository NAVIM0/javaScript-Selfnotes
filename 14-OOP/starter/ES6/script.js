// @flow

// remember that OOP in JS even after ES6 is just syntactic sugar and is just prototypes


//class expression
const PersonEx = class PersonCl {}


// 1. Classes are NOT hoisted (can't use them before they are declared)
// 2. Classes are first-class citizens (we can pass them and return them to and from functions)
// 3. Classes are executed in strict mode
// 4. The getter / setters are not neccessarily for encapsulation
// 5. The set and get method names cannot be the same as the field names since calling them will cause stack overflow

// class declaration
class Person {

  // # === private
  #firstName: string;
  #birthYear: number;

  //only 1 constructor
  constructor(firstName: string, birthYear: number) {

    //using getter/setter in constructor function
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  get firstName(): string {
    return this.#firstName;
  }

  set firstName(value: string) {
    this.#firstName = value;
  }

  get birthYear(): number {
    return this.#birthYear;
  }

  set birthYear(value: number) {
    this.#birthYear = value;
  }

  //any method written outside the constructor will be the method of the prototype and not the object itself!(instance methods)
  calcAge() {
    console.log(2024 - this.#birthYear);
  }


  //static method (not instance method)
  static hey() {

    console.log('hey there ✋');
    console.log(this);
  }
}


const jessica = new Person('jessica', 1996);

console.log(jessica);

jessica.calcAge();

jessica.firstName = 'Jonas';

console.log(jessica.firstName);


const account: {owner: string, movements: number[], latest: Function} = {
  owner: 'Jonas',
  movements: [200,530,120,300],

  get latest() {
    return account.movements.slice(-1).pop()
  },

  set latest(mov) {
    account.movements.push(mov);
  }
}

// Example usage of getter/setters
account.latest = 400;

console.log(account.latest);


Person.hey();

// object.create() just creates a object and sets its __proto__ argument to the argument of the create method!


// const PersonProto = {
//
//   calcAge(this: {calcAge: Function}) {
//     console.log(2037 - this.birthYear);
//   }
//
// }
//
//
// const steven = Object.create(PersonProto);
//
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge();


// older way of creating the prototypical link needed for inheritance:

// Student.prototype = Object.create(Person.prototype)
// Student.prototype.constructor = Student;

class Student extends Person {

  #course: string;

  constructor(firstName: string, birthYear: number, course: string) {
    super(firstName, birthYear);
    this.#course = course;
  }

  introduce() {
    console.log(`My Name is ${this.firstName} and I study ${this.#course}`);
  }
}


const mike = new Student('Mike',2020,'Computer Science');

mike.introduce();



//////////////////////////////////////ENCAPSULATION/////////////////////////////////////////////

class Account {

  //protected property
  _owner: string;

  //private property
  #currency: string;
  #pin: number;
  #movements: number[];
  #locale: string


  constructor(owner: string, currency: string, pin: number) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }



  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }

  get currency(): string {
    return this.#currency;
  }

  set currency(value: string) {
    this.#currency = value;
  }

  get pin(): number {
    return this.#pin;
  }

  set pin(value: number) {
    this.#pin = value;
  }

  get movements(): number[] {
    return this.#movements;
  }

  set movements(value: number[]) {
    this.#movements = value;
  }


  get locale(): string {
    return this.#locale;
  }

  set locale(value: string) {
    this.#locale = value;
  }



  deposit(value: number) {
    this.movements.push(value);
  }

  withdraw(value: number) {
    this.movements.push(-value);
  }

  //private methods
  #approveLoan():boolean {
    return true;
  }


  requestLoan(value: number) {

    if (this.#approveLoan()) {
      this.deposit(value)
      console.log(`Loan approved!`);
    }
  }
}


const acc1 = new Account('Jonas','EUR', 1111);
acc1.deposit(100)

acc1.withdraw(140)
acc1.requestLoan(1000);

//private method
// acc1.approveLoan();

console.log(acc1);
