import ScoreState from "../../../states/scoreState";

class Score {
  private score: Phaser.GameObjects.Text;
  private subtitle: Phaser.GameObjects.Text;
  private scoreManager: ScoreState;

  constructor(scene: Phaser.Scene, x: number, y: number, scale: number) {
    const font = 25 * scale;
    const fontScore = 55 * scale;
    this.scoreManager = ScoreState.getInstance();

    this.subtitle = scene.add.text(x - 100, y, "", {
      fontFamily: "LondrinaSolid",
      fontSize: font + "px",
      fontStyle: "",
      color: "#fff",
      fixedWidth: 300,
      align: "center",
    });

    this.score = scene.add.text(x - 100, y + 30, "", {
      fontFamily: "LondrinaSolid",
      fontSize: fontScore + "px",
      fontStyle: "",
      color: "#fff",
      align: "center", // 'left'|'center'|'right'|'justify'
      lineSpacing: -0.02,
      fixedWidth: 300,
      depth: 11
    });
    this.subtitle.setText("SCORE");
    this.subtitle.setDepth(11);
    this.score.setText("0");
    this.score.setDepth(11);
  }

  public updateScore() {
    this.score.setText(this.scoreManager.state.score.toString());
  }
}

export default Score;
