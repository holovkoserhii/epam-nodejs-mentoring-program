import { pipeline, Transform } from "stream";
import { promisify } from "util";
import csv from "csvtojson";
import fs from "fs";

const promisifiedPipeline = promisify(pipeline);

const FILE_NAME = "nodejs-hw1-ex1";

const showChunkInConsole = new Transform({
  transform(chunk, encoding, callback) {
    const chunkString = chunk.toString().trim();
    process.stdout.write(`SEPARATE CHUNK: ${chunkString}\n`);
    this.push(`${chunkString}\n`);
    callback();
  }
});

promisifiedPipeline(
  fs.createReadStream(`./csv/${FILE_NAME}.csv`),
  csv({
    trim: true,
    checkType: true
  }),
  showChunkInConsole,
  fs.createWriteStream(`./csv/${FILE_NAME}.txt`)
).catch(console.error);
