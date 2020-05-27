import { AnimationData } from "../../plugins/Animations";
import { glow, good, oops, perfect } from "../index";

export const mainAnimations: AnimationData[] = [
  {
    key: "glow",
    asset: glow,
    frameWidth: 500,
    frameHeight: 500,
    startFrame: 0,
    endFrame: 16,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "good",
    asset: good,
    frameWidth: 920,
    frameHeight: 920,
    startFrame: 0,
    endFrame: 28,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "oops",
    asset: oops,
    frameWidth: 920,
    frameHeight: 920,
    startFrame: 0,
    endFrame: 30,
    frameRate: 24,
    repeat: 0,
  },
  {
    key: "perfect",
    asset: perfect,
    frameWidth: 920,
    frameHeight: 920,
    startFrame: 0,
    endFrame: 34,
    frameRate: 24,
    repeat: 0,
  },
];
