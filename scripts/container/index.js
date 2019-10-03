import Enemy from "../components/enemy.js";
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
  enemyData
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
    this.enemiesBullets = [];
    this.score = 0;
  }

  endGame(id, removeEventListenersHandler) {
    removeEventListenersHandler();
    cancelAnimationFrame(id);
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
          enemyX += enemyData.marginRight + enemyData.width;
          return enemy;
        });
        enemyY += enemyData.marginTop + enemyData.height;
        return enemiesRow;
      })
      .flat(1);
  }

  updateEnemy() {
    this.enemies.map(item => item.update());
  }

  setShipBullet(image) {
    const shipBulletData = {
      ctx: this.ctx,
      shipBulletX: this.shipBulletX,
      shipBulletY: this.shipBulletY
    };
    this.shipBullets.push(
      new ShipBullet(image, shipBulletData, bulletsPairPosition.firstBulletX),
      new ShipBullet(image, shipBulletData, bulletsPairPosition.secondBulletX)
    );

    this.fireShipBullet = !this.fireShipBullet;

    setTimeout(() => {
      this.fireShipBullet = !this.fireShipBullet;
    }, timeBetweenShipBullets);
  }

  updateShipBullet() {
    this.shipBullets = this.shipBullets.filter(
      item => item.gameData.shipBulletY >= 0 - shipBulletHeight
    );
    this.shipBullets.map(item => item.update());
  }

  checkEnemyShoted() {
    this.shipBullets = this.shipBullets.filter(item => {
      const shotedEnemy = this.enemies.find(
        enemy =>
          item.gameData.shipBulletX >= enemy.gameData.enemyX &&
          item.gameData.shipBulletX <=
            enemy.gameData.enemyX + enemyData.width &&
          item.gameData.shipBulletY <=
            enemy.gameData.enemyY + enemyData.height &&
          item.gameData.shipBulletY >= enemy.gameData.enemyY
      );
      return Boolean(!shotedEnemy);
    });
  }

  update() {
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

    this.checkEnemyShoted();
    this.updateEnemy();
    this.updateShipBullet();
  }
}

export default Container;
