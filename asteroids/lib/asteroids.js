const GameView = require("./gameView.js");

var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');

let g = new GameView(context);
g.start();
