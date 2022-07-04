import { canvas, c, gravity, groundPosX } from "../gameProps";

export class GameObject {}
export class GameImage extends GameObject {
  constructor({
    position = { x: 0, y: 0 },
    width = 0,
    height = 0,
    scale = { x: 1, y: 1 },
    offset = { x: 0, y: 0 },
    isOpposite = false,
    velocity = {
      x: 0,
      y: 0,
    },
    imgSrc,
    debug = false,
  }) {
    super();
    this.position = position;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.offset = offset;
    this.isOpposite = isOpposite;
    this.velocity = velocity;
    this.img = new Image();
    this.img.src = imgSrc;
    this.imgLoaded = false;
    this.img.onload = this.onImgLoad;
    this.onLoadImgFuncs = {
      list: [],
      add: function (func) {
        this.list.push(func);
      },
      run: function () {
        this.list.forEach((func) => func());
      },
    };
    this.debug = debug;
  }
  onImgLoad = () => {
    this.imgLoaded = true;
    // TODO: default width/height = 100
    this.width = this.width || this.img.width * this.scale.x;
    this.height = this.height || this.img.height * this.scale.y;
    this.onLoadImgFuncs.run();
  };
  draw(drawImageFunc) {
    if (this.imgLoaded) {
      c.save();
      // offset
      const offsetPos = this.getOffsetPos(this.offset);
      c.translate(offsetPos.x, offsetPos.y);
      // sizes Debugging
      if (this.debug) {
        c.strokeStyle = "lightgreen";
        c.strokeRect(this.position.x, this.position.y, this.width, this.height);
      }
      // reverse
      let posX = this.position.x;
      if (this.isOpposite) {
        posX = -this.position.x - this.width;
        c.scale(-1, 1);
      }
      // image
      if (drawImageFunc) {
        drawImageFunc(posX);
      } else {
        c.drawImage(this.img, posX, this.position.y, this.width, this.height);
      }
      c.restore();
    } else if (this.debug) {
      console.log(
        "Sprite2:",
        { x: this.position.x, y: this.position.y },
        "imgLoaded:",
        this.imgLoaded
      );
    }
  }
  getOffsetPos(offset) {
    let x = offset.x;
    let y = offset.y;
    if (x === "right") {
      x = -this.width;
    } else if (x === "center") {
      x = -this.width / 2;
    }
    if (y === "bottom") {
      y = -this.height;
    } else if (y === "center") {
      y = -this.height / 2;
    }
    if (Number.isInteger(x) && Number.isInteger(y)) {
      return { x, y };
    }
    console.log(
      "Sprite2:",
      { x: this.position.x, y: this.position.y },
      "offset:",
      "Error"
    );
    return { x: 0, y: 0 };
  }
  update() {
    this.draw();
  }
}
