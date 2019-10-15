import Enemy from "../components/enemy.js";
import EnemyBullet from "../components/enemyBullet.js";
import ShipBullet from "../components/shipBullet.js";
import Ship from "../components/ship.js";
import App from "../index.js";
import { getHtmlElement } from "../../utility/helpers.js";
import {
  CANVAS,
  CANVAS_CONTEXT,
  shipSize,
  shipStartPosition,
  backgroundStartPosition,
  enemyData,
  enemyBulletData,
  scoreData
} from "../../constants/index.js";

class Container {
  constructor() {
    this.ctx = getHtmlElement(CANVAS).getContext(CANVAS_CONTEXT);
    this.arrowLeft = false;
    this.arrowUp = false;
    this.arrowRight = false;
    this.arrowDown = false;
    this.space = false;
    this.backgroundX = backgroundStartPosition.x;
    this.backgroundY = backgroundStartPosition.y;
    this.shipX = shipStartPosition.x;
    this.shipY = shipStartPosition.y;
    this.shipBullets = [];
    this.shipBulletX = this.shipX;
    this.shipBulletY = this.shipY;
    this.fireShipBullet = true;
    this.enemies = [];
    this.areEnemiesArrived = false;
    this.enemyIndexLeap = null;
    this.enemyLeapX;
    this.enemyLeapY;
    this.isEnemiesMoveForward = true;
    this.enemiesBullets = [];
    this.score = 0;
  }

  endGame(id) {
    const isShipShotEnemyBullet = this.enemiesBullets.find(
      enemy =>
        enemy.gameData.enemyBulletX >= this.shipX &&
        enemy.gameData.enemyBulletX <= this.shipX + shipSize.width &&
        enemy.gameData.enemyBulletY + enemyBulletData.height >= this.shipY &&
        enemy.gameData.enemyBulletY + enemyBulletData.height <=
          this.shipY + shipSize.height
    );
    const isShipCollideWithEnemy = this.enemies.find(
      item =>
        ((this.shipX + shipSize.width >= item.gameData.enemyX &&
          this.shipX + shipSize.width <=
            item.gameData.enemyX + enemyData.width) ||
          (this.shipX >= item.gameData.enemyX &&
            this.shipX <= item.gameData.enemyX + enemyData.width)) &&
        ((this.shipY >= item.gameData.enemyY &&
          this.shipY <= item.gameData.enemyY + enemyData.height) ||
          (this.shipY + shipSize.height >= item.gameData.enemyY &&
            this.shipY + shipSize.height <
              item.gameData.enemyY + enemyData.height))
    );
    if (isShipShotEnemyBullet || isShipCollideWithEnemy) {
      cancelAnimationFrame(id);
      App.displayEndGame();
    }
  }

  setNewProp(name, value) {
    this[name] = value;
  }

  drawScore() {
    this.ctx.font = scoreData.font;
    this.ctx.fillStyle = scoreData.color;
    this.ctx.fillText(
      `${scoreData.scoreText}${this.score}`,
      scoreData.x,
      scoreData.y
    );
  }

  updateScore() {
    this.score += scoreData.newPoints;
  }

  update(animationFrameID) {
    this.endGame(animationFrameID);
    Enemy.newEnemyWave.call(this, Enemy.initEnemies);
    Enemy.initEnemyLeap.call(this);
    Enemy.checkEnemyShoted.call(this, this.enemies[this.enemyIndexLeap]);
    Ship.updateShip.call(this);
    Enemy.updateEnemy.call(this, this.enemies[this.enemyIndexLeap]);
    EnemyBullet.updateEnemyBullet.call(this);
    ShipBullet.updateShipBullet.call(this);
  }
}

export default Container;
