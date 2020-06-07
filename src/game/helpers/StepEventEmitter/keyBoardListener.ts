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
  private simultaneousDirectionDown: Direction[] = [];
  private simultaneousDirectionUp: Direction[] = [];

  /**
   * Init KeyboardListener
   * @param eventEmitter Take an EventEmitter to emit stepDown and stepUp.
   */
  init = (eventEmitter: EventEmitter) => {
    this.stepEventEmitter = eventEmitter;
    this.listen();
  };

  private listen = () => {
    document.addEventListener("keydown", this.emitDown);
    document.addEventListener("keyup", this.emitUp);
  };

  private emitDown = (e: KeyboardEvent) => {
    const event = keyTable.get(e.keyCode);

    if (this.simultaneousDirectionDown.length !== 0) {
      this.simultaneousDirectionDown.push(event!);
    } else {
      this.simultaneousDirectionDown = [event!];
      setTimeout(() => {
        this.stepEventEmitter?.emit(
          StepEventType.stepdown,
          this.simultaneousDirectionDown
        );
        this.simultaneousDirectionDown = [];
      }, 50);
    }
  };

  private emitUp = (e: KeyboardEvent) => {
    const event = keyTable.get(e.keyCode);

    if (this.simultaneousDirectionUp.length !== 0) {
      this.simultaneousDirectionUp.push(event!);
    } else {
      this.simultaneousDirectionUp = [event!];
      setTimeout(() => {
        this.stepEventEmitter?.emit(
          StepEventType.stepup,
          this.simultaneousDirectionUp
        );
        this.simultaneousDirectionUp = [];
      }, 50);
    }
  };
}

const keyboardListener = new KeyboardListener();

export default keyboardListener;
