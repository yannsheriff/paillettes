import React, { Component } from "react";
import { gameConfig } from "../../../game/config";
import stepEventEmitter from "../../../game/helpers/StepEventEmitter";
import { StepEventType } from "../../../game/helpers/StepEventEmitter/gamepadListener";
import { arrowL, arrowR } from "../../../game/assets/";
import MainStateManager from "../../../game/states/main";
import { ConfettiGenerator } from "../../../game/helpers/Confetti";

interface state {
  isLeftPressed: boolean;
  isRightPressed: boolean;
  seconds: string;
  chronoIsLaunched: boolean;
}

export default class Game extends Component<{}, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLeftPressed: false,
      isRightPressed: false,
      seconds: "03",
      chronoIsLaunched: false,
    };
  }

  componentDidMount() {
    stepEventEmitter.on(StepEventType.stepdown, (directions: Array<string>) => {
      let left, right;
      if (directions.find((d) => d === "left")) {
        left = true;
      }
      if (directions.find((d) => d === "right")) {
        right = true;
      }
      this.setState(
        {
          isLeftPressed: left || this.state.isLeftPressed,
          isRightPressed: right || this.state.isRightPressed,
        },
        this.triggerTimeout
      );
    });

    stepEventEmitter.on(StepEventType.stepup, (directions: Array<string>) => {
      console.log("realased : ", directions);
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
        seconds: "03",
        chronoIsLaunched: false,
      });
    });

    setTimeout(() => {
      const canvas = document.getElementById("paillettes");
      if (canvas && canvas instanceof HTMLCanvasElement) {
        const confetti = new ConfettiGenerator(canvas);
        confetti.startConfetti(undefined, undefined, 70);
      }
    }, 500);
  }

  triggerTimeout() {
    const { isLeftPressed, isRightPressed, chronoIsLaunched } = this.state;
    if (isLeftPressed && isRightPressed && !chronoIsLaunched) {
      console.log("stat");
      this.setState({ chronoIsLaunched: true }, () => {
        this.lauchChrono(new Date().getTime() + 3000);
      });
    }
  }

  lauchChrono = (endTime: number) => {
    const chrono = setInterval(() => {
      const { isLeftPressed, isRightPressed } = this.state;
      if (isLeftPressed && isRightPressed) {
        const now = new Date().getTime();
        const sub = endTime - now;
        const seconds = formatToSeconds(sub);
        this.setState({ seconds });

        if (sub <= 0) {
          clearInterval(chrono);
          MainStateManager.getInstance().launchGame();
        }
      } else {
        clearInterval(chrono);
      }
    }, 50);
  };

  render() {
    const { isLeftPressed, isRightPressed, seconds } = this.state;
    return (
      <div id="brille-cherie-intro">
        <canvas id="paillettes" />
        <div id="brille-cherie-logo">
          ici il y aura le logo <br />
          mais on a pas encore le logo
        </div>
        <div>{isLeftPressed && isRightPressed && seconds}</div>

        <div id="brille-cherie-footer">
          <p>
            longpress
            <img
              src={arrowL}
              alt="arrow-left"
              className={isLeftPressed ? "pressed" : ""}
            />
            and
            <img
              src={arrowR}
              alt="arrow-right"
              className={isRightPressed ? "pressed" : ""}
            />
            to start
          </p>
        </div>
      </div>
    );
  }
}

function formatToSeconds(ms: number): string {
  const sec = Math.round(ms / 1000).toString();
  return sec.length > 1 ? sec : "0" + sec;
}
