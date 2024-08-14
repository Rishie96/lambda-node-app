import { ReadStream, WriteStream } from "fs";
import { User } from "../../models/User";
import { Request, Response } from "express";

const fs = require("fs");
const moment = require("moment");
const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth");

const readStream: ReadStream = fs.createReadStream(
  __dirname + "../../../raw/content.txt",
  "utf8"
);

const createUser = (name: string, age: number, email: string): User => {
  const newUser: User = {
    id: 1,
    name,
    age,
    email
  };
  return newUser;
};

router.get("/", [authMiddleware], (req: Request, res: Response) => {
  const timestamp: string = moment().format("DD-MMM-YYYY hh:mm:ss A");

  // Read contents
  readStream.on("data", (chunk: string) => {
    console.log("Data chunk read: \n", chunk);
  });

  // Write content
  const writableStream: WriteStream = fs.createWriteStream(
    __dirname + "../../../raw/content.txt",
    { flags: "a" }
  );
  const newContent: string = "Timestamp: " + timestamp;
  writableStream.write(newContent);
  writableStream.write("\n");
  writableStream.end();

  const user: User = createUser("Rishie", 27, "hribgm2496@gmail.com");
  res.json({ message: "Okay!", payload: user });
});

module.exports = router;
