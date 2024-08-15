///////////////////////////////////////
// Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dog array and sort it by recommended food portion in ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/

function consumptionMeter(dog) {

  if (!dog){
    return null;
  }

  if(dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)) {
    return 0;
  }else if (dog.curFood < (dog.recommendedFood * 0.90)) {
    return -1
  }else {
    return 1;
  }
}

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
dogs.forEach((dog) => dog.recommendedFood = dog.weight ** 0.75 * 28);

//2.
console.log(consumptionMeter(dogs.find((dog) => dog.owners.includes('Sarah'))));

//3.

//the overly complicated way:
let {ownersEatTooMuch, ownersEatTooLittle} = dogs.reduce((accuObject,curDog) => {

  switch (consumptionMeter(curDog)) {
    case 1:
      accuObject.ownersEatTooMuch.push(...curDog.owners);
      break;
    case -1:
      accuObject.ownersEatTooLittle.push(...curDog.owners);
      break;
    default:
  }

  return accuObject;

}, {ownersEatTooMuch:[] ,ownersEatTooLittle:[]});

console.log(ownersEatTooLittle,ownersEatTooMuch);

//4.

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//5.
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

//6.
console.log(dogs.some((dog) => consumptionMeter(dog) === 0));

//7.
let dogsEatingOK = dogs.filter((dog) => consumptionMeter(dog) === 0);

console.log(dogsEatingOK);

//8.

let ascendingOrderDogs = dogs.toSorted((a, b) => a.recommendedFood - b.recommendedFood);

console.log(ascendingOrderDogs);