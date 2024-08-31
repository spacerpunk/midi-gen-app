import * as Tonal from 'https://cdn.skypack.dev/@tonaljs/tonal';

const bpm = 60;
Tone.Transport.bpm.value = bpm;

const notes = ["C", "D", "E", "F", "G", "A", "B"];
const scales = [
  "major", "minor", "melodic minor", "harmonic minor", "pentatonic",
  "blues", "dorian", "phrygian", "lydian", "mixolydian", "locrian"
];

let notesArray = [];

function log(message) {
    document.getElementById('output').innerHTML += message + '<br>';
    console.log(message);
}

function convertNotes() {
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  const randomScale = scales[Math.floor(Math.random() * scales.length)];
  const scale = Tonal.Scale.get(`${randomNote} ${randomScale}`);
  
  notesArray = scale.notes.map(note => Tonal.Note.midi(note + "4"));
  log(`Selected scale: ${randomNote} ${randomScale}`);
  log(`Notes: ${scale.notes}`);
  log(`MIDI notes: ${notesArray}`);
}

const synth = new Tone.PolySynth().toDestination();

function noteGenerator() {
const note1 = notesArray[Math.floor(Math.random() * notesArray.length)];
//const note2 = notesArray[Math.floor(Math.random() * notesArray.length)];

const velocity1 = Math.random() * 0.5 + 0.3;
//const velocity2 = Math.random() * 0.4 + 0.2;

const now = Tone.now();
synth.triggerAttackRelease(Tone.Frequency(note1, "midi"), "4n", now, velocity1);
//synth.triggerAttackRelease(Tone.Frequency(note2, "midi"), "4n", now, velocity2);
}

function sequenceGenerator(numberOfNotes) {
  const sequence = new Tone.Sequence((time) => {
    noteGenerator();
  }, Array(numberOfNotes).fill(0), "4n");

  sequence.start(0);
}

Tone.Transport.on("start", () => {
  sequenceGenerator(5);
});

document.querySelector('#start').addEventListener('click', async () => {
  await Tone.start();
  convertNotes();
  log('Audio is ready');
  Tone.Transport.start();
});