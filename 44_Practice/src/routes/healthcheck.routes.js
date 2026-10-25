import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";
import app from "../app.js";

const router = Router();

router.route("/").get(healthCheck);

export default router;
