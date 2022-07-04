import { GameImage } from "./GameImage";
import { canvas, c, gravity, groundPosX } from "../gameProps";

export class GroundSprite extends GameImage {
  constructor(props) {
    super(props);
  }

  draw() {
    for (let i = 0; i < 10; i++) {
      c.drawImage(
        this.img, // 22 x 15
        285, // frame pos
        190,
        50, // frame size
        25,
        i * 185 - 20 - this.position.x, // pos.x
        this.position.y, // pos.y
        200,
        100
      );
    }
  }
}
