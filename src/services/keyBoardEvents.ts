import { StepEventEmitter } from "./stepEventEmitter";

export const keyboardListener = (stepEventEmitter: StepEventEmitter) => {
  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 39:
        stepEventEmitter.emit("step", "right");
        break;
      case 37:
        stepEventEmitter.emit("step", "left");
        break;
      case 38:
        stepEventEmitter.emit("step", "up");
        break;
      case 40:
        stepEventEmitter.emit("step", "down");
        break;

      default:
        break;
    }
  });
};
