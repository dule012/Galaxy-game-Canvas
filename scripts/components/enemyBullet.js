import { enemyBulletSpeed } from "../../constants/index.js";

class EnemyBullet {
  constructor(image, gameData) {
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    const { image, gameData } = this;
    const { ctx, enemyBulletX, enemyBulletY } = gameData;
    ctx.drawImage(image, enemyBulletX, enemyBulletY);
  }

  update() {
    this.gameData.enemyBulletY += enemyBulletSpeed;
  }
}

export default EnemyBullet;
