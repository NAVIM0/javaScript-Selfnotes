// @flow
///////////////////////////////////////
// Coding Challenge #4

/*
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

 */


class Car {

  #make: string
  #speed: number


  constructor(make: string, speed: number) {
    this.#make = make;
    this.#speed = speed;
  }

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


  accelerate():Car {

    this.speed += 10;
    console.log(this.speed);
    return this
  }

  brake(): Car {

    this.speed -= 5;
    console.log(this.speed);
    return this
  }
}


class EV extends Car {

  #charge: number


  constructor(make: string, speed: number, charge: number) {
    super(make, speed);
    this.#charge = charge;
    this.#charge = charge;
  }


  get charge(): number {
    return this.#charge;
  }

  set charge(value: number) {
    this.#charge = value;
  }

  chargeBattery(chargeTo: number) : EV{
    this.charge = chargeTo;
    return this;
  }

  accelerate(): EV {

    this.speed += 20;
    this.charge --;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%'`);
    return this;
  }

}



let rivian = new EV('Rivian', 120,23);


rivian
  .accelerate().accelerate().brake().accelerate().brake();

