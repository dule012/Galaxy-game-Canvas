class Background {
  draw(image, gameData) {
    // const { image } = this;
    const { ctx, backgroundX, backgroundY } = gameData;
    const { clientWidth, clientHeight } = ctx.canvas;

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
