import EventEmitter from "events";
import { StepEventType } from "./gamepadListener";
import { Direction } from "../game/classes/physic/Arrow";

const keyTable: Map<number, Direction> = new Map([
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
  private simultaneousDirection: Direction | undefined;
  private timeout: NodeJS.Timeout | undefined;

  /**
   * Init KeyboardListener
   * @param eventEmitter Take an EventEmitter to emit stepDown and stepUp.
   */
  init = (eventEmitter: EventEmitter) => {
    this.stepEventEmitter = eventEmitter;
    this.listen();
  };

  private listen = () => {
    document.addEventListener("keydown", this.emit);
    document.addEventListener("keyup", (e) => {
      const event = keyTable.get(e.keyCode);
      if (event !== undefined) {
        this.stepEventEmitter?.emit(StepEventType.stepup, event);
      }
    });
  };

  private emit = (e: KeyboardEvent) => {
    const event = keyTable.get(e.keyCode);

    if (this.simultaneousDirection !== undefined) {
      const event = this.simultaneousDirection + " " + keyTable.get(e.keyCode);
      this.stepEventEmitter?.emit(StepEventType.stepdown, event);
      this.simultaneousDirection = undefined;
      clearTimeout(this.timeout!);
      return;
    }

    this.timeout = setTimeout(() => {
      this.simultaneousDirection = undefined;
      this.stepEventEmitter?.emit(StepEventType.stepdown, event);
    }, 50);

    this.simultaneousDirection = event;
  };
}

const keyboardListener = new KeyboardListener();

export default keyboardListener;
