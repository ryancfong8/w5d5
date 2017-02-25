const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");

const Game = function () {
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.NUM_ASTEROIDS = 15;
  this.asteroids = this.addAsteroids(this.NUM_ASTEROIDS);
  this.ship = new Ship (this.randomPosition(this.DIM_X, this.DIM_Y), this);
};

Game.prototype.randomPosition = function (x, y) {
  let a = Math.random();
  let b = Math.random();
  return [(a*x), (b*y)];
};

Game.prototype.addAsteroids = function (num) {
  let asteroids = [];
  let game = this;
  for (let i = 0; i<num; i++){
    asteroids.push(new Asteroid(this.randomPosition(this.DIM_X, this.DIM_Y), game));
  }
  return asteroids;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(function(el) {
    //console.log(el);
    el.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function(el) {
    //console.log(el);
    el.move();
  });
};

Game.prototype.wrap = function(pos) {
  let wrappedPosition = [pos[0], pos[1]];
  if (pos[0] > this.DIM_X){
    wrappedPosition[0] = 0;
  }
  if (pos[1] > this.DIM_Y){
    wrappedPosition[1] = 0;
  }
  if (pos[0] < 0){
    wrappedPosition[0] = this.DIM_X;
  }
  if (pos[1] < 0) {
    wrappedPosition[1] = this.DIM_Y;
  }
  return wrappedPosition;
};

//change accordingly for addition of ship
Game.prototype.checkCollisions = function() {
  let all = this.allObjects();
  for (let i = 0; i < all.length - 1; i++) {
    for (let j = i+1; j < all.length; j++) {
      if (all[i].isCollidedWith(all[j])){
        all[i].collideWith(all[j]);
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  let i = this.asteroids.findIndex(function(el){
    return el === asteroid;
  });
  this.asteroids = this.asteroids.splice(0,i).concat(this.asteroids.splice(i+1, this.asteroids.length));
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]);
};

module.exports = Game;

// let game = new Game();
//
// // console.log(game.asteroids);
//
//
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');
// // //
// // let context = 'hi mom';
// //let game = new Game();
// game.draw(context);
