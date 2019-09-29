import { bulletsPairPosition, bulletSpeed } from "../../constants/index.js";

class ShipBulletsPair {
  constructor(image, gameData) {
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    const { image, gameData } = this;
    const { ctx, shipBulletX, shipBulletY } = gameData;

    ctx.drawImage(
      image,
      shipBulletX + bulletsPairPosition.firstBulletX,
      shipBulletY - bulletsPairPosition.bulletY
    );
    ctx.drawImage(
      image,
      shipBulletX + bulletsPairPosition.secondBulletX,
      shipBulletY - bulletsPairPosition.bulletY
    );
  }
  update() {
    this.gameData.shipBulletY -= bulletSpeed;
  }
}

export default ShipBulletsPair;
