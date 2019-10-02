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

      this.animationFrameID = requestAnimationFrame(this.loop.bind(this));
    });
  }

  initEvents() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    window.addEventListener("keyup", this.handleKeyUp.bind(this), false);
  }

  handleKeyDown(e) {
    console.log("not removed keydown event listener");
    this.container[eventKeyCode[e.keyCode]] = true;
    if (eventKeyCode[e.keyCode] === SPACE && this.container.fireShipBullet)
      this.container.setShipBullet(this.loadedImages.bullet_ship);
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
    const { bg, bullet_enemy, enemy, ship } = this.loadedImages;

    this.animationFrameID = requestAnimationFrame(this.loop.bind(this));

    new Background(this.animationFrameID, bg, { ...this.container }).draw();
    new Ship(this.animationFrameID, ship, { ...this.container }).draw();
    this.container.shipBullets.map(shipBulletsPair => shipBulletsPair.draw());

    this.container.updateShipBullet();
    this.container.update();
    new Background().endGame(
      this.animationFrameID,
      this.handleKeyDown.bind(this),
      this.handleKeyUp.bind(this)
    );
  }
}

new App().init();
