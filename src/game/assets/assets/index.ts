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
  F,
  R,
  E1,
  E2,
  FREEStar,
  starDown,
  starLeft,
  starUp,
  starRight,
  chrono,
  hungup,
  sisi,
} from "../index";

export const mainImages: ImageData[] = [
  { key: "left", asset: arrowL },
  { key: "right", asset: arrowR },
  { key: "up", asset: arrowU },
  { key: "F", asset: F },
  { key: "R", asset: R },
  { key: "E1", asset: E1 },
  { key: "E2", asset: E2 },
  { key: "star-down", asset: starDown },
  { key: "star-left", asset: starLeft },
  { key: "star-up", asset: starUp },
  { key: "star-right", asset: starRight },
  { key: "freeStar", asset: FREEStar },
  { key: "grid", asset: grid },
  { key: "down", asset: arrowD },
  { key: "zoneInput", asset: zoneInput },
  { key: "chrono", asset: chrono },
  { key: "ground", asset: ground },
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
];

export const mainMusic: MusicData[] = [
  { key: "hungup", asset: hungup },
  { key: "sisi", asset: sisi },
];
