import { AnimationData } from "../../helpers/Animations";
import {
  good,
  oops,
  perfect,
  F_SPRITE,
  R_SPRITE,
  E1_SPRITE,
  E2_SPRITE,
  freestyle,
  up,
  down,
  left,
  right,
} from "../index";

export const mainAnimations: AnimationData[] = [
  {
    key: "up-on",
    asset: up,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 0,
    endFrame: 8,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "up-off",
    asset: up,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 8,
    endFrame: 12,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "up-success",
    asset: up,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 12,
    endFrame: 32,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "down-on",
    asset: down,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 0,
    endFrame: 8,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "down-off",
    asset: down,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 8,
    endFrame: 12,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "down-success",
    asset: down,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 12,
    endFrame: 32,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "left-on",
    asset: left,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 0,
    endFrame: 8,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "left-off",
    asset: left,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 8,
    endFrame: 12,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "left-success",
    asset: left,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 12,
    endFrame: 32,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "right-on",
    asset: right,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 0,
    endFrame: 8,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "right-off",
    asset: right,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 8,
    endFrame: 12,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "right-success",
    asset: right,
    frameWidth: 200,
    frameHeight: 200,
    startFrame: 12,
    endFrame: 32,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "freestyle-enter",
    asset: freestyle,
    frameWidth: 1353,
    frameHeight: 310,
    startFrame: 0,
    endFrame: 26,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "freestyle-exit",
    asset: freestyle,
    frameWidth: 1353,
    frameHeight: 310,
    startFrame: 26,
    endFrame: 0,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "freestyle-loop",
    asset: freestyle,
    frameWidth: 1353,
    frameHeight: 310,
    startFrame: 26,
    endFrame: 50,
    frameRate: 24,
    repeat: -1,
  },
  {
    key: "good",
    asset: good,
    frameWidth: 1308,
    frameHeight: 303,
    startFrame: 0,
    endFrame: 44,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "oops",
    asset: oops,
    frameWidth: 1308,
    frameHeight: 303,
    startFrame: 0,
    endFrame: 41,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "perfect",
    asset: perfect,
    frameWidth: 1308,
    frameHeight: 303,
    startFrame: 0,
    endFrame: 49,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "F_OFF",
    asset: F_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 0,
    endFrame: 0,
    frameRate: 0,
    repeat: 0,
  },
  {
    key: "F_ON",
    asset: F_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 1,
    endFrame: 1,
    frameRate: 0,
    repeat: -1,
  },
  {
    key: "F_FREE",
    asset: F_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 2,
    endFrame: 9,
    frameRate: 24,
    repeat: -1,
  },
  {
    key: "R_OFF",
    asset: R_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 0,
    endFrame: 0,
    frameRate: 0,
    repeat: 0,
  },
  {
    key: "R_ON",
    asset: R_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 1,
    endFrame: 1,
    frameRate: 0,
    repeat: -1,
  },
  {
    key: "R_FREE",
    asset: R_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 2,
    endFrame: 9,
    frameRate: 24,
    repeat: -1,
  },
  {
    key: "E1_OFF",
    asset: E1_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 0,
    endFrame: 0,
    frameRate: 0,
    repeat: 0,
  },
  {
    key: "E1_ON",
    asset: E1_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 1,
    endFrame: 1,
    frameRate: 0,
    repeat: -1,
  },
  {
    key: "E1_FREE",
    asset: E1_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 2,
    endFrame: 9,
    frameRate: 24,
    repeat: -1,
  },
  {
    key: "E2_OFF",
    asset: E2_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 0,
    endFrame: 0,
    frameRate: 0,
    repeat: 0,
  },
  {
    key: "E2_ON",
    asset: E2_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 1,
    endFrame: 1,
    frameRate: 0,
    repeat: -1,
  },
  {
    key: "E2_FREE",
    asset: E2_SPRITE,
    frameWidth: 52,
    frameHeight: 52,
    startFrame: 2,
    endFrame: 9,
    frameRate: 24,
    repeat: -1,
  },
];
