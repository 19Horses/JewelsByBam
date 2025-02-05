export const itemSwitch = (setAnimatingOut, setAnimatingIn, cb) => {
  setAnimatingOut(true);
  setTimeout(() => {
    cb();
    setAnimatingOut(false);
    setAnimatingIn(true);
  }, 400);
};
