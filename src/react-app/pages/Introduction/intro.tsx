import React from "react";
import { gameConfig } from "../../../game/config";
import stepEventEmitter from "../../../game/helpers/StepEventEmitter";
import { StepEventType } from "../../../game/helpers/StepEventEmitter/gamepadListener";

export default class Game extends React.Component<any> {
  componentDidMount() {
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
            <span className="arrow-left">
              <img src="../../" alt="arrow-left"/>
            </span>
            and
            <span className="arrow-right"/>
            to start
          </p>
        </div>
      </div>
    )
  }
}
