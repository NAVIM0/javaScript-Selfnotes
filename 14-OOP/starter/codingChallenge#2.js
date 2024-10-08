// @flow
///////////////////////////////////////
// Coding Challenge #2

/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

 */

class Car {

  #make: string
  #speed: number

  get make(): string {
    return this.#make;
  }

  set make(value: string) {
    this.#make = value;
  }

  get speed(): number {
    return this.#speed;
  }

  set speed(value: number) {
    this.#speed = value;
  }

  constructor(make: string, speed: number) {

    this.make = make;
    this.speed = speed;
  }

  get speedUS() : number {
    return this.speed/1.6;
  }

  set speedUS(value: number) {
    this.speed = value * 1.6;
  }


  accelerate() {

    this.speed += 10;
    console.log(this.speed);
  }

  brake() {

    this.speed -= 5;
    console.log(this.speed);
  }
}


let ford = new Car('Ford', 120);


ford.brake();
ford.accelerate();
console.log(ford.speedUS);