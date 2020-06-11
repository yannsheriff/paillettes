import State from "../state";

export enum DifficultyModes {
  easy,
  medium,
  hard,
  hardcore,
}
export enum Worlds {
  middleAges = 1,
  today = 2,
  nineteenCentury = 3,
  prehistory = 4
}

export interface MainState {
  difficulty: DifficultyModes;
  world: Worlds;
  isInTransition: boolean;
  didChangeWorld: boolean;
  isGameLaunch: boolean;
  isGameOver: boolean;
}

const initialState = {
  difficulty: DifficultyModes.easy,
  world: Worlds.middleAges,
  didChangeWorld: false,
  isInTransition: false,
  isGameLaunch: false,
  isGameOver: false
};

export default class MainStateManager extends State {
  private static instance: MainStateManager;
  public state: MainState;
  private remainingWorlds: Worlds[];

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    super();
    this.state = initialState;

    this.remainingWorlds = [Worlds.nineteenCentury, Worlds.today, Worlds.prehistory];
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): MainStateManager {
    if (!this.instance) {
      this.instance = new MainStateManager();
    }
    return this.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public launchGame() {
    this.setState({
      isGameLaunch: true
    })
  }

  public incrementDifficulty() {
    const { difficulty } = this.state;
    this.setState({ difficulty: difficulty > 2 ? 3 : difficulty + 1 });
  }

  public decrementDifficulty() {
    const { difficulty } = this.state;
    this.setState({ difficulty: difficulty < 1 ? 0 : difficulty - 1 });
  }

  public changeWorld() {
    const world: Worlds = this.remainingWorlds[
      Math.floor(Math.random() * this.remainingWorlds.length)
    ];

    this.remainingWorlds = this.remainingWorlds.filter((w) => w !== world);
    this.setState({
      world: world,
      isInTransition: true,
      didChangeWorld: true,
    });

    setTimeout(() => {
      this.setState({
        isInTransition: false,
      });
    }, 15000);
  }
}
