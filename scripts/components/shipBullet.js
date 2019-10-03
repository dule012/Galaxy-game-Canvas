import { bulletsPairPosition, bulletSpeed } from "../../constants/index.js";

class ShipBullet {
  constructor(image, gameData) {
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    const { image, gameData } = this;
    const { ctx, shipBulletX, shipBulletY } = gameData;

    ctx.drawImage(image, shipBulletX, shipBulletY);
  }

  update() {
    this.gameData.shipBulletY -= bulletSpeed;
  }
}

export default ShipBullet;
