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

  static initEnemies(image) {
    let enemyY = enemyData.firstEnemyPos.y;
    this.enemies = [...Array(enemyData.enemiesRows)]
      .map(() => {
        let enemyX = enemyData.firstEnemyPos.x;
        const enemiesRow = [...Array(enemyData.enemiesInRow)].map(() => {
          const enemy = new Enemy(image, {
            ctx: this.ctx,
            enemyX,
            enemyY
          });
          enemyX += enemyData.width + enemyData.marginRight;
          return enemy;
        });
        enemyY += enemyData.height + enemyData.marginTop;
        return enemiesRow;
      })
      .flat(1);
  }

  static checkEnemyShoted() {
    const findShoted = (enemy, shipBullet) =>
      shipBullet.gameData.shipBulletX >= enemy.gameData.enemyX &&
      shipBullet.gameData.shipBulletX <=
        enemy.gameData.enemyX + enemyData.width &&
      shipBullet.gameData.shipBulletY <=
        enemy.gameData.enemyY + enemyData.height &&
      shipBullet.gameData.shipBulletY >= enemy.gameData.enemyY;

    const filteredShipBullets = this.shipBullets.filter(shipBullet => {
      const shotedEnemy = this.enemies.find(enemy =>
        findShoted(enemy, shipBullet)
      );
      return Boolean(!shotedEnemy);
    });

    this.enemies = this.enemies.filter(enemy => {
      const shotedEnemy = this.shipBullets.find(shipBullet =>
        findShoted(enemy, shipBullet)
      );
      return Boolean(!shotedEnemy);
    });
    this.shipBullets = filteredShipBullets;
  }

  static updateEnemy() {
    if (this.isEnemiesMoveForward) {
      this.enemies.map(item => item.updateForwardMove());
      if (
        this.enemies.find(
          item =>
            item.gameData.enemyX + enemyData.width >=
            this.ctx.canvas.clientWidth
        )
      )
        this.isEnemiesMoveForward = false;
    } else {
      this.enemies.map(item => item.updateBackwardMove());
      if (this.enemies.find(item => item.gameData.enemyX <= 0))
        this.isEnemiesMoveForward = true;
    }
  }
}

export default Enemy;
