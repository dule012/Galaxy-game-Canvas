import Container from "./container/index.js";
import Background from "./components/background.js";
import Ship from "./components/ship.js";
import { images } from "../constants/index.js";
import { loadImages, transformArrayToObject } from "../utility/helpers.js";

class App extends Container {
  constructor() {
    super();
    this.container = new Container();
  }

  init() {
    Promise.all(loadImages()).then(data => {
      this.animationFrameInit();
      this.animationFrameID = requestAnimationFrame(
        this.loop.bind(this, transformArrayToObject(images, data))
      );
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

  loop(imagesObj) {
    const { bg, bullet_enemy, bullet_ship, enemy, ship } = imagesObj;

    this.container.update();

    this.animationFrameID = window.requestAnimationFrame(
      this.loop.bind(this, imagesObj)
    );

    new Background(this.animationFrameID, bg, this.container).draw();
    new Ship(this.animationFrameID, ship, this.container).draw();
  }
}

new App().init();
