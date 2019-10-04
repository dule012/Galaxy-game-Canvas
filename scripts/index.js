import Container from "./container/index.js";
import Background from "./components/background.js";
import Ship from "./components/ship.js";
import ShipBullet from "./components/shipBullet.js";
import EnemyBullet from "./components/enemyBullet.js";
import Enemy from "./components/enemy.js";
import { images, eventKeyCode } from "../constants/index.js";
import { loadImages, transformArrayToObject } from "../utility/helpers.js";

const SPACE = "space";

class App {
  constructor() {
    this.container = new Container();
    this.backgroundComponent = new Background();
    this.shipComponent = new Ship();
  }

  init() {
    Promise.all(loadImages()).then(data => {
      this.loadedImages = transformArrayToObject(images, data);
      this.container.loadedImages = this.loadedImages;
      this.initEvents();
      this.animationFrameInit();
      Enemy.initEnemies.call(this.container, this.loadedImages.enemy);
      EnemyBullet.setEnemyBullet(this.container);

      this.animationFrameID = requestAnimationFrame(this.loop.bind(this));
    });
  }

  initEvents() {
    window.addEventListener("keydown", this.handleKeyDown.call(this), false);
    window.addEventListener("keyup", this.handleKeyUp.call(this), false);
  }

  removeEventListeners() {
    window.removeEventListener("keydown", this.keyDownListener, false);
    window.removeEventListener("keyup", this.keyUpListener, false);
  }

  keyDown(e) {
    this.container[eventKeyCode[e.keyCode]] = true;
    if (eventKeyCode[e.keyCode] === SPACE && this.container.fireShipBullet)
      ShipBullet.setShipBullet.call(
        this.container,
        this.loadedImages.bullet_ship
      );
  }

  handleKeyDown() {
    this.keyDownListener = e => this.keyDown.call(this, e);
    return this.keyDownListener;
  }

  keyUp(e) {
    this.container[eventKeyCode[e.keyCode]] = false;
  }

  handleKeyUp() {
    this.keyUpListener = e => this.keyUp.call(this, e);
    return this.keyUpListener;
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
    const { background, ship } = this.loadedImages;

    this.animationFrameID = requestAnimationFrame(this.loop.bind(this));

    this.backgroundComponent.draw(background, this.container);
    this.shipComponent.draw(ship, this.container);
    this.container.enemies.map(item => item.draw());
    this.container.shipBullets.map(shipBulletsPair => shipBulletsPair.draw());
    this.container.enemiesBullets.map(item => item.draw());

    this.container.update(
      this.animationFrameID,
      this.removeEventListeners.bind(this)
    );
  }
}

new App().init();
