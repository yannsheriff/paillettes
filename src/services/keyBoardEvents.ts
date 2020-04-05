import { StepEventEmitter, StepEventType } from "./stepEventEmitter";

export const keyboardListener = (stepEventEmitter: StepEventEmitter) => {
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 39:
        stepEventEmitter.emit(StepEventType.stepdown, "right");
        break;
      case 37:
        stepEventEmitter.emit(StepEventType.stepdown, "left");
        break;
      case 38:
        stepEventEmitter.emit(StepEventType.stepdown, "up");
        break;
      case 40:
        stepEventEmitter.emit(StepEventType.stepdown, "down");
        break;

      default:
        break;
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 39:
        stepEventEmitter.emit(StepEventType.stepup, "right");
        break;
      case 37:
        stepEventEmitter.emit(StepEventType.stepup, "left");
        break;
      case 38:
        stepEventEmitter.emit(StepEventType.stepup, "up");
        break;
      case 40:
        stepEventEmitter.emit(StepEventType.stepup, "down");
        break;

      default:
        break;
    }
  });
};
