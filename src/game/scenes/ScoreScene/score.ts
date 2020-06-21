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
import { StepEventType } from "../../helpers/StepEventEmitter/gamepadListener";
import stepEventEmitter from "../../helpers/StepEventEmitter";
import { Direction } from "../../components/SheetMusicComponent/GridObject";

export default class ScoreScene extends Phaser.Scene {
  private confettiManager?: ConfettiGenerator;
  private glitter?: GlitterComponent;
  private barComponent?: BarComponent;
  private curtainsComponent?: CurtainsComponent;
  private scoreCrowd?: ScoreCrowdComponent;
  private soundMananger?: SoundManager;
  private achievementScoreComponent?: AchievementScoreComponent;
  private isLeaving: boolean = false; 
  private nextButton?: Phaser.GameObjects.Image

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

    this.nextButton = this.add.image(0, 0, "scoreNext").setAlpha(0).setDepth(52);
    Align.right(this.nextButton);
    Align.bottom(this.nextButton);

    // === Crowd component
    this.scoreCrowd = new ScoreCrowdComponent(
      this,
      0.8,
      this.onCharacterPass,
      this.onAllCharactersCounted
    );

    // === Bar component
    this.barComponent = new BarComponent(
      this,
      0.8,
      this.allowLeaveScene
    );
    
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

  onAllCharactersCounted = () => {
    this.barComponent?.launchInterval();
  };

  endScoreScene = (directions: Direction[]) => {
    const directionPressed = directions[0];
    if (directionPressed === "right" && !this.isLeaving) {
      this.curtainsComponent?.initCodeAnimations();
      this.isLeaving = true;
      this.tweens.add({
        targets: this.nextButton,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete: () => {
          this.nextButton!.destroy()
        }
      });
    }
  };

  allowLeaveScene = () => {
    this.tweens.add({
      targets: this.nextButton,
      alpha: 1,
      duration: 300,
      ease: 'Power2'
    });

    stepEventEmitter.on(StepEventType.stepdown, this.endScoreScene);
  }
  
  update() {
    this.glitter?.update();
  }
}
