/* eslint-disable @typescript-eslint/no-explicit-any */

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const objectToArray = (obj: any) => {
  const arr: any = [];
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      arr.push({ key, ...obj[key] });
    }
  });
  return arr;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
