import EventEmitter from "events";
import { StepEventType } from "./gamepadListener";
import { Direction } from "../../components/SheetMusicComponent/GridObject";

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
  private simultaneousDirection: string | undefined;

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
      this.simultaneousDirection = this.simultaneousDirection + " " + event;
    } else {
      this.simultaneousDirection = event;
      setTimeout(() => {
        this.stepEventEmitter?.emit(
          StepEventType.stepdown,
          this.simultaneousDirection
        );
        this.simultaneousDirection = undefined;
      }, 50);
    }
  };
}

const keyboardListener = new KeyboardListener();

export default keyboardListener;
