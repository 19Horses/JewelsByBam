import { useEffect, useRef } from "react";
import items from "../items.json";

export const useMenuFunctionality = (setItem, setAnimatingIn) => {
  const animationRef = useRef(null);

  useEffect(() => {
    const selectedItem = findArrayElementByID(items, 0);
    if (selectedItem) {
      setItem(selectedItem);
      setAnimatingIn(true);
    }
  }, [setItem, setAnimatingIn]);

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
  console.log("Animating out");
  setTimeout(() => {
    console.log("start");
    if (forward) setItem(findNextArrayItemByID(items, item.id));
    else setItem(findPrevArrayItemByID(items, item.id));
    setAnimatingOut(false);
    setAnimatingIn(true);
    console.log("Animating in");
  }, 400); // Adjust the delay to match the duration of your animation
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
