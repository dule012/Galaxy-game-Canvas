import Container from "../container/index.js";

class Background extends Container {
  constructor(animationFrameID, image, gameData) {
    super();
    this.animationFrameID = animationFrameID;
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    const { backgroundX, backgroundY } = this.gameData;
    const { clientWidth, clientHeight } = this.ctx.canvas;

    this.ctx.drawImage(
      this.image,
      backgroundX,
      backgroundY,
      clientWidth,
      clientHeight
    );
    this.ctx.drawImage(
      this.image,
      backgroundX,
      clientHeight - backgroundY,
      clientWidth,
      backgroundY,
      0,
      0,
      clientWidth,
      backgroundY
    );
    super.endGame(this.animationFrameID);
  }
}

export default Background;
