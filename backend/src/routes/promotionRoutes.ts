import express from "express";
import {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
} from "../controllers/promotionController";

const router = express.Router();

router.post("/promotions", createPromotion);
router.get("/promotions", getAllPromotions);
router.get("/promotions/:id", getPromotionById);
router.put("/promotions/:id", updatePromotion);
router.delete("/promotions/:id", deletePromotion);

export default router;
