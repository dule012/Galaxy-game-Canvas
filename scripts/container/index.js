import { getHtmlElement } from "../../utility/helpers.js";
import {
  CANVAS,
  CANVAS_CONTEXT,
  shipSize,
  shipStartPosition,
  shipSpeed,
  backgroundStartPosition,
  backgroundSlidingSpeed
} from "../../constants/index.js";

class Container {
  constructor() {
    this.ctx = getHtmlElement(CANVAS).getContext(CANVAS_CONTEXT);
    this.arrowLeft = false;
    this.arrowUp = false;
    this.arrowRight = false;
    this.arrowDown = false;
    this.space = false;
    this.backgroundX = backgroundStartPosition.x;
    this.backgroundY = backgroundStartPosition.y;
    this.shipX = shipStartPosition.x;
    this.shipY = shipStartPosition.y;
    this.enemies = [];
    this.shipBullets = [];
    this.enemiesBullets = [];
  }

  endGame(id) {
    this.removeEventListeners();
    cancelAnimationFrame(id);
  }

  removeEventListeners() {
    window.removeEventListener("keydown", () => {});
    window.removeEventListener("keyup", () => {});
  }

  update() {
    const { arrowLeft, arrowUp, arrowRight, arrowDown } = this;
    const { clientWidth, clientHeight } = this.ctx.canvas;

    if (arrowRight) {
      this.shipX += shipSpeed;
      if (this.shipX + shipSize.width >= clientWidth)
        this.shipX = clientWidth - shipSize.width;
    }
    if (arrowLeft) {
      this.shipX -= shipSpeed;
      if (this.shipX <= 0) this.shipX = 0;
    }
    if (arrowUp) {
      this.shipY -= shipSpeed;
      if (this.shipY <= 0) this.shipY = 0;
    }
    if (arrowDown) {
      this.shipY += shipSpeed;
      if (this.shipY + shipSize.height >= clientHeight)
        this.shipY = clientHeight - shipSize.height;
    }

    this.backgroundY += backgroundSlidingSpeed;
    if (this.backgroundY >= clientHeight) this.backgroundY = 0;
  }
}

export default Container;
