import { enemySpeed, enemyData } from "../../constants/index.js";

class Enemy {
  constructor(image, gameData) {
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    const { ctx, enemyX, enemyY } = this.gameData;
    ctx.drawImage(
      this.image,
      enemyX,
      enemyY,
      enemyData.width,
      enemyData.height
    );
  }

  updateForwardMove() {
    this.gameData.enemyX += enemySpeed;
  }

  updateBackwardMove() {
    this.gameData.enemyX -= enemySpeed;
  }
}

export default Enemy;
