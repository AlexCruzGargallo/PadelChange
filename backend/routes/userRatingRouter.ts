import express from "express";
import UserRatingController from "../controllers/userRatingController";

const router = express.Router();
const userRatingController = new UserRatingController();

router.post("/rating/:id", userRatingController.rateUser)
router.get("/:id", userRatingController.getRatesUser)

export default router;