import ScoreStateManager from "../../states/score";
import PhysicCharacter, {
  CharacterType,
} from "../CharactersComponent/Character";
import MainStateManager, { MainState } from "../../states/main";

const charactersCountDuration = 3000;
const finalScoreDisplayDuration = 6000;

class ScoreCrowdComponent {
  private scene: Phaser.Scene;
  private finalCrowd: Array<string>;
  private physicCharacters: Array<PhysicCharacter> = [];
  private mainState: MainState;
  private mainManager: MainStateManager;
  private characterPassCallback: (id: string) => void;
  private onEndCallBack: () => unknown;
  private charactersPassed: number = 0;

  constructor(
    scene: Phaser.Scene,
    scale: number,
    characterPassCallback: () => unknown,
    onEndCallBack: () => unknown
  ) {
    this.scene = scene;

    this.mainManager = MainStateManager.getInstance();
    this.mainState = this.mainManager.state;

    this.finalCrowd = ScoreStateManager.getInstance().state.charactersUnlocked;
    this.characterPassCallback = characterPassCallback;
    this.onEndCallBack = onEndCallBack;

    this.create();
  }

  create() {
    const unlockedCharLength = this.finalCrowd.length;
    const intervalDuration = charactersCountDuration / unlockedCharLength;
    let delay = 0;

    if (unlockedCharLength > 0) {
      this.finalCrowd.forEach((assetname) => {
        setTimeout(() => {
          this.createPhysicCharacter(assetname);
        }, delay);
        delay += intervalDuration;
      });
    }
  }

  createPhysicCharacter(assetname: string) {
    new PhysicCharacter(
      this.scene,
      assetname,
      "Run",
      "",
      this.mainState.objectSpeed,
      this.characterPassCallback,
      CharacterType.score,
      true
    );
  }

  increment() {
    this.charactersPassed += 1;

    if (this.charactersPassed === this.finalCrowd.length) {
      setTimeout(() => {
        this.onEndCallBack();
      }, finalScoreDisplayDuration);
    }
  }
}

export default ScoreCrowdComponent;
