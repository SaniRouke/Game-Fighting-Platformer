import { GameImage } from "./index";
import { canvas, c, gravity, groundPosX } from "../gameProps";

export class GameSprite extends GameImage {
  constructor({
    sprites = {},
    framesMax = 1,
    framesCurrent = 0,
    framesElapsed = 0,
    framesHold = 1,
    ...props
  }) {
    super(props);
    this.sprites = sprites;
    for (const sprite in this.sprites) {
      sprites[sprite].img = new Image();
      sprites[sprite].img.src = sprites[sprite].imgSrc;
    }
    this.framesMax = framesMax;
    this.framesCurrent = framesCurrent;
    this.framesElapsed = framesElapsed;
    this.framesHold = framesHold;
    this.onLoadImgFuncs.add(() => {
      this.frameWidth = this.width / this.framesMax;
      this.width = this.frameWidth;
    });
  }
  draw() {
    super.draw((posX) =>
      c.drawImage(
        this.img,
        (this.width / this.scale.x) * this.framesCurrent,
        0,
        this.width / this.scale.x,
        this.height / this.scale.y,
        posX,
        this.position.y,
        this.width,
        this.height
      )
    );
  }
  switchSprite(sprite) {
    if (
      this.img === this.sprites.attack1.img &&
      this.framesCurrent < this.framesMax - 1
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.img !== this.sprites.idle.img) {
          this.img = this.sprites.idle.img;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesHold = this.sprites.idle.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.img !== this.sprites.run.img) {
          this.img = this.sprites.run.img;
          this.framesMax = this.sprites.run.framesMax;
          this.framesHold = this.sprites.run.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.img !== this.sprites.jump.img) {
          this.img = this.sprites.jump.img;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesHold = this.sprites.jump.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.img !== this.sprites.fall.img) {
          this.img = this.sprites.fall.img;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesHold = this.sprites.fall.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        if (this.img !== this.sprites.attack1.img) {
          this.img = this.sprites.attack1.img;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesHold = this.sprites.attack1.framesHold;
          this.framesCurrent = 0;
        }
        break;
    }
  }
  update() {
    this.draw();
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      this.framesCurrent++;
      if (this.framesCurrent % this.framesMax === 0) {
        this.framesCurrent = 0;
      }
    }
  }
}
