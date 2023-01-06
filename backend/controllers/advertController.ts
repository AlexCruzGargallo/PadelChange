import { Request, Response } from "express";
import Advert from "../models/AdvertSchema";
import User from "../models/UserSchema";

class AdvertController {
  public async createAdvert(req: any, res: Response) {
    try {
      console.log("aaaaa");
      console.log(req.body);
      console.log("aaaaa");
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
      console.log(tokenPayload);
      if (!tokenPayload || !tokenPayload._id) {
        throw new Error("No tienes permisos");
      }

      let rbody = req.body;
      console.log(rbody);

      const advert = new Advert(req.body);
      await advert.save();
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default AdvertController;
