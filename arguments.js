function sum (...nums) {
  let total = 0;
  nums.forEach(el => {
    total += el;
  });

  // for (let i = 0; i < arguments.length; i++){
  //   total += arguments[i];
  // }
  return total;
}

// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5) === 15);

// Function.prototype.myBind = function (ctx) {
//   return () => this.apply(ctx);
// };

Function.prototype.myBind = function (context, ...args) {
  return (...args1) => this.apply(context, args.concat(args1));
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

function curriedSum(numArgs) {
  let numbers = [];
  function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      return sum(...numbers);
    }
    else{
      return _curriedSum;
    }
  }
  return _curriedSum;
}

const summate = curriedSum(4);
console.log(summate(5)(30)(20)(1)); // => 56

Function.prototype.curry = function (numArgs) {
  let numbers = [];
  let func = this;
  function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      return func.apply(null, numbers);
      //return Function.prototype.apply(func,number);
    }
    else{
      return _curriedSum;
    }
  }
  return _curriedSum;
};


console.log(sum.curry(4)(5)(30)(20)(1));
