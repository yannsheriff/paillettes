import {
  ImageData,
  SpritesheetData,
  SpineData,
  MusicData,
} from "../../helpers/Assets";

import {
  arrowD,
  arrowL,
  arrowR,
  arrowU,
  grid,
  zoneInput,
  ground,
  starDown,
  starLeft,
  starUp,
  starRight,
  chrono,
  hungup,
  musictest,
  // sisi,
  // zelda,
  bar,
  scoreBackground,
} from "../index";

export const mainImages: ImageData[] = [
  { key: "left", asset: arrowL },
  { key: "right", asset: arrowR },
  { key: "up", asset: arrowU },
  { key: "star-down", asset: starDown },
  { key: "star-left", asset: starLeft },
  { key: "star-up", asset: starUp },
  { key: "star-right", asset: starRight },
  { key: "grid", asset: grid },
  { key: "down", asset: arrowD },
  { key: "zoneInput", asset: zoneInput },
  { key: "chrono", asset: chrono },
  { key: "ground", asset: ground },
  { key: "Bar", asset: bar },
  { key: "scoreBackground", asset: scoreBackground },
];

export const mainSpritesheets: SpritesheetData[] = [
  {
    key: "world1",
    asset: "world1_spritesheet.json",
    path: "assets/spritesheets/world1/",
  },
  {
    key: "world2",
    asset: "world2_spritesheet.json",
    path: "assets/spritesheets/world2/",
  },
  {
    key: "world3",
    asset: "world3_spritesheet.json",
    path: "assets/spritesheets/world3/",
  },
  {
    key: "world4",
    asset: "world4_spritesheet.json",
    path: "assets/spritesheets/world4/",
  },
];

export const mainSpines: SpineData[] = [
  { key: "dragqueen", path: "assets/spine/dragqueen/" },
  { key: "godmother", path: "assets/spine/godmother/" },
  { key: "achievement", path: "assets/spine/achievement/" },
  { key: "curtains", path: "assets/spine/curtains/" },
  { key: "score", path: "assets/spine/score/" },
];

export const mainMusic: MusicData[] = [
  { key: "hungup", asset: hungup },
  { key: "musictest", asset: musictest },
  // { key: "sisi", asset: sisi },
  // { key: "zelda", asset: zelda },
];
