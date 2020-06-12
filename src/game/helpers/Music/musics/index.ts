import got from "./got.json";
import zelda from "./zelda.json";
import badRomance from "./ladygaga.json";
import hungup from "./hungup.json";
import sisi from "./sisi.json";

export enum Musics {
  badRomance,
  zelda,
  got,
  sisi,
  hungup,
}

const map: Map<Musics, any> = new Map();

map.set(Musics.badRomance, badRomance);
map.set(Musics.zelda, zelda);
map.set(Musics.got, got);
map.set(Musics.hungup, hungup);
map.set(Musics.sisi, sisi);

export default map;
