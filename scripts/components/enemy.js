import {
  enemySpeed,
  enemyData,
  enemyArriveSpped,
  enemyLeapSpeed
} from "../../constants/index.js";
import { isArrayEmpty, isNumber } from "../../utility/helpers.js";

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

  enemyArrive() {
    this.gameData.enemyY += enemyArriveSpped;
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

  static checkEnemyShoted(obj) {
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

    let shotedEnemyArr = [];
    const filteredEnemies = this.enemies.filter((enemy, index) => {
      const shotedEnemy = this.shipBullets.find(shipBullet =>
        findShoted(enemy, shipBullet)
      );
      if (this.areEnemiesArrived)
        obj.shotedEnemyLeap.call(this, shotedEnemy, index);

      if (shotedEnemy && this.enemyIndexLeap > index)
        shotedEnemyArr.push(index);

      if (shotedEnemy) this.updateScore();

      return Boolean(!shotedEnemy);
    });
    if (this.areEnemiesArrived && obj)
      obj.updateEnemyIndexLeap.call(this, shotedEnemyArr);
    this.enemies = filteredEnemies;
    this.shipBullets = filteredShipBullets;
  }

  shotedEnemyLeap(shotedEnemy, index) {
    if (shotedEnemy && index === this.enemyIndexLeap)
      this.enemyIndexLeap = null;
  }

  updateEnemyIndexLeap(arr) {
    if (
      this.areEnemiesArrived &&
      isNumber(this.enemyIndexLeap) &&
      !isArrayEmpty(arr)
    ) {
      this.enemyIndexLeap -= arr.length;
    }
  }

  static initEnemyLeap() {
    if (
      this.areEnemiesArrived &&
      !isNumber(this.enemyIndexLeap) &&
      !isArrayEmpty(this.enemies)
    ) {
      this.enemyIndexLeap = Math.round(
        Math.random() * (this.enemies.length - 1)
      );
    }
  }

  updateEnemyLeaped(obj) {
    if (isNumber(this.enemyIndexLeap)) {
      obj.gameData.enemyX >= this.shipX
        ? (obj.gameData.enemyX -= enemyLeapSpeed)
        : (obj.gameData.enemyX += enemyLeapSpeed);
      obj.gameData.enemyY + enemyData.height >= this.shipY
        ? (obj.gameData.enemyY -= enemyLeapSpeed)
        : (obj.gameData.enemyY += enemyLeapSpeed);
    }
  }

  static newEnemyWave(func) {
    if (isArrayEmpty(this.enemies)) {
      this.areEnemiesArrived = false;
      func.call(this, this.loadedImages.enemy);
    }
  }

  static updateEnemy(obj) {
    if (!this.areEnemiesArrived) {
      this.enemies.map(item => item.enemyArrive());
      if (this.enemies[0].gameData.enemyY >= enemyData.marginTop)
        this.areEnemiesArrived = true;
    } else {
      if (this.isEnemiesMoveForward) {
        this.enemies.map((item, index) =>
          index !== this.enemyIndexLeap ? item.updateForwardMove() : null
        );
        if (
          this.enemies.find(
            item =>
              item.gameData.enemyX + enemyData.width >=
              this.ctx.canvas.clientWidth
          )
        )
          this.isEnemiesMoveForward = false;
      } else {
        this.enemies.map((item, index) =>
          index !== this.enemyIndexLeap ? item.updateBackwardMove() : null
        );
        if (this.enemies.find(item => item.gameData.enemyX <= 0))
          this.isEnemiesMoveForward = true;
      }
      if (obj) obj.updateEnemyLeaped.call(this, obj);
    }
  }
}

export default Enemy;
