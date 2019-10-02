import { bulletsPairPosition, bulletSpeed } from "../../constants/index.js";

class ShipBullet {
  constructor(image, gameData, shipBulletOrder) {
    this.image = image;
    this.gameData = gameData;
    this.shipBulletOrder = shipBulletOrder;
  }

  draw() {
    const { image, gameData, shipBulletOrder } = this;
    const { ctx, shipBulletX, shipBulletY } = gameData;

    ctx.drawImage(
      image,
      shipBulletX + shipBulletOrder,
      shipBulletY - bulletsPairPosition.bulletY
    );
  }
  update() {
    this.gameData.shipBulletY -= bulletSpeed;
  }
}

export default ShipBullet;
