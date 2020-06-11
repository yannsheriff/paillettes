import React from "react";
// import { confetti } from "./conf";
import { confetti } from "./conf1";
export default class Game extends React.Component {
  componentDidMount() {
    confetti.startConfetti();
  }

  render() {
    return <div id="phaser-game" />;
  }
}
