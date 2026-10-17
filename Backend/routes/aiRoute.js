import express from "express";
import analyzeSubmission from "../controllers/aiControllers.js";


const aiRouter = express.Router();

aiRouter.post("/analyze",analyzeSubmission);

export default aiRouter;