import express from "express";
import * as loliControllers from "../controllers/loliControllers";
import authenticateToken from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/loli", loliControllers.getLoli);
router.post("/loli", loliControllers.createNewLoli);
router.put("/loli/:id", loliControllers.updateLoli);
router.delete("/loli/:id", loliControllers.deleteLoli);

export default router;