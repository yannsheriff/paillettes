import React from "react";
import { gameConfig } from "../../game/config";
import stepEventEmitter from "../../services/stepEventEmitter";

export default class Game extends React.Component<any> {
  componentDidMount() {
    const game = new Phaser.Game(gameConfig);

    stepEventEmitter.on("step", (...directions: Array<string>) => {
      console.log("an event occurred ! ", ...directions);
    });
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
  }
}
