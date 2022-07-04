import { GameImage } from "./GameImage";

export class ShopSprite extends GameImage {
  constructor(props) {
    super(props);
    this.scale = props.scale;
    this.framesCurrent = 0;
    this.framesMax = 6;
    this.framesElapsed = 0;
    this.framesHold = 5;
  }
  draw() {}
}
