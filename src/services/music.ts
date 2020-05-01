import MidiPlayer from "midi-player-js";

console.log("oucouc");

const Player = new MidiPlayer.Player(function (event: any) {
  console.log(event);
});
Player.loadFile("./music.mid");
// Player.play();
