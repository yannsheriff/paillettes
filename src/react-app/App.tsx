import React, { Component } from "react";
import Game from "./pages/GameContainer";
import Intro from "./pages/Introduction";
import "./App.css";
import MainStateManager, { MainState, GameStatus } from "../game/states/main";
interface state {
  showStart: boolean;
  gameIsReady: boolean;
}
export default class App extends Component<{}, state> {
  mainState: MainState;
  constructor(props: any) {
    super(props);

    this.state = {
      showStart: false,
      gameIsReady: false,
    };

    MainStateManager.getInstance().subscribe(this.onStateChange);
    this.mainState = MainStateManager.getInstance().state;
  }

  private onStateChange = (state: MainState) => {
    console.log("GameStatus : ", state.gameStatus);
    if (
      state.gameStatus === GameStatus.isLaunch &&
      state.gameStatus !== this.mainState.gameStatus
    ) {
      this.mainState = state;
      this.setState({ showStart: false });
    }

    if (
      state.gameStatus === GameStatus.isReady &&
      state.gameStatus !== this.mainState.gameStatus
    ) {
      this.mainState = state;
      this.setState({ gameIsReady: true, showStart: true });
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
