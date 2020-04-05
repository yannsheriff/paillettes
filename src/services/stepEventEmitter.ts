import EventEmitter from "events";
import keyboardListener from "./keyBoardListener";
import gamepadListener, { StepEventType } from "./gamepadListener";
import { Direction } from "../game/classes/physic/Arrow";

export const delay = (time: number): Promise<string> =>
  new Promise(function (resolve) {
    setTimeout(resolve, time, "timeout");
  });

export const stepEventPromise = (): Promise<string> =>
  new Promise((resolve) => {
    stepEventEmitter.on(
      StepEventType.stepdown,
      (...directions: Array<Direction>) => {
        resolve(directions.join(" "));
      }
    );
  });

export class StepEventEmitter extends EventEmitter {
  constructor() {
    super();
    keyboardListener.init(this);
    gamepadListener.init(this);
  }
}

const stepEventEmitter = new StepEventEmitter();

export default stepEventEmitter;
