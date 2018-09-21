const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

yargs
  .usage("$0 <cmd> [args]")
  .command(
    "add [title] [body]",
    "add an item to the list",
    yargs =>
      yargs
        .positional("title", { type: "string", describe: "title of note" })
        .positional("body", { type: "string", describe: "body of note" })
        .demand(["title", "body"]),
    ({ title, body }) => console.log(notes.add(title, body))
  )
  .command("list", "list all notes", () => console.log(notes.list()))
  .command(
    "read [title]",
    "read an item from the list",
    yargs =>
      yargs
        .positional("title", { type: "string", describe: "title of note" })
        .demand("title"),
    ({ title }) => notes.read(title)
  )
  .command(
    "remove",
    "remove an item from the list",
    yargs =>
      yargs
        .option("title", {
          alias: "t",
          type: "string",
          describe: "title of note"
        })
        .demand("title"),
    ({ title }) => notes.remove(title)
  )
  .demandCommand(1, "must provide a command")
  .help().argv;
