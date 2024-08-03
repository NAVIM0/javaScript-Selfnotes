'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    let answer = prompt(`${poll.question}\n${poll.options.join("\n")}`);
    /^\s*[0123]\s*$/gm.test(answer) ? poll.answers[Number(answer.trim())]++ : console.error('Enter a valid number!');
    poll.displayResults('array');
  },
  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`poll results are ${this.answers.join(", ")} `);
    }
  }
};
const createPoll = document.querySelector('.poll');
if (createPoll) createPoll.addEventListener('click', poll.registerNewAnswer.bind(poll));
poll.displayResults.call({
  answers: [5, 2, 3]
}, 'string');
//# sourceMappingURL=codingChallenge#1.js.map