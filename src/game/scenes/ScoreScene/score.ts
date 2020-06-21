import config from "./config";
import { ConfettiGenerator } from "../../helpers/Confetti";
import GlitterComponent from "../../components/GlitterComponent";
import BarComponent from "../../components/BarComponent";
import Ground from "../../components/GroundComponent";
import ScoreCrowdComponent from "../../components/ScoreCrowdComponent";
import CurtainsComponent from "../../components/CurtainsComponent";
import AchievementScoreComponent from "../../components/AchievementScoreComponent"
import Align from "../../helpers/Align/align";
import SoundManager from "../../managers/SoundManager";

export default class ScoreScene extends Phaser.Scene {
  private confettiManager?: ConfettiGenerator;
  private glitter?: GlitterComponent;
  private barComponent?: BarComponent;
  private curtainsComponent?: CurtainsComponent;
  private scoreCrowd?: ScoreCrowdComponent;
  private soundMananger?: SoundManager;
  private achievementScoreComponent?: AchievementScoreComponent;

  constructor() {
    super(config);
  }

  public create() {
    // === Confettti component
    this.glitter = new GlitterComponent(this);
    this.soundMananger = SoundManager.getInstance(this);
    this.glitter.confettiManager?.grow();
    this.glitter.confettiManager?.startConfetti();

    let background = this.add.image(0, 0, "scoreBackground");
    if (window.innerWidth > window.innerHeight) {
      Align.scaleToGameW(background, 1.2);
    } else {
      Align.scaleToGameH(background, 1.2);
    }
    Align.centerH(background);
    Align.centerV(background);

    // === Crowd component
    this.scoreCrowd = new ScoreCrowdComponent(
      this,
      0.8,
      this.onCharacterPass,
      this.onEnd
    );

    // === Bar component
    this.barComponent = new BarComponent(this, 0.8);
    
    // Ground component
    new Ground(this);
    
    // Success component
    this.achievementScoreComponent = new AchievementScoreComponent(this);

    // Curtains component
    this.curtainsComponent = new CurtainsComponent(this);
  }

  onCharacterPass = () => {
    // this.barComponent?.increment();
    this.barComponent?.incrementPoints(true);
    this.scoreCrowd?.increment();
    this.soundMananger?.playScore();
  };

  onEnd = () => {
    console.log("End.");
    this.barComponent?.launchInterval();
    // this.curtainsComponent?.initCodeAnimations();
  };

  update() {
    this.glitter?.update();
  }
}
