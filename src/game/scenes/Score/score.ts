import config from "./config";
import { ConfettiGenerator } from "../../helpers/Confetti";
import GlitterComponent from "../../components/GlitterComponent";
import BarComponent from "../../components/BarComponent";
import { bar, barLoaderTip } from "../../assets";
import Ground from "../../components/GroundComponent";
import ScoreCrowdComponent from "../../components/ScoreCrowdComponent";
import CurtainsComponent from "../../components/CurtainsComponent";

export default class ScoreScene extends Phaser.Scene {
  private confettiManager?: ConfettiGenerator;
  private glitter?: GlitterComponent;
  private barComponent?: BarComponent;
  private curtainsComponent?: CurtainsComponent;
  private scoreCrowd?: ScoreCrowdComponent;

  constructor() {
    super(config);
  }

  public preload(): void {
  }

  public create() {
    // === Confettti component
    // this.glitter = new GlitterComponent(this);
    // this.glitter.confettiManager?.grow();
    // this.glitter.confettiManager?.startConfetti();

    // === Crowd component
    this.scoreCrowd = new ScoreCrowdComponent(this, 0.8, this.onCharacterPass, this.onEnd);

    // === Bar component
    this.barComponent = new BarComponent(this, 0.8);

    // Ground component
    new Ground(this);

    // Success component

    // Curtains component
    this.curtainsComponent = new CurtainsComponent(this)
  }

  onCharacterPass = () => {
    this.scoreCrowd?.increment();
    this.barComponent?.increment();
  };

  onEnd = () => {
    this.curtainsComponent?.initCodeAnimations()
    console.log("End.");
  };

  update() {
    this.glitter?.update();
  }
}
