import EventEmitter from "events";
import { keyboardListener } from "./keyBoardEvents";
import gamepadListener from "./gamepadListener";

export class StepEventEmitter extends EventEmitter {
  constructor() {
    super();
    keyboardListener(this);
    gamepadListener.init(this);
  }
}

const stepEventEmitter = new StepEventEmitter();

export default stepEventEmitter;
