/*           IMAGES                */

const imagePath = "../assets/images";

export const images = [
  "background",
  "bullet_enemy",
  "bullet_ship",
  "enemy",
  "ship"
];

export const imagesPath = [
  `${imagePath}/background.png`,
  `${imagePath}/bullet_enemy.png`,
  `${imagePath}/bullet_ship.png`,
  `${imagePath}/enemy.png`,
  `${imagePath}/ship.png`
];

/*            EVENT KEYCODE          */

export const eventKeyCode = {
  37: "arrowLeft",
  38: "arrowUp",
  39: "arrowRight",
  40: "arrowDown",
  32: "space"
};

/*              SCORE                 */

export const shotEnemyScore = 10;

/*             CANVAS                 */

export const CANVAS = "#canvas";
export const CANVAS_CONTEXT = "2d";

const canvasWidth = 600;
const canvasHeight = 360;

/*             BACKGROUND            */

export const backgroundStartPosition = {
  x: 0,
  y: 0
};

export const backgroundSlidingSpeed = 0.8;

/*              SHIP                   */

export const shipSize = {
  width: 40,
  height: 26
};

export const shipStartPosition = {
  x: canvasWidth / 2 - shipSize.width / 2,
  y: canvasHeight - shipSize.height
};

export const shipSpeed = 3;

/*              BULLETS SHIP           */

export const bulletsPairPosition = {
  firstBulletX: 5,
  secondBulletX: 33,
  bulletY: 6
};
export const shipBulletHeight = 14;
export const bulletSpeed = 2.4;
export const timeBetweenShipBullets = 200;
export const shipBulletSize = {
  width: 2,
  height: 14
};

/*                ENEMIES            */

export const enemyData = {
  width: 38,
  height: 28,
  enemiesInRow: 8,
  enemiesRows: 3,
  firstEnemyPos: { x: 30, y: 30 },
  marginRight: 22,
  marginTop: 20
};

export const enemySpeed = 1.5;

/*             BULLETS ENEMY            */

export const enemyBulletData = {
  width: 2,
  height: 14
};
export const frequentEnemyFireBullets = 1000;
export const enemyBulletSpeed = 4.2;
