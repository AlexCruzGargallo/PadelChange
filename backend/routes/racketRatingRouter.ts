import express from "express";
import RacketRatingController from "../controllers/racketRatingController";

const router = express.Router();
const racketRatingController = new RacketRatingController();

router.post("/rating/:id", racketRatingController.rateRacket)
router.get("/:id", racketRatingController.getRatesRacket)

export default router;