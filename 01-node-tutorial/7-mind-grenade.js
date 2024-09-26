const num1 = 5;
const num2 = 10;

function addValues() {
  console.log(`The sum is ${num1 + num2}`);
}

addValues();
//note: node wraps modules (which is all files) in a function so simply having (require('./7-mind-grenade'); will run it!
