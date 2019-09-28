import { getHtmlElement } from "../../utility/helpers.js";

const CANVAS = "#canvas";
const CANVAS_CONTEXT = "2d";

class Container {
  constructor() {
    this.ctx = getHtmlElement(CANVAS).getContext(CANVAS_CONTEXT);
    this.bgSliding = 0;
    this.shipPosition = 0;
  }

  update() {}

  initEvents() {
    window.addEventListener("keydown", () => {});
  }

  endGame(id) {
    cancelAnimationFrame(id);
  }
}

export default Container;
