// @flow

'use strict';


///////////////////////////////////////
// Coding Challenge #1

/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answer array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number, and if the number makes sense (e.g., answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

type pollObject = {

  question: string,
  options: string[],
  answers: Array<number>,
  registerNewAnswer: () => void,
  displayResults: (string) => void,
}


const poll: pollObject = {

  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array<number>(4).fill(0),

  registerNewAnswer() {

    let answer = prompt(`${poll.question}\n${poll.options.join("\n")}`
    );

    /^\s*[0123]\s*$/gm.test(answer) ? poll.answers[Number(answer.trim())]++ : console.error('Enter a valid number!');

    poll.displayResults('array');
  },

  displayResults: function(this: pollObject,type = 'array') {

    if (type === 'array') {

      console.log(this.answers);

    } else if (type === 'string') {

      console.log(`poll results are ${this.answers.join(", ")} `);
    }
  }
};

const createPoll = document.querySelector('.poll');
if (createPoll) createPoll.addEventListener('click', poll.registerNewAnswer.bind(poll));





//the bonus is just bad practice, so I refuse to do it!
poll.displayResults.call({answers: [5,2,3]},'string');
