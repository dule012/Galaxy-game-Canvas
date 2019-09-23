import { images } from "../constants/index";
import {
  loadImages,
  transformArrayToObject,
  getHtmlElement
} from "../utility/helpers";

const CANVAS = "#canvas";
const CANVAS_CONTEXT = "2d";

class Game {
  constructor() {
    this.canvas = getHtmlElement(CANVAS).getContext(CANVAS_CONTEXT);
  }

  init() {
    Promise.all(loadImages()).then(data => {
      requestAnimationFrame(loop(transformArrayToObject(images, data)));
    });
  }

  loop(imagesObj) {
    const { bg, bullet_enemy, bullet_ship, enemy, ship } = imagesObj;
  }

  endGame() {}
}

export default Game;
