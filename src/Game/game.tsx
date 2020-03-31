import React from "react";
import { gameConfig } from "./config";

export default class Game extends React.Component<any> {
  componentDidMount() {
    const game = new Phaser.Game(gameConfig);
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
  }
}
