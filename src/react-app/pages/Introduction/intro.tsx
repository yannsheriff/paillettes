import React from "react";
import { gameConfig } from "../../../game/config";
import stepEventEmitter from "../../../game/helpers/StepEventEmitter";
import { StepEventType } from "../../../game/helpers/StepEventEmitter/gamepadListener";
import { arrowL, arrowR } from "../../../game/assets/";

export default class Game extends React.Component<any> {
  componentDidMount() {
    stepEventEmitter.on(
      StepEventType.stepdown,
      (...directions: Array<string>) => {
        console.log("Pressed : ", ...directions);
      }
    );
    stepEventEmitter.on(
      StepEventType.stepup,
      (...directions: Array<string>) => {
        console.log("realased : ", ...directions);
      }
    );
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div id="brille-cherie-intro">
        <div id="brille-cherie-logo">
          ici il y aura le logo <br />
          mais on a pas encore le logo
        </div>

        <div id="brille-cherie-footer">
          <p>
            longpress
              <img src={arrowL} alt="arrow-left" />
            and
              <img src={arrowR} alt="arrow-right" />
            to start
          </p>
        </div>
      </div>
    );
  }
}
