import EventEmitter from "events";
import { keyboardListener } from "./keyBoardEvents";
import gamepadListener from "./gamepadListener";
import { Direction } from "../game/classes/physic/Arrow";

export enum StepEventType {
  stepdown = "stepdown",
  stepup = "stepup",
}

export const delay = (time: number) =>
  new Promise(function (resolve) {
    setTimeout(resolve, time, "timeout");
  });

export const stepEventPromise = () =>
  new Promise((resolve, reject) => {
    stepEventEmitter.on(StepEventType.stepdown, (direction: Direction) => {
      resolve(direction);
    });
  });

export class StepEventEmitter extends EventEmitter {
  constructor() {
    super();
    keyboardListener(this);
    gamepadListener.init(this);
  }
}

const stepEventEmitter = new StepEventEmitter();

export default stepEventEmitter;
