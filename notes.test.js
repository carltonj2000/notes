"use strict";
const fs = require("fs");

const notes = require("./notes");

beforeAll(() =>
  new Promise((resolve, reject) =>
    fs.exists(notes.fileName, exists => {
      if (!exists) return resolve();
      fs.unlink(notes.fileName, err => {
        if (err) return reject(err);
        resolve();
      });
    })
  ));

test("remove fails with no notes", done => {
  expect(notes.remove("t2")).toBe(false);
  done();
});

test("add", done => {
  expect(notes.add("t1", "b1")).toBe(true);
  expect(notes.add("t2", "b2")).toBe(true);
  expect(notes.add("t3", "b3")).toBe(true);
  expect(notes.add("t1", "b1")).toBe(false);
  done();
});

test("remove existing and non-existing note", done => {
  expect(notes.remove("t2")).toBe(true);
  expect(notes.remove("t4")).toBe(false);
  done();
});

test("read notes", done => {
  expect(notes.read("t2")).toEqual({
    status: "failed",
    result: { title: "t2" }
  });
  expect(notes.read("t4")).toEqual({
    status: "failed",
    result: { title: "t4" }
  });
  expect(notes.read("t3")).toEqual({
    status: "success",
    result: { title: "t3", body: "b3" }
  });
  done();
});

test("list notes", done => {
  expect(notes.list()).toEqual([
    { title: "t1", body: "b1" },
    { title: "t3", body: "b3" }
  ]);
  expect(notes.remove("t1")).toBe(true);
  expect(notes.remove("t3")).toBe(true);
  expect(notes.list()).toEqual([]);
  done();
});
