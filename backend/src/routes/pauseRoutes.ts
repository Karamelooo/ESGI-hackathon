import { Router } from "express";
import{
    createPause,
    getAllPauses,
    getPauseById,
    updatePause,
    deletePause
} from "../controllers/pauseController";

const router = Router();

router.post("/pauses", createPause);
router.get("/pauses", getAllPauses);
router.get("/pauses/:id", getPauseById);
router.put("/pauses/:id", updatePause);
router.delete("/pauses/:id", deletePause);

export default router;