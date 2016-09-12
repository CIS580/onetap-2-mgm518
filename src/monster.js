"use strict";

/**
 * @module exports the Monster class
 */
module.exports = exports = Monster;

/**
 * @constructor Monster
 * Creates a new Monster object
 * @param {Postition} position object specifying an x and y
 */
function Monster(position) {
  this.state = "alive"
  this.frame = 0;
  this.timer = 0;
  this.x = position.x;
  this.y = position.y;
  this.width  = 16;
  this.height = 16;
  this.stepRange = 200;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/bat/bat.png');
}

/**
 * @function updates the Monster object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Monster.prototype.update = function(elapsedTime) {
  console.log(this.state, this.spritesheet.width, this.spritesheet.width/this.height, this.spritesheet.width/this.height);
  switch(this.state) {
    case "alive":
      this.timer++;
      if(this.timer > 1000/120) {
        this.frame = (this.frame + 1) % (this.spritesheet.width/this.height);
        this.timer = 0;
      }
      if( (this.x/this.stepRange) != Math.floor(this.x/this.stepRange) ){
        this.x += this.stepRange/Math.abs(this.stepRange);
      }
      else {
        this.stepRange *= -1;
        this.x += this.stepRange/Math.abs(this.stepRange);
      }
    break;
  }
}

/**
 * @function renders the Monster into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Monster.prototype.render = function(time, ctx) {
  ctx.drawImage(
    // image
    this.spritesheet,
    // source rectangle
    this.frame * this.width, 0, this.width, this.height,
    // destination rectangle
    this.x, this.y, 2*this.width, 2*this.height
  );
}
