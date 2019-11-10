/*Important note:
    I changed the board size by changing the width in engine.js to canvas.width = 800;
    and I increased the number of columns by changing in engine.js numCols = 8;
    I did this to give more visual to the game and to increase the number of enemyes.
*/
// Enemies our player must avoid
var Enemy = function(Ex , Ey) {
    this.Ex = Ex;
    this.Ey = Ey;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
/* You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
all computers.*/
/*I used math.randum and multiplied it by 512 to get decent diffrent speeds for the enemy.
and looped through the enemy array to assign every enemy a diffrent speed*/
Enemy.prototype.update = function(dt) {
for(var i=0; i<allEnemies.length; i++){
allEnemies[i].speed = 100 + Math.floor(Math.random() * 512);

}
//this will change the enemy position and make it advance
this.Ex = this.Ex + (this.speed * dt);
if( this.Ex >= 900 ){
this.reset();
}

//this is to handle collusion 
if(player.Px >= this.Ex -50 && player.Px <= this.Ex +50){
if(player.Py >= this.Ey -50 && player.Py <= this.Ey +50){
player.reset();
}
}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.Ex, this.Ey);
};


Enemy.prototype.reset = function(){
this.Ex = -100;

};

var Player = function(Px , Py){
this.Px = Px;
this.Py = Py;
this.sprite = 'images/char-boy.png';
};

//lockBoard will give a brief time when the player reach the water and make him unable to move while on the water row.
let LockBord = false;
Player.prototype.update = function(dt){
if( this.Py == -50 ){
    LockBord = true;
    setTimeout(() =>{
        this.reset();
        LockBord = false;
    }, 300);
    
}
};

Player.prototype.render = function(){
ctx.drawImage(Resources.get(this.sprite), this.Px, this.Py);
};

//this will update the player position
//if (LockBord == true) means that the player is on the water row so I will prevent him from moving by returning without doing any action
Player.prototype.handleInput = function(action){
    if (LockBord == true){
        return;
    }
    if (action === 'right' && this.Px < 700){
        this.Px = this.Px +99;
    }
    else if (action === 'left' && this.Px > 100){
        this.Px = this.Px -99;
    }
    else if (action === 'up' && this.Py > -50){
        this.Py = this.Py -90;
    }
    else if (action === 'down' && this.Py < 400){
        this.Py = this.Py +90;
    }
};

Player.prototype.reset = function(){
    this.Px = 405;
    this.Py = 400;
};

//these are the enemyes initial position.
var enemy1 = new Enemy(0,55);
var enemy2 = new Enemy(0,135);
var enemy3 = new Enemy(0,220);
var enemy4 = new Enemy(-500,55);
var enemy5 = new Enemy(-200,135);
var enemy6 = new Enemy(-400,220);

//this is the player obj
var player = new Player(405,400);
//this is the enemyes array
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
var allowedKeys = {
37: 'left',
38: 'up',
39: 'right',
40: 'down'
};

player.handleInput(allowedKeys[e.keyCode]);
});

