function consumptionMeter(dog) {
  if (!dog) {
    return null;
  }
  if (dog.curFood > dog.recommendedFood * 0.90 && dog.curFood < dog.recommendedFood * 1.10) {
    return 0;
  } else if (dog.curFood < dog.recommendedFood * 0.90) {
    return -1;
  } else {
    return 1;
  }
}
const dogs = [{
  weight: 22,
  curFood: 250,
  owners: ['Alice', 'Bob']
}, {
  weight: 8,
  curFood: 200,
  owners: ['Matilda']
}, {
  weight: 13,
  curFood: 275,
  owners: ['Sarah', 'John']
}, {
  weight: 32,
  curFood: 340,
  owners: ['Michael']
}];
dogs.forEach(dog => dog.recommendedFood = dog.weight ** 0.75 * 28);
console.log(consumptionMeter(dogs.find(dog => dog.owners.includes('Sarah'))));
let {
  ownersEatTooMuch,
  ownersEatTooLittle
} = dogs.reduce((accuObject, curDog) => {
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
}, {
  ownersEatTooMuch: [],
  ownersEatTooLittle: []
});
console.log(ownersEatTooLittle, ownersEatTooMuch);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));
console.log(dogs.some(dog => consumptionMeter(dog) === 0));
let dogsEatingOK = dogs.filter(dog => consumptionMeter(dog) === 0);
console.log(dogsEatingOK);
let ascendingOrderDogs = dogs.toSorted((a, b) => a.recommendedFood - b.recommendedFood);
console.log(ascendingOrderDogs);
//# sourceMappingURL=codingChallenge#3.js.map