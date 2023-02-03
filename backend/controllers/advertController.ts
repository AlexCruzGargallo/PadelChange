import { Request, Response } from "express";
import Advert from "../models/AdvertSchema";
import Chat from "../models/ChatSchema";
import User from "../models/UserSchema";

class AdvertController {
  public async createAdvert(req: any, res: Response) {
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

      const sell_item = req.body.sell_item;
      if (!sell_item) {
        throw new Error("No se ha proporcionado el id de la pala que vendes");
      }

      // User has to be logged in
      let { tokenPayload } = req.body;
      if (!tokenPayload || !tokenPayload._id) {
        throw new Error("No tienes permisos");
      }

      let rbody = req.body;

      let newAdvId = 0;
      const advert = new Advert(req.body);

      await advert.save(function (err: any, adv: any) {
        while (!adv) {}
        newAdvId = adv._id;
        var fs = require("fs");
        var dir = `./public/adverts/${newAdvId}`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        res.send({ id: newAdvId });
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async getAllAdverts(req: any, res: Response) {
    try {
      const adverts = await Advert.find();

      if (!adverts) {
        throw new Error("No se encontraron los anuncios");
      }

      res.send({
        adverts: adverts,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
  public async getAdvert(req: any, res: Response) {
    try {
      const advertId = req.params.id;
      const advert = await Advert.findOne({
        _id: advertId,
      });

      if (!advert) {
        throw new Error("No se encontró el anuncio");
      }

      res.send({
        advert: advert,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async upload(req: any, res: Response) {
    try {
      const id = req.params.id;
      let file = req["files"].thumbnail;

      file.mv("public/adverts/" + id + "/" + file.name);
      // Validate user inputs
      if (!file) {
        throw new Error("La imagen no es válida.");
      }
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async finish(req: any, res: Response) {
    try {
      const id = req.params.id;

      const filter = { _id: id };
      const update = { final_date: new Date() };

      let advert = await Advert.findOneAndUpdate(filter, update);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async delete(req: any, res: Response) {
    try {
      const id = req.params.id;
      await Advert.deleteMany({ _id: id });

      await Chat.deleteMany({ advert_id: id });
      res.send({
        status: "ok",
      });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default AdvertController;
