import Container from "./container/index.js";
import Background from "./components/background.js";
import Ship from "./components/ship.js";
import ShipBulletsPair from "./components/shipBulletsPair.js";
import {
  images,
  eventKeyCode,
  shipBulletHeight,
  timeBetweenShipBullets
} from "../constants/index.js";
import { loadImages, transformArrayToObject } from "../utility/helpers.js";

const SPACE = "space";

class App {
  constructor() {
    this.container = new Container();
    this.fireShipBullet = true;
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
    window.addEventListener("keydown", e => {
      this.container[eventKeyCode[e.keyCode]] = true;
      if (eventKeyCode[e.keyCode] === SPACE && this.fireShipBullet) {
        this.setShipBulletsPair();
        this.fireShipBullet = !this.fireShipBullet;
        setTimeout(() => {
          this.fireShipBullet = !this.fireShipBullet;
        }, timeBetweenShipBullets);
      }
    });
    window.addEventListener("keyup", e => {
      this.container[eventKeyCode[e.keyCode]] = false;
    });
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

  setShipBulletsPair() {
    this.container.shipBullets.push(
      new ShipBulletsPair(this.loadedImages.bullet_ship, { ...this.container })
    );
  }

  updateShipBulletsPair() {
    this.container.shipBullets = this.container.shipBullets.filter(
      item => item.gameData.shipBulletY >= 0 - shipBulletHeight
    );
    this.container.shipBullets.map(item => item.update());
  }

  loop() {
    const { bg, bullet_enemy, enemy, ship } = this.loadedImages;

    this.animationFrameID = requestAnimationFrame(this.loop.bind(this));

    new Background(this.animationFrameID, bg, { ...this.container }).draw();
    new Ship(this.animationFrameID, ship, { ...this.container }).draw();
    this.container.shipBullets.map(shipBulletsPair => shipBulletsPair.draw());

    this.container.update();
    this.updateShipBulletsPair();
    new Background().endGame(this.animationFrameID);
  }
}

new App().init();
