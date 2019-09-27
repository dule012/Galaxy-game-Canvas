import { getHtmlElement } from "../../utility/helpers.js";

const CANVAS = "#canvas";
const CANVAS_CONTEXT = "2d";

class Game {
  constructor() {
    this.ctx = getHtmlElement(CANVAS).getContext(CANVAS_CONTEXT);
    this.bgSliding = 0;
    this.shipMove = 0;
  }

  update() {
    this.bgSliding += 1;
  }

  initEvents() {
    window.addEventListener("keydown", () => {});
  }

  endGame(id) {
    cancelAnimationFrame(id);
  }
}

export default Game;
