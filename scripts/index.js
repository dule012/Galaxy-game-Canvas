import Container from "./container/index.js";
import Background from "./components/background.js";
import Ship from "./components/ship.js";
import ShipBullet from "./components/shipBullet.js";
import EnemyBullet from "./components/enemyBullet.js";
import Enemy from "./components/enemy.js";
import LoadResources from "./components/loadResources.js";
import { eventKeyCode, imagesPath } from "../constants/index.js";
import { getHtmlElement } from "../utility/helpers.js";

const SPACE = "space";
const PROP_NAME = "loadedImages";
const ID_NEW_GAME = "#newGame";
const ID_END_GAME_INFO = "#endGameInfo";

class App {
  constructor() {
    this.container = new Container();
    this.backgroundComponent = new Background();
    this.shipComponent = new Ship();
    this.loadedResources = new LoadResources(imagesPath);
  }

  init() {
    this.loadedResources.load().then(() => this.setGameParts());
  }

  setGameParts() {
    this.initEvents();
    this.animationFrameInit();
    this.container.setNewProp(PROP_NAME, this.loadedResources.loadedImages);
    this.startGame();
  }

  startGame() {
    Enemy.initEnemies.call(this.container, this.container.loadedImages.enemy);
    EnemyBullet.setEnemyBullet(
      this.container,
      this.container.loadedImages.bullet_enemy
    );

    this.animationFrameID = requestAnimationFrame(this.loop.bind(this));
  }

  initEvents() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    getHtmlElement(ID_NEW_GAME).addEventListener(
      "click",
      this.setNewGame.bind(this)
    );
  }

  handleKeyDown(e) {
    this.container[eventKeyCode[e.keyCode]] = true;
    if (eventKeyCode[e.keyCode] === SPACE && this.container.fireShipBullet)
      ShipBullet.setShipBullet.call(
        this.container,
        this.container.loadedImages.bullet_ship
      );
  }

  handleKeyUp(e) {
    this.container[eventKeyCode[e.keyCode]] = false;
  }

  setNewGame() {
    App.isVisibleEndGame(false);
    this.container = new Container();
    this.container.setNewProp(PROP_NAME, this.loadedResources.loadedImages);
    this.startGame();
  }

  static isVisibleEndGame(isVisible) {
    isVisible
      ? (getHtmlElement(ID_END_GAME_INFO).style.display = "block")
      : (getHtmlElement(ID_END_GAME_INFO).style.display = "none");
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
    const { background, ship, bullet_enemy } = this.container.loadedImages;

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

export default App;

new App().init();
