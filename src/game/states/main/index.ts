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
  prehistory = 4,
}

export enum GameStatus {
  isLoading,
  waitMusicLoading,
  isReady,
  willLaunch,
  isLaunch,
  isRunning,
  isGameOver,
  requestReload,
}

export enum GameStep {
  game,
  debug,
  score
}

export interface MainState {
  difficulty: DifficultyModes;
  world: Worlds;
  isInTransition: boolean;
  objectSpeed: number;
  didChangeWorld: boolean;
  gameStatus: GameStatus;
}

const initialState = {
  difficulty: DifficultyModes.easy,
  world: Worlds.middleAges,
  objectSpeed: 400,
  isInTransition: false,
  didChangeWorld: false,
  gameStatus: GameStatus.isLoading,
};

export default class MainStateManager extends State {
  private static instance: MainStateManager;
  public state: MainState;
  private remainingWorlds: Worlds[];
  private gameStatusCallback: Array<(gridObject: GameStatus) => unknown>;
  private gameStatusImmuableCallback: Array<
    (gridObject: GameStatus) => unknown
  >;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    super();
    this.state = initialState;
    this.gameStatusCallback = [];
    this.gameStatusImmuableCallback = [];

    const world = randomEnumValue(Worlds);

    this.setState({ world: world });

    this.remainingWorlds = [
      Worlds.nineteenCentury,
      Worlds.today,
      Worlds.prehistory,
      Worlds.middleAges,
    ].filter((w) => w !== world);
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
  public gameIsReady() {
    this.setState({
      gameStatus: GameStatus.isReady,
    });
    this.gameStatusChange();
  }

  public needMusicLoading() {
    this.setState({
      gameStatus: GameStatus.waitMusicLoading,
    });
    this.gameStatusChange();
  }

  public launchGame() {
    this.setState({
      gameStatus: GameStatus.willLaunch,
    });
    this.gameStatusChange();
    setTimeout(this.launch, 1000);
  }

  private launch = () => {
    this.setState({
      gameStatus: GameStatus.isLaunch,
    });

    this.gameStatusChange();
  };

  public runGame() {
    this.setState({
      gameStatus: GameStatus.isRunning,
    });
    this.gameStatusChange();
  }

  public endGame() {
    this.setState({
      gameStatus: GameStatus.isGameOver,
    });
    this.gameStatusChange();
  }

  private gameStatusChange() {
    this.gameStatusCallback.forEach((callback) =>
      callback(this.state.gameStatus)
    );
    this.gameStatusImmuableCallback.forEach((callback) =>
      callback(this.state.gameStatus)
    );
  }

  public restart() {
    const world = randomEnumValue(Worlds);

    this.setState({
      difficulty: DifficultyModes.easy,
      world,
      objectSpeed: 400,
      isInTransition: false,
      didChangeWorld: false,
      gameStatus: GameStatus.requestReload,
    });

    this.gameStatusCallback = [];

    this.gameStatusChange();

    this.remainingWorlds = [
      Worlds.nineteenCentury,
      Worlds.today,
      Worlds.prehistory,
      Worlds.middleAges,
    ].filter((w) => w !== world);
  }

  public incrementDifficulty() {
    const { difficulty } = this.state;
    this.setState({
      difficulty: difficulty > 2 ? 3 : difficulty + 1,
    });
  }

  public decrementDifficulty() {
    const { difficulty } = this.state;
    this.setState({
      difficulty: difficulty < 1 ? 0 : difficulty - 1,
    });
  }

  public onGameStatusChange(
    callback: (status: GameStatus) => unknown,
    immuable?: boolean
  ) {
    if (immuable === true) {
      this.gameStatusImmuableCallback.push(callback);
    } else {
      this.gameStatusCallback.push(callback);
    }
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

export function randomEnumValue<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}
