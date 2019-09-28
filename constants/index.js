/*           IMAGES                */

const imagePath = "../assets/images";

export const images = ["bg", "bullet_enemy", "bullet_ship", "enemy", "ship"];

export const imagesPath = [
  `${imagePath}/bg.png`,
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

export const shipSpeed = 2.2;
