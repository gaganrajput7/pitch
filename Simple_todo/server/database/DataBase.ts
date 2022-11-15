import mongoose from "mongoose";

const db =
  process.env.DATABASE ||
  "";
const connection = mongoose.connect(db, {});

export { connection };
