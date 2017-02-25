const Util = require("./util.js");
const MovingObject = require("./movingObject.js");

const Ship = function (position, game) {

    MovingObject.call(this, {pos: position, vel: [0,0], radius: 15, color: "#ff66ff", game: game});
};

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

module.exports = Ship;
