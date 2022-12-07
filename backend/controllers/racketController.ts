import { Request, Response } from "express";
import Racket from "../models/RacketSchema";

class RacketController {
  public async getAllRackets(req: any, res: Response) {
    try {
      const rackets = await Racket.find();

      if (!rackets) {
        throw new Error("No se encontraron las palas");
      }

      res.send({
        rackets: rackets,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async getRacket(req: any, res: Response) {
    try {
      const racketId = req.params.id;
      const racket = await Racket.findOne({
        _id: racketId,
      });

      if (!racket) {
        throw new Error("No se encontró la pala");
      }

      res.send({
        racket: racket,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default RacketController;
