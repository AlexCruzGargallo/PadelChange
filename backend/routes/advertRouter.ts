import express from "express";
import AdvertController from "../controllers/advertController";

const router = express.Router();
const advertController = new AdvertController();

router.post("/advert", advertController.createAdvert);
router.get("/", advertController.getAllAdverts);
router.get("/:id", advertController.getAdvert);
router.post("/upload/:id", advertController.upload);
router.put("/finish/:id", advertController.finish)


export default router;
