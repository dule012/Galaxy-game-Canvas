import {
  bulletSpeed,
  shipBulletHeight,
  timeBetweenShipBullets,
  bulletsPairPosition
} from "../../constants/index.js";

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

  static setShipBullet(image) {
    if (this.fireShipBullet) {
      const shipBulletData = order => ({
        ctx: this.ctx,
        shipBulletX: this.shipBulletX + order,
        shipBulletY: this.shipBulletY - bulletsPairPosition.bulletY
      });
      this.shipBullets.push(
        new ShipBullet(image, shipBulletData(bulletsPairPosition.firstBulletX)),
        new ShipBullet(image, shipBulletData(bulletsPairPosition.secondBulletX))
      );
      this.fireShipBullet = !this.fireShipBullet;
      setTimeout(() => {
        this.fireShipBullet = !this.fireShipBullet;
      }, timeBetweenShipBullets);
    }
  }

  static updateShipBullet() {
    this.shipBullets = this.shipBullets.filter(
      item => item.gameData.shipBulletY >= 0 - shipBulletHeight
    );
    this.shipBullets.map(item => item.update());
  }
}

export default ShipBullet;
