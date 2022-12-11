import mongoose from "mongoose";
const { Schema } = mongoose;

const RacketRatingSchema = new Schema({
  racket_id: { type: String, required: true },
  created_by: { type: String, required: true },
  comment: { type: String, default: "" },
  rating: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("RacketRating", RacketRatingSchema);
