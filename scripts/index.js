import Container from "./container/index.js";
import Background from "./components/background.js";
import Ship from "./components/ship.js";
import ShipBullet from "./components/shipBullet.js";
import EnemyBullet from "./components/enemyBullet.js";
import Enemy from "./components/enemy.js";
import LoadResources from "./components/loadResources.js";
import {
  imagesName,
  eventKeyCode,
  imagesPath,
  soundsPath
} from "../constants/index.js";

const SPACE = "space";

class App {
  constructor() {
    this.container = new Container();
    this.backgroundComponent = new Background();
    this.shipComponent = new Ship();
    this.loadedResources = new LoadResources(imagesPath, soundsPath);
  }

  init() {
    this.loadedResources.load();
    this.setGameParts();
  }

  setGameParts() {
    if (!this.loadedResources.isAllLoaded)
      return setTimeout(this.setGameParts.bind(this), 1);
    this.initEvents();
    this.animationFrameInit();
    this.startGame();
  }

  startGame() {
    this.container.loadedImages = this.loadedResources.loadedImages;
    Enemy.initEnemies.call(
      this.container,
      this.loadedResources.loadedImages.enemy
    );
    EnemyBullet.setEnemyBullet(
      this.container,
      this.loadedResources.loadedImages.bullet_enemy
    );

    this.animationFrameID = requestAnimationFrame(this.loop.bind(this));
  }

  initEvents() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(e) {
    this.container[eventKeyCode[e.keyCode]] = true;
    if (eventKeyCode[e.keyCode] === SPACE && this.container.fireShipBullet)
      ShipBullet.setShipBullet.call(
        this.container,
        this.loadedResources.loadedImages.bullet_ship
      );
  }

  handleKeyUp(e) {
    this.container[eventKeyCode[e.keyCode]] = false;
  }

  animationFrameInit() {
    window.requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      ((/* function */ callback, /* DOMElement */ element) => {
        window.setTimeout(callback, 1000 / 60);
      });
  }

  loop() {
    const {
      background,
      ship,
      bullet_enemy
    } = this.loadedResources.loadedImages;

    this.animationFrameID = requestAnimationFrame(this.loop.bind(this));

    this.backgroundComponent.draw(background, this.container);
    this.shipComponent.draw(ship, this.container);
    this.container.enemies.map(item => item.draw());
    this.container.shipBullets.map(shipBulletsPair => shipBulletsPair.draw());
    this.container.enemiesBullets.map(item => item.draw(bullet_enemy));
    this.container.drawScore();

    this.container.update(this.animationFrameID);
  }
}

new App().init();
