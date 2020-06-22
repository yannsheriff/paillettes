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
    let posX = 0;
    let assetWidth = 73;
    let assetHeight = 89;
    let scale = (window.innerWidth / assetWidth) * 0.04; // 5vw

    let container = this.scene.add.container(0, 0).setDepth(11)

    this.unlockedAchievement.forEach(achievement => {
      let achievementsprite = this.scene.add.sprite(
        0,
        0,
        "achievementsbadge",
        achievement
      ).setDepth(11).setScale(scale)

      achievementsprite.x = posX;

      posX += achievementsprite.displayWidth + 50
      container.add(achievementsprite)
    });
    container.x = window.innerWidth / 2 - posX / 2 + assetWidth * scale
    container.y = window.innerHeight - (assetHeight * scale / 2) - 40;
  }

}

export default AchievementScoreComponent;
