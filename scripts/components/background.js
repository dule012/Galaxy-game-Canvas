import Game from "./game.js";
import { background } from "../../constants/index.js";

class Background extends Game {
  constructor(animationFrameID, bg) {
    super();
    this.bg = bg;
    this.animationFrameID = animationFrameID;
  }

  draw() {
    this.ctx.drawImage(this.bg, background.x, background.y);
    super.endGame(this.animationFrameID);
  }
}

export default Background;
