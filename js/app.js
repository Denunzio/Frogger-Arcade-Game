/*  app.js - written by student Anita Denunzio
 *  This file is for the student to complete.
 *  Project Specifications
 * 
 *  The game functions correctly and runs error free
 *  Player can not move off the screen - DONE
 *  Bugs cross the screen on y axis - DONE
 *  Bugs-player collisions happen logically and then rest game
 *  Something happens when player wins - popup/modal?
 *
 *  Object Oriented Code - Game objects (player and bugs) are implemented using JavaScript object-oriented programming features.
 *
 *  Comments are present and effectively explain longer code procedures. As a rule of thumb: describe what all custom functions and object methods do.
 * 
 *   Follow Udacity Code Quality formated with consistent, logical, and easy-to-read formatting in Style Guide
 */

let allEnemies = [];  // Place all enemy objects in an array called allEnemies
let enemyLocation = [60, 140, 230];  // Setting the Enemy initial location (OK implemented)

class Enemy {
    constructor(x, y, speed) {  // Setting the Enemy speed (OK implemented)
	this.x = x;
	this.y = y;
    this.speed = Math.floor(Math.random()*300) + 100;;
    this.sprite = 'images/enemy-bug1.png';
    }
};

// Players initial location set
class Player  {
    constructor(x, y)  {
    this.x = x;
    this.y = y;
    this.player = 'images/char-horn-girl.png';
    }
};

// Parameter: dt, a time delta between ticks! WHAT!
Enemy.prototype.update = function(dt) {
    random = Math.random() * (12 - 2) + 2;
    this.x += this.speed * dt;  // Setting the Enemy speed (OK implemented)
	if (this.x > 510)  {
	    this.x = -50;
        this.speed = 60 * random;
    };
    // andals collisions with the bugs
    if (player.x < this.x + 80
        && player.x + 80 > this.x
        && player.y < this.y + 60
        && 60 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
    };
};

// DRAW THE ENEMY on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // initial enemy location
};

Player.prototype.update = function(dt)  {
    if (this.x > 525) {
        this.x = -90;
        this.enemySpace = [this.x, this.y];
    } else {
        newX = this.x + 1;
        movement = (this.x + 1) * dt;
        this.x = newX;
        this.enemySpace = [this.x, this.y];
    }
};

// The render method for the Player (code from the render method for the Enemy)
Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Player handleInput method
Player.prototype.handleInput = function (keyPress) {
    if (keyPress === 'left' && this.x > 0) {
        this.x -= 102;
    };
    if (keyPress == 'right' && this.x < 350) {
        this.x += 102;
    };
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };
    if (keyPress == 'down' && this.y < 350) {
        this.y += 83;
    };
    if (this.y <= 0) {
        setTimeout(() => {
            this.x = 200;
            this.y = 400;
            alert('You reached the water safely!');
            location.reload();
            return;
        }, 400);
    };
};

// Updates Player position
Player.prototype.update = function(keyPress) {
    if (keyPress === 'left') {
        if (this.x <= 0) {
            this.x = this.x + 20;
            this.player = [this.x, this.y];
        } else {
            this.x = this.x - 20;
            this.player = [this.x, this.y];
        }
    }
    if (keyPress === 'right') {
        if (this.x >= 350) {
            this.x = this.x - 20;
            this.player = [this.x, this.y];
        } else {
            this.x = this.x + 20;
            this.player = [this.x, this.y];
        }
    }
    if (keyPress === 'up') {
        if (this.y <= 0) {
            this.y = - 20;
        } else {
            this.y = this.y - 20;
            this.player = [this.x, this.y];
        }
    }
    if (keyPress === 'down') {
        if (this.y >= 400) {
            this.y = this.y - 20;
            this.player = [this.x, this.y];
        } else {
            this.y = this.y + 20;
            this.player = [this.x, this.y];
        }
    } else {
        null;
    };
};

// Setting the Enemy initial location
enemyLocation.forEach(function (locationY)  {
	enemy = new Enemy(0, locationY, 200);
	allEnemies.push(enemy);
});

// Setting the Player initial location
let player = new Player(200, 400);

// DONE! This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this. ALL GOOD!
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});