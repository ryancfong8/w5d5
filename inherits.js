function Surrogate () {}

// Function.prototype.inherits = function(superClass) {
// Surrogate.prototype = superClass.prototype;
//
// // Set `Dog.prototype` to a `Surrogate` instance.
// this.prototype = new Surrogate();
// this.prototype.constructor = this;
// };

Function.prototype.inherits = function(superClass) {
  this.prototype = Object.create(superClass.prototype);
  this.prototype.constructor = this;
};

function MovingObject () {
  this.name = "john";
}
MovingObject.prototype.loggit = function(word) {
  console.log(word);
};

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);
const a = new MovingObject();
const b = new Ship();
const c = new Asteroid();

console.log(a.name);
console.log(b.name);
console.log(c.name);

a.loggit('bird');
b.loggit('other bird');
c.loggit('one more bird, please');
