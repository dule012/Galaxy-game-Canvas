import Container from "../container/index.js";

class Ship extends Container {
  constructor(animationFrameId, image, gameData) {
    super();
    this.animationFrameId = animationFrameId;
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    this.ctx.drawImage(this.image, 0, 0);
  }
}

export default Ship;
