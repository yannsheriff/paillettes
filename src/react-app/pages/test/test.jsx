import React from "react";
// import { confetti } from "./conf";
import { ConfettiManager } from "./conf2.ts";
export default class Game extends React.Component {
  componentDidMount() {
    // confetti.startConfetti();
    const conf = new ConfettiManager();
    conf.startConfetti();

    function run() {
      conf.runAnimation();
      requestAnimationFrame(run);
    }

    run();
  }

  render() {
    return <div id="phaser-game" />;
  }
}
