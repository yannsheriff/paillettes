import ScoreStateManager, { ScoreState } from "../../../states/score";
import MainStateManager, { MainState } from "../../../states/main";

class Score {
  private score: Phaser.GameObjects.Text;
  private subtitle: Phaser.GameObjects.Text;
  private difficulty: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
    const font = 20 * scale;
    const fontScore = 55 * scale;
    ScoreStateManager.getInstance().subscribe(this.updateScore);
    MainStateManager.getInstance().subscribe((state: MainState) => {
      this.difficulty.setText(state.difficulty.toString());
    });

    this.difficulty = scene.add
      .text(x - 100, y - 50, "0", {
        fontFamily: "LondrinaSolid",
        fontSize: "20px",
        fontStyle: "",
        color: "#fff",
        fixedWidth: 300,
        align: "center",
      })
      .setDepth(11)
      .setText("0");

    this.subtitle = scene.add.text(x - 100, y, "", {
      fontFamily: "LondrinaSolid",
      fontSize: font + "px",
      fontStyle: "",
      color: "#fff",
      fixedWidth: 300,
      align: "center",
    });

    this.score = scene.add.text(x - 100, y + 20, "", {
      fontFamily: "LondrinaSolid",
      fontSize: fontScore + "px",
      fontStyle: "",
      color: "#fff",
      align: "center", // 'left'|'center'|'right'|'justify'
      lineSpacing: -0.02,
      fixedWidth: 300,
      depth: 11,
    });

    this.subtitle.setText("SCORE");
    this.subtitle.setDepth(11);
    this.score.setText("0");
    this.score.setDepth(11);
  }

  public updateScore = (scoreState: ScoreState) => {
    this.score.setText(scoreState.score.toString());
  };
}

export default Score;
