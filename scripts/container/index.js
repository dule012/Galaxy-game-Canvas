import Enemy from "../components/enemy.js";
import EnemyBullet from "../components/enemyBullet.js";
import ShipBullet from "../components/shipBullet.js";
import { getHtmlElement } from "../../utility/helpers.js";
import {
  CANVAS,
  CANVAS_CONTEXT,
  shipSize,
  shipStartPosition,
  shipSpeed,
  backgroundStartPosition,
  backgroundSlidingSpeed,
  shipBulletHeight,
  timeBetweenShipBullets,
  bulletsPairPosition,
  shipBulletSize,
  enemyData,
  enemyBulletData,
  frequentEnemyFireBullets
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
    this.isEnemiesMoveForward = true;
    this.enemiesBullets = [];
    this.score = 0;
  }

  endGame(id, removeEventListenersHandler) {
    const isShipShot = this.enemiesBullets.find(
      enemy =>
        enemy.gameData.enemyBulletX >= this.shipX &&
        enemy.gameData.enemyBulletX <= this.shipX + shipSize.width &&
        enemy.gameData.enemyBulletY >= this.shipY &&
        enemy.gameData.enemyBulletY <= this.shipY + shipSize.height
    );
    if (isShipShot) {
      removeEventListenersHandler();
      cancelAnimationFrame(id);
    }
  }

  initEnemies(image) {
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

  updateEnemy() {
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

  setShipBullet(image) {
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

  updateShipBullet() {
    this.shipBullets = this.shipBullets.filter(
      item => item.gameData.shipBulletY >= 0 - shipBulletHeight
    );
    this.shipBullets.map(item => item.update());
  }

  checkEnemyShoted() {
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

  setEnemyBullet() {
    const numberOfEnemyBullets = () =>
      Math.ceil(Math.random() * (this.enemies.length - 1));
    const modifiedEnemyBulletObj = obj => ({
      ...obj,
      enemyBulletX:
        obj.enemyX + enemyData.width / 2 - enemyBulletData.width / 2,
      enemyBulletY: obj.enemyY + enemyData.height
    });

    const newFiredEnemyBullets = [...Array(numberOfEnemyBullets())]
      .map(() => numberOfEnemyBullets())
      .map(
        item =>
          new EnemyBullet(
            this.loadedImages.bullet_enemy,
            modifiedEnemyBulletObj(this.enemies[item].gameData)
          )
      );
    this.enemiesBullets = [...this.enemiesBullets, ...newFiredEnemyBullets];

    setTimeout(this.setEnemyBullet.bind(this), frequentEnemyFireBullets);
  }

  updateEnemyBullet() {
    this.enemiesBullets = this.enemiesBullets.filter(
      item => item.gameData.enemyBulletY <= this.ctx.canvas.clientHeight
    );
    this.enemiesBullets.map(item => item.update());
  }

  updateShip() {
    const { arrowLeft, arrowUp, arrowRight, arrowDown } = this;
    const { clientWidth, clientHeight } = this.ctx.canvas;

    if (arrowRight) {
      this.shipBulletX = this.shipX += shipSpeed;
      if (this.shipX + shipSize.width >= clientWidth)
        this.shipBulletX = this.shipX = clientWidth - shipSize.width;
    }
    if (arrowLeft) {
      this.shipBulletX = this.shipX -= shipSpeed;
      if (this.shipX <= 0) this.shipBulletX = this.shipX = 0;
    }
    if (arrowUp) {
      this.shipBulletY = this.shipY -= shipSpeed;
      if (this.shipY <= 0) this.shipBulletY = this.shipY = 0;
    }
    if (arrowDown) {
      this.shipBulletY = this.shipY += shipSpeed;
      if (this.shipY + shipSize.height >= clientHeight)
        this.shipBulletY = this.shipY = clientHeight - shipSize.height;
    }

    this.backgroundY += backgroundSlidingSpeed;
    if (this.backgroundY >= clientHeight) this.backgroundY = 0;
  }

  update(animationFrameID, removeEventListeners) {
    this.endGame(animationFrameID, removeEventListeners);
    this.checkEnemyShoted();
    this.updateShip();
    this.updateEnemy();
    this.updateEnemyBullet();
    this.updateShipBullet();
  }
}

export default Container;
