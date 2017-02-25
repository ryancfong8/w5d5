const Game = require("./game.js");

const GameView = function (ctx) {
  this.game = new Game();
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  let gameView = this;
  setInterval(function() {
    gameView.game.draw(gameView.ctx);
    gameView.game.step();
  }, 20);
};

module.exports = GameView;
