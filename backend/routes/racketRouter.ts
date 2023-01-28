import express from "express";
import RacketController from "../controllers/racketController";

const router = express.Router();
const racketController = new RacketController();

router.get("/", racketController.getAllRackets);
router.get("/byViews", racketController.getAllRacketsByViews);
router.get("/:id", racketController.getRacket);
router.put("/addView/:id", racketController.addRacketView);

export default router;
