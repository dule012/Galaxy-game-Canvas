import Container from "../container/index.js";
import { background } from "../../constants/index.js";

class Background extends Container {
  constructor(animationFrameID, image, gameData) {
    super();
    this.animationFrameID = animationFrameID;
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    this.ctx.drawImage(this.image, background.x, background.y);
    super.endGame(this.animationFrameID);
  }
}

export default Background;
