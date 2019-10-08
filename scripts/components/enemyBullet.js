import {
  enemyBulletSpeed,
  enemyData,
  frequentEnemyFireBullets,
  enemyBulletData
} from "../../constants/index.js";

class EnemyBullet {
  constructor(image, gameData) {
    this.image = image;
    this.gameData = gameData;
  }

  draw(image) {
    const { gameData } = this;
    const { ctx, enemyBulletX, enemyBulletY } = gameData;
    ctx.drawImage(image, enemyBulletX, enemyBulletY);
  }

  static setEnemyBullet(container, image) {
    const numberOfEnemyBullets = enemies => Math.round(Math.random() * enemies);
    const modifiedEnemyBulletObj = obj => ({
      ...obj,
      enemyBulletX:
        obj.enemyX + enemyData.width / 2 - enemyBulletData.width / 2,
      enemyBulletY: obj.enemyY + enemyData.height
    });

    const newFiredEnemyBullets = [
      ...Array(numberOfEnemyBullets(container.enemies.length))
    ]
      .map(() => numberOfEnemyBullets(container.enemies.length - 1))
      .map(
        item =>
          new EnemyBullet(
            image,
            modifiedEnemyBulletObj(container.enemies[item].gameData)
          )
      );
    container.enemiesBullets = [
      ...container.enemiesBullets,
      ...newFiredEnemyBullets
    ];

    setTimeout(
      this.setEnemyBullet.bind(this, container),
      frequentEnemyFireBullets
    );
  }

  update() {
    this.gameData.enemyBulletY += enemyBulletSpeed;
  }

  static updateEnemyBullet() {
    this.enemiesBullets = this.enemiesBullets.filter(
      item => item.gameData.enemyBulletY <= this.ctx.canvas.clientHeight
    );
    this.enemiesBullets.map(item => item.update());
  }
}

export default EnemyBullet;
