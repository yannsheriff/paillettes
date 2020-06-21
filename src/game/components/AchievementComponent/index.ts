import Achievement from "./Achievement";

import ScoreStateManager, {
  ScoreState,
} from "../../states/score";

import { GameStep } from "../../states/main";

// import ScoreStateManager, {
//   ScoreState,
//   AchievementType
// } from "../../states/score";

class AchievementManager {
    private scene: Phaser.Scene;
    private achivement?: Achievement;
    private scoreState: ScoreState;
    private scoreManager: ScoreStateManager;

    constructor(scene: Phaser.Scene) {
      this.scene = scene;
      
      this.scoreManager = ScoreStateManager.getInstance();
      this.scoreState = this.scoreManager.state;
      this.scoreManager.subscribe(this.onScoreStateChange);
    }
  
    private launchAchievement(achievement: string) {
      this.achivement = new Achievement(
        this.scene,
        "achievement",
        "play",
        GameStep.game,
        false,
      )
      this.achivement.changeSkin(achievement)

      this.achivement.spine.state.addListener({
        start: () => {},
        complete: () => {
          setTimeout(() => {
            this.achivement!.deleteAchievement()
          }, 500);
        },
        event: () => {},
        interrupt: () => {},
        end: () => {},
        dispose: () => {},
      });
    }

    private onScoreStateChange = (state: ScoreState) => {
      if (state.achievementsUnlocked !== this.scoreState.achievementsUnlocked) {
        let achievement = state.achievementsUnlocked[state.achievementsUnlocked.length - 1]
        this.launchAchievement(achievement)
      }
  
      this.scoreState = state;
    };
  }
  
  export default AchievementManager;
  