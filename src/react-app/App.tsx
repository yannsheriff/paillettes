import React, { Component } from "react";
import Game from "./pages/GameContainer";
import Intro from "./pages/Introduction";
import "./App.css";
import MainStateManager, { MainState } from "../game/states/main";
interface state {
  showStart: boolean;
}
export default class App extends Component<{}, state> {
  mainState: MainState;
  constructor(props: any) {
    super(props);

    this.state = {
      showStart: true,
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
  };

  render() {
    const { showStart } = this.state;
    return (
      <div className="App">
        <Game />
        {showStart && <Intro />}
      </div>
    );
  }
}
