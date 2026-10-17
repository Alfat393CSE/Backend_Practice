import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { validate } from "../middleware/validator.middleware.js";

const router = Router();

router.route("/register").post(validate, registerUser);

export default router;
