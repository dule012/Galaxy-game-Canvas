export const transformArrayToObject = (arrOfPropNames, dataArr) => {
  const obj = {};
  dataArr.map((item, index) => (obj[arrOfPropNames[index]] = item));
  return obj;
};

export const isArrayEmpty = arr => Array.isArray(arr) && arr.length === 0;
export const isNumber = data => typeof data === "number";

export const getHtmlElement = data => document.querySelector(data);
export const getHtmlElements = data => document.querySelectorAll(data);
