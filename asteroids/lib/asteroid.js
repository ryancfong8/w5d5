const Util = require("./util.js");
const MovingObject = require("./movingObject.js");
const Ship = require("./ship.js");



const Asteroid = function (position, game) {

    MovingObject.call(this, {pos: position, vel: this.randomVec(1), radius: 50, color: "#A9A9A9", game: game});
};

  Util.inherits(Asteroid, MovingObject);

// Scale the length of a vector by the given amount.

Asteroid.prototype.randomVec = function(length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
};


MovingObject.prototype.collideWith = function(otherObject){
  if (otherObject instanceof Ship){
    otherObject.relocate();
  }
  //this.game.remove(otherObject);
  //this.game.remove(this);
};

//testing stuff below

// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');
//
// let pos = [30, 30];
// let a = new Asteroid(pos);
//
// a.draw(context);
//
// console.log(a);

module.exports = Asteroid;
