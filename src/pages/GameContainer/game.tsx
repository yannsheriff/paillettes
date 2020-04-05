import React from "react";
import { gameConfig } from "../../game/config";
import stepEventEmitter, {
  StepEventType,
} from "../../services/stepEventEmitter";

export default class Game extends React.Component<any> {
  componentDidMount() {
    const game = new Phaser.Game(gameConfig);

    stepEventEmitter.on(
      StepEventType.stepdown,
      (...directions: Array<string>) => {
        console.log("Pressed ! ", ...directions);
      }
    );
    stepEventEmitter.on(
      StepEventType.stepup,
      (...directions: Array<string>) => {
        console.log("realased ! ", ...directions);
      }
    );
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
  }
}
