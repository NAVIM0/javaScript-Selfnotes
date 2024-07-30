///////////////////////////////////////
// Coding Challenge #3

/*
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game had finished, it was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/


const gameEvents :Map<number,string> = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);


const events = new Set(gameEvents.values());

gameEvents.delete(64);

let differential = 0;
let gameMinutes = Array.from(gameEvents.keys());



// i have no idea how to actually calculate the average time between events occurring during a span of time
for (let i = 0; i < gameMinutes.length - 1; i++) {

  differential += (gameMinutes[i+1] - gameMinutes[i]);
}

let averageEventDifferential = differential/(gameEvents.size - 1);

console.log(`Average minutes till an event happens: ${averageEventDifferential}\n`);


// Array.from(gameEvents.entries()).forEach((entry) => {
//
//   let [minute, description] = entry;
//
//   minute <= 45 ? console.log(`[FIRST HALF] ${minute} : ${description}`) : console.log(`[SECOND HALF] ${minute} : ${description}`);
// })


//correct way
for (let [minute, description] of gameEvents) {

  minute <= 45 ? console.log(`[FIRST HALF] ${minute} : ${description}`) : console.log(`[SECOND HALF] ${minute} : ${description}`);
}



