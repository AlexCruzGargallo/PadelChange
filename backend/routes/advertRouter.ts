import express from "express";
import AdvertController from "../controllers/advertController";

const router = express.Router();
const advertController = new AdvertController();

router.post("/advert", advertController.createAdvert)



export default router;