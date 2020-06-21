import Align from "../../helpers/Align/align";
import ScoreStateManager, { AchievementType } from "../../states/score";
import Achievement from "../AchievementComponent/Achievement"
import { GameStep } from "../../states/main";

class AchievementScoreComponent {
  private scene: Phaser.Scene;
  private unlockedAchievement: AchievementType[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.unlockedAchievement = ScoreStateManager.getInstance().state.achievementsUnlocked;

    // const finalScore = ScoreStateManager.getInstance().state.score;

    this.create();
  }

  create() {
    // this.unlockedAchievement.forEach(achievement => {
    //   let achivement = new Achievement(
    //     this.scene,
    //     "achievement",
    //     "play",
    //     GameStep.score,
    //     false,
    //   )
    //  achivement.changeSkin(achievement)
    // });
  }

}

export default AchievementScoreComponent;
