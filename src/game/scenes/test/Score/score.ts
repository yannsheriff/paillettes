import config from "./config";
import { ConfettiGenerator } from "../../../helpers/Confetti";
import GlitterComponent from "../../../components/GlitterComponent";
import BarComponent from "../../../components/BarComponent";
import { bar, barLoaderTip, ground } from "../../../assets";
import Ground from "../../../components/GroundComponent";

export default class ScoreScene extends Phaser.Scene {
  private confettiManager?: ConfettiGenerator;
  private glitter?: GlitterComponent;

  constructor() {
    super(config);
  }

  public preload(): void {
    this.load.image("Bar", bar);
    this.load.image("BarLoaderTip", barLoaderTip);
    this.load.image("ground", ground);
  }

  public create() {
    // confettti component
    // this.glitter = new GlitterComponent(this);
    // this.glitter.confettiManager?.grow();
    // this.glitter.confettiManager?.startConfetti();

    // Crowd component

    // Bar component
    new BarComponent(this, 0.8);

    // Ground componenet
    new Ground(this);

    // Success component

    // Curtains omponent
  }

  update() {
    this.glitter?.update();
  }
}
