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
        <div id="brille-cherie-footer">
          <div></div>
          <p>
            Maintenir
            <img src={isLeftPressed ? leftOn : leftOff} alt="arrow-left" />
            et
            <img src={isRightPressed ? rightON : rightOFF} alt="arrow-right" />
            pour débuter
          </p>
        </div>
      </div>
    );
  }
}
