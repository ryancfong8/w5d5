const Game = require('./game.js');
const MovingObject = function(args) {
    this.pos = args['pos'];
    this.vel = args['vel'];
    this.radius = args['radius'];
    this.color = args['color'];
    this.game = args['game'];
};

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let distance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) + Math.pow((this.pos[1] - otherObject.pos[1]), 2));
  if (distance < this.radius + otherObject.radius){
    return true;
  }
  else{
    return false;
  }
};

MovingObject.prototype.collideWith = function(otherObject){
  // this.game.remove(otherObject);
  // this.game.remove(this);
};

// const mo = new MovingObject(
//   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
// );
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');
// console.log(mo.pos);

//mo.draw(context);

module.exports = MovingObject;
