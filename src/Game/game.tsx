import React from "react";
// import { GameConfig } from "phaser/types/phaser";
import "./phaser";

export default class Game extends React.Component<any> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
  }
}
