import Container from "../container/index.js";
import { shipSize } from "../../constants/index.js";

class Ship extends Container {
  constructor(animationFrameId, image, gameData) {
    super();
    this.animationFrameId = animationFrameId;
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    const { shipX, shipY } = this.gameData;

    this.ctx.drawImage(
      this.image,
      shipX,
      shipY,
      shipSize.width,
      shipSize.height
    );
  }
}

export default Ship;
