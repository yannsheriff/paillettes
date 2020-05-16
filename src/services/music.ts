import * as Tone from "tone";
// import gaga from "./zelda.json";
import { EventEmitter } from "events";

interface Note {
  duration: number;
  durationTicks: number;
  midi: number;
  name: string;
  ticks: number;
  time: number;
  velocity: number;
}

export interface NoteWithTrack {
  track: number;
  duration: number;
  durationTicks: number;
  midi: number;
  name: string;
  ticks: number;
  time: number;
  velocity: number;
}

interface Track {
  channel: number;
  controlChanges: any;
  pitchBends: [];
  instrument: any;
  name: string;
  notes: Note[];
}

export const NOTE_DELAY = 5000;

/**
 * Permet de de reduire le nombre d'evenement qui appel une callback
 * @param delay le temps min entre deux appel à la callback.
 * @param fn La fonction à appeler.
 */
export function throttle(delay: number, fn: (...args: any) => unknown) {
  let lastCall = 0;
  let requestCount = 1;
  let called = true;

  return function (...args: any) {
    const now = new Date().getTime();
    requestCount += 1;
    requestCount = called ? 1 : requestCount;
    if (now - lastCall < delay) {
      called = false;
      return;
    }
    lastCall = now;
    called = true;
    return fn(requestCount, ...args);
  };
}

export default class MusicPlayer {
  private emitter: EventEmitter;
  private synths: Tone.Synth[] = [];
  public noteMap: Map<string, 0 | 1 | 2 | 3> = new Map();

  constructor(songData: any, evtEmitter: EventEmitter) {
    this.emitter = evtEmitter;
    this.setupSong(songData);
  }

  private setupSong = (songData: any) => {
    const filteredTracks = songData.tracks.filter(
      (track: Track) => track.notes.length > 1
    );
    this.synths = [];

    const gain = new Tone.Gain(0.3);
    gain.toDestination();

    for (let index = 0; index < filteredTracks.length; index++) {
      this.synths.push(new Tone.Synth());
      this.synths[index].oscillator.type = "sine";
      this.synths[index].connect(gain);
    }

    Tone.Transport.bpm.value = songData.header.ppq;
    Tone.Transport.timeSignature = songData.header.timeSignatures;

    filteredTracks.forEach((track: any, index: number) => {
      const NotesWithTrack = track.notes.map((note: Note) => ({
        ...note,
        track: index,
      }));

      if (track.name === "main") {
        const delay = NOTE_DELAY / 1000;
        const mappedTimings = NotesWithTrack.map((note: Note) => ({
          ...note,
          time: note.time - delay,
        }));
        new Tone.Part(this.sendEvent, mappedTimings).start(0);
        new Tone.Part(this.playNote, NotesWithTrack).start(0);
        this.createNoteMap(track);
      } else {
        new Tone.Part(this.playNote, NotesWithTrack).start(0);
      }
    });
  };

  private sendEvent = (time: number, event: NoteWithTrack) => {
    this.emitter.emit("note", event);
  };

  // const ocataveList = map.map((note) => note.match(/\d+/)![0]);
  // const ocataves = ocataveList.filter((a, b) => ocataveList.indexOf(a) === b);

  private createNoteMap = (track: Track) => {
    const map = track.notes.map((note) => note.name);
    const notes = map
      .filter((a, b) => map.indexOf(a) === b)
      .sort(this.byNoteHeight);
    const noteByHeight = Math.round(notes.length / 4);

    notes.forEach((note, index) => {
      const pos = Math.floor(index / noteByHeight);

      if (pos === 0 || pos === 1 || pos === 2 || pos === 3) {
        this.noteMap.set(note, pos);
      }
    });
  };

  private byNoteHeight = (a: string, b: string) => {
    const octaveA = a.match(/\d+/)![0];
    const octaveB = b.match(/\d+/)![0];
    if (octaveA === octaveB) {
      return a > b ? 1 : -1;
    }
    return octaveA > octaveB ? 1 : -1;
  };

  private playNote = (time: number, event: NoteWithTrack) => {
    try {
      this.synths[event.track].triggerAttackRelease(
        event.name,
        event.duration,
        time,
        event.velocity
      );
    } catch (error) {
      console.warn("Note at same time : ", event.name, time);
    }
  };

  public start() {
    Tone.Transport.start();
  }
}

// document.addEventListener("click", (e) => {
//   const evt = new EventEmitter();
//   const player = new MusicPlayer(gaga, evt);
//   evt.on("note", () => console.log("coucou"));
//   player.start();
// });
