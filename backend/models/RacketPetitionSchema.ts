import mongoose from "mongoose";
const { Schema } = mongoose;

const RacketSchema = new Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, default:"" },
  season: { type: String, default: "" },
  frame_material: { type: String, default: "" },
  flat_material: { type: String, default: "" },
  rubber_material: { type: String, default: "" },
  touch: { type: String, default: "" },
  shape: { type: String, default: "" },
  weight: { type: String, default: "" },
});

const RacketPetitionSchema = new Schema({
  user_id: { type: String, required: true },
  racket: { type: RacketSchema, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("RacketPetition", RacketPetitionSchema);
