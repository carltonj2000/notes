const fs = require("fs");

const fileName = "notes.json";

const fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync(fileName));
  } catch (e) {
    return [];
  }
};
const saveNotes = json => fs.writeFileSync(fileName, JSON.stringify(json));

const add = (title, body) => {
  const notes = fetchNotes();
  const note = { title, body };
  if (notes.find(note => note.title === title) !== undefined) return {};
  saveNotes([...notes, note]);
  return note;
};

const remove = title => {
  const notesIn = fetchNotes();
  if (notesIn.length === 0) return false;
  const notesOut = notesIn.reduce(
    (a, d) => (d.title === title ? a : [...a, d]),
    []
  );
  saveNotes(notesOut);
  return notesIn.length !== notesOut.length;
};

const list = () => {
  const notes = fetchNotes();
  debugger; // testing out debugger
  return notes;
};

const read = title => {
  const notesFound = fetchNotes().filter(note => note.title === title);
  if (notesFound.length === 0) return { status: "failed", result: { title } };
  return { status: "success", result: notesFound[0] };
};

module.exports = {
  fileName,
  add,
  list,
  read,
  remove
};
