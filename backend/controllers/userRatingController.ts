import { Request, Response } from "express";
import User from "../models/UserSchema";
import UserRating from "../models/UserRatingSchema";
import Utilities from "../utilities/utilities";

class UserRatingController {
  public async rateUser(req: any, res: Response) {
    try {
      // User has to be logged in
      let { tokenPayload } = req.body;
      if (!tokenPayload || !tokenPayload._id) {
        throw new Error("No tienes permisos");
      }

      const userId = req.params.id;
      if (!userId) {
        throw new Error("No se ha proporcionado el id del usuario");
      }

      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("El usuario no existe");
      }

      let rbody  = req.body;
      
      console.log(rbody)
      const userRating = new UserRating(req.body);
      await userRating.save();

    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
  
  public async getRatesUser(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const userRatings = await UserRating.find({
        user_id: userId,
      });

      if (!userRatings) {
        throw new Error("No hay ratings");
      }

      res.send({
        racketRatings: userRatings,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default UserRatingController;
