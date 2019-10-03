import Container from "./container/index.js";
import Background from "./components/background.js";
import Ship from "./components/ship.js";
import { images, eventKeyCode } from "../constants/index.js";
import { loadImages, transformArrayToObject } from "../utility/helpers.js";

const SPACE = "space";

class App {
  constructor() {
    this.container = new Container();
  }

  init() {
    Promise.all(loadImages()).then(data => {
      this.loadedImages = transformArrayToObject(images, data);
      this.initEvents();
      this.animationFrameInit();
      this.container.initEnemies(this.loadedImages.enemy);

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
    console.log("not removed keydown event listener");
    this.container[eventKeyCode[e.keyCode]] = true;
    if (eventKeyCode[e.keyCode] === SPACE && this.container.fireShipBullet)
      this.container.setShipBullet(this.loadedImages.bullet_ship);
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
    const { background, bullet_enemy, ship } = this.loadedImages;

    this.animationFrameID = requestAnimationFrame(this.loop.bind(this));

    new Background(this.animationFrameID, background, {
      ...this.container
    }).draw();
    new Ship(this.animationFrameID, ship, { ...this.container }).draw();
    this.container.enemies.map(item => item.draw());
    this.container.shipBullets.map(shipBulletsPair => shipBulletsPair.draw());

    this.container.update();

    new Background().endGame(
      this.animationFrameID,
      this.removeEventListeners.bind(this)
    );
  }
}

new App().init();
