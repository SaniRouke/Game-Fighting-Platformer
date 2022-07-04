import { canvas, c, gravity, groundPosX } from "../gameProps";

export class GameDebugger {
  constructor(list) {
    this.position = {
      x: 0,
      y: 0,
    };
    this.list = list;
  }
  start() {
    c.font = "30px monospace";
    c.textBaseline = "top";
    this.list.forEach((p, i) => {
      const text = `${p.name}: ${p.target[p.name]}`;
      c.fillText(text, 10, i * 30 + 50);
    });
    c.stroke();
  }
}
