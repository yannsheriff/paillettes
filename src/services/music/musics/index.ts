import got from "./got.json";
import zelda from "./zelda.json";
import badRomance from "./ladygaga.json";

export enum Musics {
  badRomance,
  zelda,
  got,
}

const map: Map<Musics, any> = new Map();

map.set(Musics.badRomance, badRomance);
map.set(Musics.zelda, zelda);
map.set(Musics.got, got);

export default map;
