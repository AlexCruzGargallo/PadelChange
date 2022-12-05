import { Request, Response } from "express";
import Racket from "../models/RacketSchema";

class RacketController {
  public async getAllRackets(req: any, res: Response) {
    try {
      const rackets = await Racket.find();

      if (!rackets) {
        throw new Error("No se encontraron los ejercicios");
      }

      res.send({
        rackets: rackets,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default RacketController;
