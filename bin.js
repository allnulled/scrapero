#!/usr/bin/env node
const path = require("path");
const default_storage = path.resolve(process.cwd(), "data");
const { port = 9898, storage = default_storage } = require("yargs").argv;
const scrapero = require(__dirname + "/server.js");

scrapero.start(port, storage);