import express from "express";
import RacketPetitionController from "../controllers/racketPetitionController";

const router = express.Router();
const racketPetitionController = new RacketPetitionController();

router.post("/create", racketPetitionController.create);
router.get("/", racketPetitionController.getAllPetitions);
router.post("/upload", racketPetitionController.upload);
router.post("/accept", racketPetitionController.accept);
router.post("/decline", racketPetitionController.decline);


export default router;
