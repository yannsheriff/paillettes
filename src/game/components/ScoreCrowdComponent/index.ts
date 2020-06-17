import ScoreStateManager from "../../states/score";
import PhysicCharacter, { CharacterType } from "../CharactersComponent/Character";
import MainStateManager, { MainState } from "../../states/main";

const duration = 10000;

class ScoreCrowdComponent {
  private scene: Phaser.Scene;
  private finalCrowd: Array<string>;
  private physicCharacters: Array<PhysicCharacter> = [];
  private mainState: MainState;
  private mainManager: MainStateManager;
  private characterPassCallback: () => unknown;
  private onEndCallBack: () => unknown;

  constructor(
    scene: Phaser.Scene,
    scale: number,
    characterPassCallback: () => unknown,
    onEndCallBack: () => unknown
  ) {
    this.scene = scene;

    this.mainManager = MainStateManager.getInstance();
    this.mainState = this.mainManager.state;

    this.finalCrowd = ScoreStateManager.getInstance().state.charactersUnlocked
    this.characterPassCallback = characterPassCallback;
    this.onEndCallBack = onEndCallBack;

    this.create();
    this.createPhysicCharacters()
  }

  createPhysicCharacters() {
    console.log(this.finalCrowd)
    // this.finalCrowd.forEach(character => {
      new PhysicCharacter(
        this.scene,
        "world_1_man_2",
        "Run",
        '',
        this.mainState.objectSpeed,
        () => {},
        CharacterType.score
      );
    // });
  }

  create() {
    const unlockedCharLength = this.finalCrowd.length;
    const intervalDuration = duration / unlockedCharLength;
    const interval = setInterval(this.characterPassCallback, intervalDuration);

    setTimeout(() => {
      clearInterval(interval);
      this.onEndCallBack();
    }, duration);
  }
}

export default ScoreCrowdComponent;
