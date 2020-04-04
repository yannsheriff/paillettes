const gamepadAPI: GamePadApi = {
  controller: undefined,
  turbo: false,
  connect: function(evt: any) {
    gamepadAPI.controller = evt.gamepad;
    gamepadAPI.turbo = true;
    console.log("Gamepad connected.");
    loop();
  },
  disconnect: function(evt: any) {
    gamepadAPI.turbo = false;
    delete gamepadAPI.controller;
    console.log("Gamepad disconnected.");
  },
  update: function() {
    const gamepadButtons = navigator.getGamepads()[0]?.buttons;

    if (gamepadAPI.buttonsStatus.length > 0) {
      gamepadAPI.buttonsCache = [];
      for (var k = 0; k < gamepadAPI.buttonsStatus.length; k++) {
        gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
      }
    } else {
      gamepadAPI.buttonsCache = [];
    }
    gamepadAPI.buttonsStatus = [];
    const pressed: Array<number> = [];

    if (gamepadButtons !== undefined) {
      gamepadButtons.forEach((el, index) => {
        if (el.pressed) {
          pressed.push(index);
        }
      });
    }

    if (!arraysEqual(pressed, this.buttonsCache)) {
      console.log("change");
    }

    gamepadAPI.buttonsStatus = pressed;
  },
  buttonPressed: function() {},
  buttons: [],
  buttonsCache: [],
  buttonsStatus: [],
  axesStatus: []
};

export default gamepadAPI;

function loop() {
  gamepadAPI.update();
  requestAnimationFrame(loop);
}

window.addEventListener("gamepadconnected", evt => {
  gamepadAPI.connect(evt);
  loop();
});
window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);

type GamePadApi = {
  controller: Gamepad | undefined;
  turbo: boolean;
  buttons: Array<any>;
  buttonsCache: Array<any>;
  buttonsStatus: Array<any>;
  axesStatus: Array<any>;
  update: () => void;
  buttonPressed: () => void;
  connect: (evt: any) => void;
  disconnect: (evt: any) => void;
};

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
