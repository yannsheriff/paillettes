import ScoreStateManager from "../../states/score";
import PhysicCharacter, { CharacterType } from "../CharactersComponent/Character";
import MainStateManager, { MainState } from "../../states/main";

const duration = 3000;

class ScoreCrowdComponent {
  private scene: Phaser.Scene;
  private finalCrowd: Array<string>;
  private physicCharacters: Array<PhysicCharacter> = [];
  private mainState: MainState;
  private mainManager: MainStateManager;
  private characterPassCallback: (id: string) => void
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
  }

  create() {
    const unlockedCharLength = this.finalCrowd.length;
    const intervalDuration = duration / unlockedCharLength;
    let delay = 0;

    this.finalCrowd.forEach(assetname => {
      setTimeout(() => {
        this.createPhysicCharacter(assetname)
      }, delay);
      delay += intervalDuration;
    });

    // const interval = setInterval(this.characterPassCallback, intervalDuration);

    // setTimeout(() => {
    //   clearInterval(interval);
    //   this.onEndCallBack();
    // }, duration);
  }

  createPhysicCharacter(assetname: string) {
    new PhysicCharacter(
      this.scene,
      assetname,
      "Run",
      '',
      this.mainState.objectSpeed,
      this.characterPassCallback,
      CharacterType.score,
      true
    );
}
}

export default ScoreCrowdComponent;
