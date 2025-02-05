import { useEffect, useRef } from "react";
import items from "../items.json";

export const useMenuFunctionality = (setAnimatingIn) => {
  const animationRef = useRef(null);

  useEffect(() => {
    const element = animationRef.current;
    if (element) {
      const handleAnimationCancel = () => setAnimatingIn(false);
      element.addEventListener("animationcancel", handleAnimationCancel);

      // Cleanup the event listener on component unmount
      return () => {
        element.removeEventListener("animationcancel", handleAnimationCancel);
      };
    }
  }, [setAnimatingIn]);

  return animationRef;
};

export const itemSwitch = (
  setItem,
  setAnimatingOut,
  setAnimatingIn,
  forward,
  item
) => {
  setAnimatingOut(true);
  setTimeout(() => {
    if (forward) setItem(findNextArrayItemByID(items, item.id));
    else setItem(findPrevArrayItemByID(items, item.id));
    setAnimatingOut(false);
    setAnimatingIn(true);
  }, 400);
};

export const itemSwitchTEMP = (setAnimatingOut, setAnimatingIn, cb) => {
  setAnimatingOut(true);
  setTimeout(() => {
    cb();
    setAnimatingOut(false);
    setAnimatingIn(true);
  }, 400);
};

export function findArrayElementByID(array, id) {
  return array.find((element) => {
    return element.id === id;
  });
}

export function findNextArrayItemByID(array, id) {
  return array.find((element) => {
    return element.id === id + 1;
  });
}

export function findPrevArrayItemByID(array, id) {
  return array.find((element) => {
    return element.id === id - 1;
  });
}
