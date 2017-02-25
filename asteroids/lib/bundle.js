/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	var canvas = document.getElementById('game-canvas');
	var context = canvas.getContext('2d');

	let g = new GameView(context);
	g.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(6);



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


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    childClass.prototype = Object.create(parentClass.prototype);
	    childClass.prototype.constructor = childClass;
	  },

	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};



	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);

	const Ship = function (position, game) {

	    MovingObject.call(this, {pos: position, vel: [0,0], radius: 15, color: "#ff66ff", game: game});
	};

	Util.inherits(Ship, MovingObject);

	Ship.prototype.relocate = function() {
	  this.pos = this.game.randomPosition();
	  this.vel = [0, 0];
	};

	module.exports = Ship;


/***/ }
/******/ ]);