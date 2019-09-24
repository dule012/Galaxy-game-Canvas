import { images } from "../constants/index.js";
import {
  loadImages,
  transformArrayToObject,
  getHtmlElement
} from "../utility/helpers.js";

const CANVAS = "#canvas";
const CANVAS_CONTEXT = "2d";

class Game {
  constructor() {
    this.ctx = getHtmlElement(CANVAS).getContext(CANVAS_CONTEXT);
    this.animationFrame = (
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      setTimeout(this.loop, 16)
    ).bind(window);
  }

  init() {
    Promise.all(loadImages()).then(data => {
      this.animationFrame(
        this.loop.bind(this, transformArrayToObject(images, data))
      );
    });
  }

  loop(imagesObj) {
    const { bg, bullet_enemy, bullet_ship, enemy, ship } = imagesObj;
    this.ctx.drawImage(bg, 10, 10, 100, 100);
  }

  endGame() {}
}

new Game().init();
