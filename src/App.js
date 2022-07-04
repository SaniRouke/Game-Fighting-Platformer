import {
  GameImage,
  GameSprite,
  GamePhysicsSprite,
  Fighter as Fighter2,
  GameDebugger,
  GroundSprite,
  ShopSprite,
} from "./classes/";
import { rectCollision } from "./utils";
import { canvas, c } from "./gameProps";
import back1 from "./assets/oak_woods/background/back_L1.png";
import back2 from "./assets/oak_woods/background/back_L2.png";
import back3 from "./assets/oak_woods/background/back_L3.png";
import tiles from "./assets/oak_woods/oak_woods_tileset.png";
import shopFrame from "./assets/oak_woods/decorations/shop_anim.png";
import hero1_idle from "./assets/hero_1/Idle.png";
import hero1_run from "./assets/hero_1/Run.png";
import hero1_jump from "./assets/hero_1/Jump.png";
import hero1_fall from "./assets/hero_1/Fall.png";
import hero1_attack1 from "./assets/hero_1/Attack1.png";

const background = [back1, back2, back3].map((bg) => {
  return new GameImage({
    imgSrc: bg,
    position: { x: 0, y: 0 },
    width: canvas.width,
    height: canvas.height,
  });
});
const ground = new GroundSprite({
  imgSrc: tiles,
  position: { x: 0, y: 500 },
});
const shop = new ShopSprite({
  imgSrc: shopFrame,
  position: { x: 600, y: 510 },
  scale: 4,
});
const player = new Fighter2({
  position: { x: 0, y: 400 },
  imgSrc: hero1_idle,
  framesMax: 8,
  framesHold: 5,
  scale: {
    x: 3,
    y: 3,
  },
  hitBoxOffset: {
    top: 225,
    right: 260,
    bottom: 235,
    left: 260,
  },
  attackBox: {
    width: 280,
    height: 130,
  },
  sprites: {
    idle: {
      imgSrc: hero1_idle,
      framesMax: 8,
      framesHold: 5,
    },
    run: {
      imgSrc: hero1_run,
      framesMax: 8,
      framesHold: 6,
    },
    jump: {
      imgSrc: hero1_jump,
      framesMax: 2,
      framesHold: 5,
    },
    fall: {
      imgSrc: hero1_fall,
      framesMax: 2,
      framesHold: 5,
    },
    attack1: {
      imgSrc: hero1_attack1,
      framesMax: 6,
      framesHold: 2,
    },
  },
  // debug: true,
});
const enemy = new Fighter2({
  position: { x: 400, y: 400 },
  imgSrc: hero1_idle,
  framesMax: 8,
  framesHold: 5,
  scale: {
    x: 3,
    y: 3,
  },
  isOpposite: true,
  hitBoxOffset: {
    top: 225,
    right: 260,
    bottom: 235,
    left: 260,
  },
  attackBox: {
    width: 280,
    height: 130,
  },
  runSpeed: 13,
  sprites: {
    idle: {
      imgSrc: hero1_idle,
      framesMax: 8,
      framesHold: 5,
    },
    run: {
      imgSrc: hero1_run,
      framesMax: 8,
      framesHold: 6,
    },
    jump: {
      imgSrc: hero1_jump,
      framesMax: 2,
      framesHold: 5,
    },
    fall: {
      imgSrc: hero1_fall,
      framesMax: 2,
      framesHold: 5,
    },
    attack1: {
      imgSrc: hero1_attack1,
      framesMax: 6,
      framesHold: 2,
    },
  },
  // debug: true,
});
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

const debug = new GameDebugger([
  // { target: enemy, name: "position" },
  // { target: player, name: "isCollision" },
]);

const animation = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
  [...background, shop, ground, player, enemy].forEach((obj) => obj.update());

  if (player.isAttackDmg) {
    enemy.isCollision = rectCollision(player.attackBox, enemy.hitBox);
    if (enemy.isCollision) {
      player.isAttackDmg = false;
      if (enemy.health > 0) {
        enemy.health -= 10;
        const enemyHealthBar = document.getElementById("enemy-health");
        enemyHealthBar.style.width = `${enemy.health}%`;
        if (enemy.health <= 0) {
          const resultTitle = document.getElementById("result-title");
          resultTitle.innerHTML = "Player 1 Win";
        }
      }
    }
  } else {
    enemy.isCollision = false;
  }

  if (enemy.isAttackDmg) {
    player.isCollision = rectCollision(enemy.attackBox, player.hitBox);
    if (player.isCollision) {
      enemy.isAttackDmg = false;
      if (player.health > 0) {
        player.health -= 10;
        const playerHealthBar = document.getElementById("player-health");
        playerHealthBar.style.width = `${player.health}%`;
        if (player.health <= 0) {
          const resultTitle = document.getElementById("result-title");
          resultTitle.innerHTML = "Player 2 Win";
        }
      }
    }
  } else {
    player.isCollision = false;
  }

  if (keys.a.pressed && player.lastKey === "a") {
    player.runLeft();
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.runRight();
  } else {
    player.switchSprite("idle");
  }
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    // TODO: separate animations from physics
    player.switchSprite("fall");
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.runLeft();
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.runRight();
  } else {
    enemy.switchSprite("idle");
  }
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }
  debug.start();
  requestAnimationFrame(animation);
};
animation();

// player controll
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = true;
      player.lastKey = event.key;
      break;
    case "d":
      keys.d.pressed = true;
      player.lastKey = event.key;
      break;
    case "w":
      player.jump();
      break;
    case " ":
      player.attack();
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = event.key;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = event.key;
      break;
    case "ArrowUp":
      enemy.jump();
      break;
    case "0":
      enemy.attack();
      break;
  }
});
window.addEventListener("keyup", (event) => {
  const { position, velocity } = player;
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
  }
});
