import { GamePhysicsSprite } from "./index";
import { canvas, c, gravity, groundPosX } from "../gameProps";

export class Fighter extends GamePhysicsSprite {
  constructor({ runSpeed = 10, attackBox, ...props }) {
    super(props);
    this.runSpeed = runSpeed;
    this.attackBox = attackBox || { width: 0, height: 0 };
    this.isCollision = false;
    this.isAttackAnim = false;
    this.isAttackDmg = false;
    this.health = 100;
  }
  attack() {
    if (this.isAttackAnim) {
      return;
    }
    this.isAttackAnim = true;
    this.switchSprite("attack1");
    setTimeout(() => {
      this.isAttackDmg = true;
      setTimeout(() => {
        this.isAttackDmg = false;
        this.isAttackAnim = false;
      }, 100);
    }, 200);
  }

  runLeft() {
    this.velocity.x = -this.runSpeed;
    this.switchSprite("run");
  }
  runRight() {
    this.velocity.x = this.runSpeed;
    this.switchSprite("run");
  }
  jump() {
    this.velocity.y = -40;
    this.switchSprite("jump");
  }
  fall() {
    this.switchSprite("fall");
  }
  update() {
    super.update();
    // TODO: Add offset
    this.attackBox.position = {
      x:
        this.hitBox.position.x +
        this.hitBox.width / 2 +
        (this.isOpposite ? -this.attackBox.width : 0),
      y: this.hitBox.position.y,
    };
    this.draw();
  }
  draw() {
    super.draw();
    if (this.debug && this.isAttackAnim) {
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }
}
