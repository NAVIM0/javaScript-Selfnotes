'use strict';

function calcAverageHumanAge(ages) {
  let newAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4).filter(age => age >= 18);
  let averageAge = newAges.reduce((accumulator, curr, index, arr) => accumulator + curr / arr.length, 0);
  console.log(newAges, averageAge);
}
let ages = [5, 2, 4, 1, 15, 8, 3];
let ages1 = [16, 6, 10, 5, 6, 1, 4];
calcAverageHumanAge(ages);
calcAverageHumanAge(ages1);
const calcAverageHumanAge1 = ages => ages.map(age => age <= 2 ? 2 * age : 16 + age * 4).filter(age => age >= 18).reduce((accumulator, curr, index, arr) => accumulator + curr / arr.length);
//# sourceMappingURL=codingChallenge#2.js.map