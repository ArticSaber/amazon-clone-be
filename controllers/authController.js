import authSchema from "../models/authSchema.js";
import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, jwtGenrator } from "../utils/index.js";

const authSignup = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new badRequest("Email and Password is required");
    }
    const data = await authSchema.create(req.body);
    if (!data) throw new badRequest("data not found");
    res.status(StatusCodes.CREATED).json({ message: "user Created" });
  } catch (error) {
    next(error);
  }
};

const authlogin = async (req, res, next) => {
  try {
    if (!req.body.email && !req.body.password) {
      throw new badRequest("Email and Password is required");
    }
    const data = await authSchema.findOne({ email: req.body.email });
    if (!data) {
      throw new badRequest("data not found");
    }
    const isMatch = await comparePassword(req.body.password, data.password);
    if (!isMatch) {
      throw new badRequest("Password is not correct");
    }
    const token = jwtGenrator({ payload: { id: data._id, role: data.role } });
    res.cookie(
      "token",
      token,
      { httpOnly: true },
      { maxAge: 1000 * 60 * 60 * 24 }
    );
    res.status(StatusCodes.OK).json({
      message: "user Found",
      userId: data._id,
      userName: data.username,
    });
  } catch (error) {
    next(error);
  }
};

const authpasswordreset = async (req, res, next) => {
  try {
    if (!req.body.email && !req.body.password && !req.body.newPassword) {
      throw new badRequest("Email and Password is required");
    }
    const data = await authSchema.findOne({ email: req.body.email });
    if (!data) {
      throw new badRequest("data not found");
    }
    const isMatch = await comparePassword(req.body.password, data.password);
    if (!isMatch) {
      throw new badRequest("Password is not correct");
    }
    const newpassword = await authSchema.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newPassword },
      { new: true }
    );
    newpassword.save();
    res.status(StatusCodes.OK).json({ message: "Password Updated" });
  } catch (error) {
    next(error);
  }
};

const authlogout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(StatusCodes.OK).json({ message: "user logout" });
    } catch (error) {
        next(error);
    }
};
    
export { authSignup, authlogin, authpasswordreset, authlogout };