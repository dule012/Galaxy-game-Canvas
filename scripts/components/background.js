import Container from "../container/index.js";

class Background extends Container {
  constructor(animationFrameID, image, gameData) {
    super();
    this.animationFrameID = animationFrameID;
    this.image = image;
    this.gameData = gameData;
  }

  draw() {
    const { ctx, image } = this;
    const { backgroundX, backgroundY } = this.gameData;
    const { clientWidth, clientHeight } = this.ctx.canvas;

    ctx.drawImage(image, backgroundX, backgroundY, clientWidth, clientHeight);
    ctx.drawImage(
      image,
      backgroundX,
      clientHeight - backgroundY,
      clientWidth,
      backgroundY,
      0,
      0,
      clientWidth,
      backgroundY
    );
  }
}

export default Background;
