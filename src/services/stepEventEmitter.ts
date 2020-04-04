import EventEmitter from "events";
import { keyboardListener } from "./keyBoardEvents";

class StepEventEmitter extends EventEmitter {
  constructor() {
    super();
    keyboardListener();
  }
}

const stepEventEmitter = new StepEventEmitter();

export default stepEventEmitter;
