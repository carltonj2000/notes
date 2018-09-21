const fs = require("fs");

const fileName = "notes.json";

const readJson = () =>
  fs.existsSync(fileName) ? JSON.parse(fs.readFileSync(fileName)) : [];
const writeJson = json => fs.writeFileSync(fileName, JSON.stringify(json));

const add = (title, body) => {
  const notes = readJson();
  if (notes.find(note => note.title === title) !== undefined) return false;
  writeJson([...notes, { title, body }]);
  return true;
};

const remove = title => {
  const notesIn = readJson();
  if (notesIn.length === 0) return false;
  const notesOut = notesIn.reduce(
    (a, d) => (d.title === title ? a : [...a, d]),
    []
  );
  writeJson(notesOut);
  return notesIn.length !== notesOut.length;
};

const list = () => readJson();

const read = title => {
  const notesFound = readJson().filter(note => note.title === title);
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
