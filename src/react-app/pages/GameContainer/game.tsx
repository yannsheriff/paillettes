import React from "react";
import { gameConfig } from "../../../game/config";
import stepEventEmitter from "../../../game/Helpers/StepEventEmitter";
import { StepEventType } from "../../../game/Helpers/StepEventEmitter/gamepadListener";

const DEFAULT_WIDTH = 1440;
const DEFAULT_HEIGHT = 800;
const MAX_WIDTH = 1536;
const MAX_HEIGHT = 864;
let SCALE_MODE = "SMOOTH"; // FIT OR SMOOTH
let game: Phaser.Game;

export default class Game extends React.Component<any> {
  componentDidMount() {
    game = new Phaser.Game(gameConfig);

    window.addEventListener("resize", this.resize);

    // dirty way to wait for game created to set size
    setTimeout(() => this.resize(), 100);

    stepEventEmitter.on(
      StepEventType.stepdown,
      (...directions: Array<string>) => {
        // console.log("Pressed : ", ...directions);
      }
    );
    stepEventEmitter.on(
      StepEventType.stepup,
      (...directions: Array<string>) => {
        // console.log("realased : ", ...directions);
      }
    );
  }
  shouldComponentUpdate() {
    return false;
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;
    let maxWidth = MAX_WIDTH;
    let maxHeight = MAX_HEIGHT;
    let scaleMode = SCALE_MODE;

    let scale = Math.min(w / width, h / height);
    let newWidth = Math.min(w / scale, maxWidth);
    let newHeight = Math.min(h / scale, maxHeight);

    let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;
    let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT;
    let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT;

    // smooth scaling
    let smooth = 1;
    if (scaleMode === "SMOOTH") {
      const maxSmoothScale = 1;
      const normalize = (value: number, min: number, max: number) => {
        return (value - min) / (max - min);
      };
      if (width / height < w / h) {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) /
            (1 / (maxSmoothScale - 1)) +
          maxSmoothScale;
      } else {
        smooth =
          -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) /
            (1 / (maxSmoothScale - 1)) +
          maxSmoothScale;
      }
    }

    // // resize the game
    game.scale.resize(newWidth * smooth, newHeight * smooth);

    // // scale the width and height of the css
    game.canvas.style.width = newWidth * scale + "px";
    game.canvas.style.height = newHeight * scale + "px";

    // // center the game with css margin
    game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`;
    game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`;
  }

  render() {
    return <div id="phaser-game" />;
  }
}
