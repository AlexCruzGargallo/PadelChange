import { Request, Response } from "express";
import Racket from "../models/RacketSchema";
import RacketRating from "../models/RacketRatingSchema";
import Utilities from "../utilities/utilities";

class RacketRatingController {
  public async rateRacket(req: any, res: Response) {
    try {
      let { tokenPayload } = req.body;
      if (!tokenPayload || !tokenPayload._id) {
        throw new Error("No tienes permisos");
      }

      const racketId = req.params.id;
      if (!racketId) {
        throw new Error("No se ha proporcionado el id de la pala");
      }

      const racket = await Racket.findOne({ _id: racketId });
      if (!racket) {
        throw new Error("La pala no existe");
      }

      let rbody  = req.body;

      const racketRating = new RacketRating(req.body);
      await racketRating.save();

    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
  
  public async getRatesRacket(req: any, res: Response) {
    try {
      const racketId = req.params.id;
      const racketRatings = await RacketRating.find({
        racket_id: racketId,
      });

      if (!racketRatings) {
        throw new Error("No hay ratings");
      }

      res.send({
        racketRatings: racketRatings,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default RacketRatingController;
