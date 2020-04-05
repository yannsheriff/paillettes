import EventEmitter from "events";
import { StepEventType } from "./gamepadListener";

const keyTable = new Map([
  [37, "left"],
  [40, "down"],
  [38, "up"],
  [39, "right"],
]);

class KeyboardListener {
  /*
   * Define properties
   */
  private stepEventEmitter: EventEmitter | undefined;

  /**
   * Init KeyboardListener
   * @param eventEmitter Take an EventEmitter to emit stepDown and stepUp.
   */
  init = (eventEmitter: EventEmitter) => {
    this.stepEventEmitter = eventEmitter;
    this.listen();
  };

  private listen = () => {
    document.addEventListener("keydown", (e) => {
      const event = keyTable.get(e.keyCode);
      if (event !== undefined) {
        this.stepEventEmitter?.emit(StepEventType.stepdown, event);
      }
    });
    document.addEventListener("keyup", (e) => {
      const event = keyTable.get(e.keyCode);
      if (event !== undefined) {
        this.stepEventEmitter?.emit(StepEventType.stepup, event);
      }
    });
  };
}

const keyboardListener = new KeyboardListener();

export default keyboardListener;
