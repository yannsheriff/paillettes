import React, { Component } from "react";
import stepEventEmitter from "../../../game/helpers/StepEventEmitter";
import { StepEventType } from "../../../game/helpers/StepEventEmitter/gamepadListener";
import { leftOff, leftOn, rightOFF, rightON } from "../../../game/assets/";
import { ConfettiGenerator } from "../../../game/helpers/Confetti";

interface state {
  isLeftPressed: boolean;
  isRightPressed: boolean;
  chronoIsLaunched: boolean;
}

export default class Game extends Component<{}, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLeftPressed: false,
      isRightPressed: false,
      chronoIsLaunched: false,
    };
  }

  componentDidMount() {
    stepEventEmitter.on(StepEventType.stepdown, this.stepDownListener);
    stepEventEmitter.on(StepEventType.stepup, this.stepUpListener);

    const launchPaillettes = () => {
      setTimeout(() => {
        const canvas = document.getElementById("paillettes");
        if (canvas && canvas instanceof HTMLCanvasElement) {
          const confetti = new ConfettiGenerator(canvas);
          confetti.startConfetti(undefined, undefined, 70);
        }
        document.removeEventListener("keydown", launchPaillettes);
      }, 500);
    };

    document.addEventListener("keydown", launchPaillettes);
  }

  stepDownListener = (directions: string[]) => {
    let left, right;
    if (directions.find((d) => d === "left")) {
      left = true;
    }
    if (directions.find((d) => d === "right")) {
      right = true;
    }
    this.setState({
      isLeftPressed: left || this.state.isLeftPressed,
      isRightPressed: right || this.state.isRightPressed,
    });
  };

  stepUpListener = (directions: string[]) => {
    let left, right;
    if (directions.find((d) => d === "left")) {
      left = true;
    }
    if (directions.find((d) => d === "right")) {
      right = true;
    }
    this.setState({
      isLeftPressed: left ? false : this.state.isLeftPressed,
      isRightPressed: right ? false : this.state.isRightPressed,
      chronoIsLaunched: false,
    });
  };

  componentWillUnmount() {
    stepEventEmitter.removeListener(
      StepEventType.stepdown,
      this.stepDownListener
    );
    stepEventEmitter.removeListener(StepEventType.stepup, this.stepUpListener);
  }

  render() {
    const { isLeftPressed, isRightPressed } = this.state;

    return (
      <div id="brille-cherie-intro">
        <canvas id="paillettes" />

        <div id="brille-cherie-footer">
          <div></div>
          <p>
            longpress
            <img src={isLeftPressed ? leftOn : leftOff} alt="arrow-left" />
            and
            <img src={isRightPressed ? rightON : rightOFF} alt="arrow-right" />
            to start
          </p>
        </div>
      </div>
    );
  }
}
