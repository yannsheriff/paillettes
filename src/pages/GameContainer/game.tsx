import React from "react";
import { gameConfig } from "../../game/config";
import gamePadAPI from "../../services/gamePadEvent";
import stepEventEmitter from "../../services/stepEventEmitter";

export default class Game extends React.Component<any> {
  componentDidMount() {
    const game = new Phaser.Game(gameConfig);
    window.addEventListener("gamepadconnected", (event: any) => {
      gamePadAPI.connect(event);
    });

    stepEventEmitter.on("step", (direction: string) => {
      console.log("an event occurred ! ", direction);
    });
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
  }
}
