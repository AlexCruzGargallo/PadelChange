import { Request, Response } from "express";
import RacketPetition from "../models/RacketPetitionSchema";
import User from "../models/UserSchema";
import Racket from "../models/RacketSchema";

class RacketPetitionController {
  public async create(req: any, res: Response) {
    try {
      //check user id
      const userId = req.body.user_id;
      if (!userId) {
        throw new Error("No se ha proporcionado el id del usuario");
      }
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("El usuario no existe");
      }

      const racketPet = new RacketPetition({
        user_id: userId,
        racket: req.body.racket,
        date: new Date(),
      });

      await racketPet.save();
      res.send({
        racketPet: racketPet,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async getAllPetitions(req: any, res: Response) {
    try {
      const petitions = await RacketPetition.find();

      res.send({
        petitions: petitions,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async upload(req: any, res: Response) {
    try {
      console.log("Uploading file...");
      let file = req["files"].thumbnail;

      console.log("File uploaded: ", file.name);

      file.mv("public/petitions/" + file.name);
      // Validate user inputs
      if (!file) {
        throw new Error("La imagen no es válida.");
      }
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async accept(req: any, res: Response) {
    try {
      const petition = req.body;
      console.log(req.body);

      const racket = new Racket(req.body.data.racket);
      await racket.save();

      var fs = require("fs");

      var inStr = fs.createReadStream(
        `./public/petitions/${req.body.data.racket.img}`
      );
      var outStr = fs.createWriteStream(
        `./public/rackets/${req.body.data.racket.img}`
      );

      inStr.pipe(outStr);

      await RacketPetition.deleteMany({ _id: req.body.data._id });

      res.send({
        petitions: petition,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async decline(req: any, res: Response) {
    try {
      const petition = req.body;
      await RacketPetition.deleteMany({ _id: req.body.data._id });

      res.send({
        petitions: petition,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default RacketPetitionController;
