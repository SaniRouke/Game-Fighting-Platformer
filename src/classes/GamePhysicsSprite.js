import { GameSprite } from "./index";
import { canvas, c, gravity, groundPosX } from "../gameProps";

export class GamePhysicsSprite extends GameSprite {
  constructor({ hitBoxOffset, ...props }) {
    super(props);
    this.hitBox = { width: 0, height: 0 };
    this.hitBox.position = {
      x: 0,
      y: 0,
    };
    this.hitBox.offset = hitBoxOffset || {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    this.health = 100;
  }
  physics() {
    const { hitBox, position, velocity } = this;
    // TODO: move to Parent
    position.x += velocity.x;
    position.y += velocity.y;
    if (
      hitBox.position.y + hitBox.height + velocity.y >=
      groundPosX
      // true
    ) {
      this.position.y = groundPosX - this.height + hitBox.offset.bottom;
      velocity.y = 0;
    } else {
      velocity.y += gravity;
    }
    // TODO: move to controls
    this.velocity.x = 0;
  }
  draw() {
    // if (this.framesElapsed % this.framesHold === 0) {
    this.physics();
    // }
    super.draw();
    // hitBox
    if (this.debug) {
      c.strokeStyle = "white";
      c.strokeRect(
        this.hitBox.position.x,
        this.hitBox.position.y,
        this.hitBox.width,
        this.hitBox.height
      );
    }
  }
  propsUpdate() {
    const { top = 0, right = 0, bottom = 0, left = 0 } = this.hitBox.offset;
    this.hitBox.position = {
      x: this.position.x + left,
      y: this.position.y + top,
    };
    this.hitBox.width = this.width - left - right;
    this.hitBox.height = this.height - top - bottom;
  }
  update() {
    super.update();
    this.propsUpdate();
  }
}
