import { StepEventEmitter } from "./stepEventEmitter";

function arraysEqual(a: Array<any>, b: Array<any>) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const buttonTable = new Map([
  [0, "left"],
  [1, "down"],
  [2, "up"],
  [3, "right"]
]);

function formatButtonArray(buttons: Array<number>): Array<string> {
  return buttons
    .map(el => buttonTable.get(el))
    .filter(element => element !== undefined) as Array<string>;
}

class GamepadListener {
  private controller = undefined;
  private turbo = false;
  private buttonsCache: Array<number> = [];
  private stepEventEmitter: StepEventEmitter | undefined;
  buttons = [];
  buttonsStatus: Array<number> = [];
  axesStatus = [];

  init = (stepEventEmitter: StepEventEmitter) => {
    window.addEventListener("gamepadconnected", evt => {
      this.connect(evt);
    });
    window.addEventListener("gamepaddisconnected", this.disconnect);
    this.stepEventEmitter = stepEventEmitter;
  };

  private connect = (evt: any) => {
    this.controller = evt.gamepad;
    this.turbo = true;
    this.loop();
    console.log("Gamepad connected.");
  };

  private disconnect = (evt: any) => {
    this.turbo = false;
    delete this.controller;
    console.log("Gamepad disconnected.");
  };

  private loop = () => {
    this.update();
    requestAnimationFrame(this.loop);
  };

  private dispatchEvent = (buttons: Array<number>) => {
    if (this.stepEventEmitter !== undefined) {
      const btn = formatButtonArray(buttons);
      this.stepEventEmitter.emit("step", ...btn);
    } else {
      throw new Error("No stepEventEmitter connected");
    }
  };

  private update = () => {
    const gamepadButtons = navigator.getGamepads()[0]?.buttons;

    if (this.buttonsStatus.length > 0) {
      this.buttonsCache = [];
      for (var index = 0; index < this.buttonsStatus.length; index++) {
        this.buttonsCache[index] = this.buttonsStatus[index];
      }
    } else {
      this.buttonsCache = [];
    }

    this.buttonsStatus = [];
    const pressed: Array<number> = [];

    if (gamepadButtons !== undefined) {
      gamepadButtons.forEach((el, index) => {
        if (el.pressed) {
          pressed.push(index);
        }
      });
    }

    if (!arraysEqual(pressed, this.buttonsCache)) {
      this.dispatchEvent(pressed);
    }

    this.buttonsStatus = pressed;
  };
}

const gamepadListener = new GamepadListener();

export default gamepadListener;
