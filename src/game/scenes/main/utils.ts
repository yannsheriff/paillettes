import stepEventEmitter, {
  StepEventType,
} from "../../../services/stepEventEmitter";
import { Direction } from "readline";

export const delay = (time: number) =>
  new Promise(function (resolve) {
    setTimeout(resolve, time, "timeout");
  });

export const stepEvent = () =>
  new Promise((resolve, reject) => {
    stepEventEmitter.on(StepEventType.stepdown, (direction: Direction) => {
      resolve(direction);
    });
  });
