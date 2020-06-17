import config from "./config";
import { ConfettiGenerator } from "../../helpers/Confetti";
import GlitterComponent from "../../components/GlitterComponent";
import BarComponent from "../../components/BarComponent";
import { bar, barLoaderTip, ground } from "../../assets";
import Ground from "../../components/GroundComponent";
import ScoreCrowdComponent from "../../components/ScoreCrowdComponent";

export default class ScoreScene extends Phaser.Scene {
  private confettiManager?: ConfettiGenerator;
  private glitter?: GlitterComponent;
  private barComponent?: BarComponent;

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("Bar", bar);
    this.load.image("BarLoaderTip", barLoaderTip);
    this.load.image("ground", ground);
  }

  public create() {
    // === Confettti component
    // this.glitter = new GlitterComponent(this);
    // this.glitter.confettiManager?.grow();
    // this.glitter.confettiManager?.startConfetti();

    // === Crowd component
    // TODO Graudren
    new ScoreCrowdComponent(this, 0.8, this.onCharacterPass, this.onEnd);

    // === Bar component
    this.barComponent = new BarComponent(this, 0.8);

    // Ground component
    new Ground(this);

    // Success component

    // Curtains component
    // TODO Graudren
  }

  onCharacterPass = () => {
    console.log("oooook");
    this.barComponent?.increment();
  };

  onEnd = () => {
    console.log("End.");
  };

  update() {
    this.glitter?.update();
  }
}
