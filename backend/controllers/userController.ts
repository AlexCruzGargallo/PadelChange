import { Request, Response } from "express";
import bcrypt, { hash } from "bcrypt";
import Utilities from "../utilities/utilities";
import User from "../models/UserSchema";
import Jwt from "../utilities/jwt";

class UserController {
  public async register(req: Request, res: Response) {
    try {
      let { name, email, password } = req.body;

      // Parse First and Lastname
      let parsedname = (name as string).toLowerCase();
      name = Utilities.capitalizeFirstLetter(parsedname);

      // Validate user inputs
      if (!Utilities.emailValidation(email)) {
        throw new Error("El correo electrónico no es válido.");
      }

      if (!Utilities.passwordValidation(password)) {
        throw new Error("La contraseña no es válida.");
      }

      if (!Utilities.nameValidation(name)) {
        throw new Error("El nombre no es válido.");
      }
      req.body.name = name;

      // Hash the user password
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;

      // Create Mongoose object
      const user = new User(req.body);
      await user.save();
      console.log(`User has been created`, user);

      let aux = JSON.parse(JSON.stringify(user));
      delete aux.__v;
      delete aux.password;
      const accessToken = Jwt.sign(aux);
      delete aux._id;

      const registerPayload = {
        payload: {
          user: user,
          accessToken: accessToken,
        },
      };

      res.send(registerPayload);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      let { email, password } = req.body;

      if (!Utilities.emailValidation(email)) {
        throw new Error("El correo electrónico no es válido.");
      }

      if (!Utilities.passwordValidation(password)) {
        throw new Error("La contraseña no es válida.");
      }

      let user = await User.findOne({ email: email }).select("-__v");

      if (!user) {
        throw new Error("El usuario no existe.");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("La contraseña del usuario es incorrecta.");
      }

      let aux = JSON.parse(JSON.stringify(user));
      delete aux.password;
      const accessToken = Jwt.sign(aux);

      const registerPayload = {
        payload: {
          user: aux,
          accessToken: accessToken,
        },
      };

      res.send(registerPayload);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }
  public async upload(req: any, res: Response) {
    try {
      console.log("Uploading file...");
      console.log(req.body);
      console.log(req.file);
      let file = req["files"].thumbnail;

      console.log("File uploaded: ", file.name);

      file.mv("public/imgs/" + file.name);
      // Validate user inputs
      if (!file) {
        throw new Error("La imagen no es válida.");
      }

      const userId = req.tokenPayload._id;
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("El usuario no existe.");
      }
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }
  public async getUserData(req: any, res: Response) {
    try {
      const userId = req.params.id;
      console.log(userId)
      const user = await User.findOne({
        _id: userId,
      });

      if (!user) {
        throw new Error("No se encontró el usuario");
      }

      res.send({
        user: user,
      });
    } catch (err: any) {
      console.error(err);
      res.status(400).send(err);
    }
  }
  public async update(req: any, res: Response) {
    try {
      const body = req.body;
      let { image, name, email } = body;
      const { tokenPayload } = body;
      console.log(body);
      if (!tokenPayload || !tokenPayload._id) {
        res.status(400).send("sin token");
        return;
      }

      const user = await User.findOne({ _id: tokenPayload._id });

      if (image) {
        user.image = image;
      }

      if (name) {
        let parsedFirstName = (name as string).toLowerCase();
        parsedFirstName = Utilities.capitalizeFirstLetter(parsedFirstName);

        if (!Utilities.nameValidation(parsedFirstName)) {
          throw new Error("El nombre no es válido.");
        }

        user.name = parsedFirstName;
      }

      if (email) {
        // Validate user inputs
        if (!Utilities.emailValidation(email)) {
          throw new Error("El correo electrónico no es válido.");
        }

        user.email = email;
      }

      // Save Mongoose object
      await user.save();

      console.log(`User has been modified`, user);
    } catch (err: any) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}

export default UserController;
