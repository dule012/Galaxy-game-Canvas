import { imagesPath } from "../constants/index.js";

const getSingleImage = src =>
  new Promise((res, rej) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      res(image);
    };
  });

export const loadImages = () => imagesPath.map(item => getSingleImage(item));

export const transformArrayToObject = (arrOfPropNames, dataArr) => {
  const obj = {};
  dataArr.map((item, index) => (obj[arrOfPropNames[index]] = item));
  return obj;
};

export const getHtmlElement = data => document.querySelector(data);
