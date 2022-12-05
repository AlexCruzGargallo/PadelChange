import express from "express";
import RacketController from "../controllers/racketController";

const router = express.Router();
const racketController = new RacketController();

router.get("/", racketController.getAllRackets);

export default router;
