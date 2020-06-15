import React, { Component } from "react";
import Game from "./pages/GameContainer";
import Intro from "./pages/Introduction";
import "./App.css";
import MainStateManager, { MainState } from "../game/states/main";
interface state {
  showStart: boolean;
  gameIsReady: boolean;
}
export default class App extends Component<{}, state> {
  mainState: MainState;
  constructor(props: any) {
    super(props);

    this.state = {
      showStart: true,
      gameIsReady: false,
    };

    MainStateManager.getInstance().subscribe(this.onStateChange);
    this.mainState = MainStateManager.getInstance().state;
  }

  private onStateChange = (state: MainState) => {
    if (
      state.isGameLaunch &&
      state.isGameLaunch !== this.mainState.isGameLaunch
    ) {
      this.mainState = state;
      this.setState({ showStart: !state.isGameLaunch });
    }

    if (state.isReady && state.isReady !== this.mainState.isReady) {
      this.mainState = state;
      this.setState({ gameIsReady: state.isReady });
    }
  };

  render() {
    const { showStart, gameIsReady } = this.state;
    return (
      <div className="App">
        <Game />
        {/* {showStart && gameIsReady && <Intro />} */}
      </div>
    );
  }
}
