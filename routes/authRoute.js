import Express from "express";
import {
  authSignup,
  authlogin,
  authpasswordreset,
} from "../controllers/authController.js";

const authrouter = Express.Router();

authrouter.route("/signup").post(authSignup);
authrouter.route("/login").post(authlogin);
authrouter.route("/password-reset").patch(authpasswordreset);

export default authrouter;
