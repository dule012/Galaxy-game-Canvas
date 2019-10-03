import Container from "../container/index.js";
import { shipSize } from "../../constants/index.js";

class Ship extends Container {
  draw(image, gameData) {
    const { ctx, shipX, shipY } = gameData;

    ctx.drawImage(image, shipX, shipY, shipSize.width, shipSize.height);
  }
}

export default Ship;
