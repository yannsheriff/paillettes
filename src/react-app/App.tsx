import React, { Component } from "react";
import Game from "./pages/GameContainer";
import Intro from "./pages/Introduction";
import "./App.css";
import MainStateManager, { GameStatus } from "../game/states/main";
interface state {
  showStart: boolean;
  gameIsReady: boolean;
}
export default class App extends Component<{}, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      showStart: false,
      gameIsReady: false,
    };

    MainStateManager.getInstance().onGameStatusChange(this.gameStatusChange);
  }

  private gameStatusChange = (status: GameStatus) => {
    switch (status) {
      case GameStatus.isLaunch:
        this.setState({ showStart: false });
        break;
      case GameStatus.isReady:
        this.setState({ gameIsReady: true, showStart: true });
        break;

      default:
        break;
    }
  };

  render() {
    const { showStart, gameIsReady } = this.state;
    return (
      <div className="App">
        <Game />

        {showStart && gameIsReady && <Intro />}
      </div>
    );
  }
}
