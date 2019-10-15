import { transformArrayToObject } from "../../utility/helpers.js";
import { imagesName } from "../../constants/index.js";

class LoadResources {
  constructor(imagesArr) {
    this.imagesArr = imagesArr;
    this.loadedImages = null;
  }

  loadSingleImage(src) {
    return new Promise((res, rej) => {
      const image = new Image();
      image.src = src;
      image.addEventListener("load", () => res(image));
    });
  }

  loadAllImages() {
    const imagesArr = this.imagesArr.map(image => this.loadSingleImage(image));
    return Promise.all(imagesArr).then(
      data => (this.loadedImages = transformArrayToObject(imagesName, data))
    );
  }

  load() {
    return this.loadAllImages();
  }
}

export default LoadResources;
