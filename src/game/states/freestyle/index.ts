import State from "../state";

export enum FreeLetter {
  F,
  R,
  E1,
  E2,
}

export interface FreestyleState {
  remainingLetters: FreeLetter[];
  isFreestyleActivated: boolean;
  activationTime: number;
}

const initialState: FreestyleState = {
  remainingLetters: [FreeLetter.F, FreeLetter.R, FreeLetter.E1, FreeLetter.E2],
  isFreestyleActivated: false,
  activationTime: 0,
};

export default class FreestyleStateManager extends State {
  private static instance: FreestyleStateManager;
  public state: FreestyleState;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    super();
    this.state = initialState;
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): FreestyleStateManager {
    if (!this.instance) {
      this.instance = new FreestyleStateManager();
    }
    return this.instance;
  }

  public validateLetter = (letter: FreeLetter) => {
    const remainingLetters = this.state.remainingLetters.filter(
      (l) => l !== letter
    );
    this.setState({ remainingLetters });
    console.log(this.state);
  };

  public failLetter = () => {
    this.setState({ remainingLetters: initialState.remainingLetters });
    console.log(this.state);
  };

  public activateFreeMode = () => {
    if (!this.state.isFreestyleActivated) {
      this.setState({
        isFreestyleActivated: true,
        activationTime: new Date().getTime(),
      });
    }
  };
}