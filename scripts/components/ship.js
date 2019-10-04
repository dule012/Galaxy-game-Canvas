import {
  shipSize,
  shipSpeed,
  backgroundSlidingSpeed
} from "../../constants/index.js";

class Ship {
  draw(image, gameData) {
    const { ctx, shipX, shipY } = gameData;

    ctx.drawImage(image, shipX, shipY, shipSize.width, shipSize.height);
  }

  static updateShip() {
    const { arrowLeft, arrowUp, arrowRight, arrowDown } = this;
    const { clientWidth, clientHeight } = this.ctx.canvas;

    if (arrowRight) {
      this.shipBulletX = this.shipX += shipSpeed;
      if (this.shipX + shipSize.width >= clientWidth)
        this.shipBulletX = this.shipX = clientWidth - shipSize.width;
    }
    if (arrowLeft) {
      this.shipBulletX = this.shipX -= shipSpeed;
      if (this.shipX <= 0) this.shipBulletX = this.shipX = 0;
    }
    if (arrowUp) {
      this.shipBulletY = this.shipY -= shipSpeed;
      if (this.shipY <= 0) this.shipBulletY = this.shipY = 0;
    }
    if (arrowDown) {
      this.shipBulletY = this.shipY += shipSpeed;
      if (this.shipY + shipSize.height >= clientHeight)
        this.shipBulletY = this.shipY = clientHeight - shipSize.height;
    }

    this.backgroundY += backgroundSlidingSpeed;
    if (this.backgroundY >= clientHeight) this.backgroundY = 0;
  }
}

export default Ship;
