import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  static userRegistration = async (req, res) => {
    // name,
    //   email,
    //   password,
    //   passwordConfirmation,
    const { name, email, password, passwordConfirmation } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (name && email && password && passwordConfirmation) {

        if (password == passwordConfirmation) {
          try {
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = await new UserModel({
              name: name,
              email: email,
              password: hashPassword,
            });
            await doc.save();
            res.status(201).send({
              status: "success",
              message: "registration successfull",
            });
          } catch (error) {
            res.send({
              status: "failed",
              message: "password and confirm password do not match",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "password and confirm password do not match",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "all fields are required",
        });
      }
    }
  };

  static userLogin = async (req, res) => {

    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email == email && isMatch) {
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "success",
              token: token,
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "not registered email",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "all fields are required",
        });
      }
    } catch (error) {
      res.send({
        status: "failed",
        message: "unable to login",
      });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, passwordConfirmation } = req.body;
    if (password && passwordConfirmation) {
      if (password !== passwordConfirmation) {
        res.send({
          status: "failed",
          message: "New Password and Confirm New Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "success",
          message: "Password changed succesfully",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  };
}
