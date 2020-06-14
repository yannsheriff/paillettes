import EventEmitter from "events";
import { Direction } from "readline";

const buttonTable = new Map([
  [0, "left"],
  [1, "down"],
  [2, "up"],
  [3, "right"],
]);

function formatButtonArray(buttons: Array<number>): Array<string> {
  return buttons
    .map((el) => buttonTable.get(el))
    .filter((element) => element !== undefined) as Array<string>;
}

export enum StepEventType {
  stepdown = "stepdown",
  stepup = "stepup",
}

class GamepadListener {
  /*
   * Define properties
   */
  private controller = undefined;
  private interval: NodeJS.Timeout | undefined;
  private buttonsCache: Array<number> = [];
  private stepEventEmitter: EventEmitter | undefined;
  buttons = [];
  buttonsStatus: Array<number> = [];
  axesStatus = [];

  /**
   * Init GamepadListener
   * @param eventEmitter Take an EventEmitter to emit stepDown and stepUp.
   */
  init = (eventEmitter: EventEmitter) => {
    this.stepEventEmitter = eventEmitter;
    window.addEventListener("gamepadconnected", this.connect);
    window.addEventListener("gamepaddisconnected", this.disconnect);
  };

  /**
   * On gamepad connection start watching Gamepad object
   */
  private connect = (evt: any) => {
    this.controller = evt.gamepad;
    this.interval = setInterval(this.update, 100);
    console.log("Gamepad connected.");
  };

  /**
   * On gamepad disconnection stop watching Gamepad object
   */
  private disconnect = () => {
    delete this.controller;
    clearInterval(this.interval!);
    console.log("Gamepad disconnected.");
  };

  /**
   * Dispatch an event to eventEmitter
   */
  private dispatchEvent = (type: StepEventType, buttons: Array<number>) => {
    if (this.stepEventEmitter !== undefined) {
      const btn = formatButtonArray(buttons);
      this.stepEventEmitter.emit(type, btn);
    } else {
      throw new Error("No stepEventEmitter connected");
    }
  };

  /**
   * This is the main function.
   * It Check every 100ms the state of the gamepad object
   * It dispatch event on state change
   */
  private update = () => {
    const gamepadButtons = navigator.getGamepads()[0]?.buttons;
    const pressed: Array<number> = [];
    // this.buttonsStatus = [];
    this.buttonsCache = [];

    // set cache
    if (this.buttonsStatus.length > 0) {
      for (var index = 0; index < this.buttonsStatus.length; index++) {
        this.buttonsCache[index] = this.buttonsStatus[index];
      }
    }

    // set Pressed buttons
    if (gamepadButtons !== undefined) {
      gamepadButtons.forEach((el, index) => {
        if (el.pressed) {
          pressed.push(index);
        }
      });
    }

    // dispatch keydown event
    if (pressed.length > 0) {
      this.dispatchEvent(StepEventType.stepdown, pressed);
    }

    // dispatch keyup event
    if (pressed.length < this.buttonsCache.length) {
      const keyup = this.buttonsCache.filter((el) => !pressed.includes(el));
      this.dispatchEvent(StepEventType.stepup, keyup);
    }
    this.buttonsStatus = pressed;
  };
}

const gamepadListener = new GamepadListener();

export default gamepadListener;
