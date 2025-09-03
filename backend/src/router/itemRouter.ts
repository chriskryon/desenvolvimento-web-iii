import { Router } from "express";

import {
  getAllItemsController,
  createItemController,
  updateItemController,
  deleteItemController,
} from "../controller/itemController.js";

const router = Router();

router.get("/items", getAllItemsController);
router.post("/items", createItemController);
router.put("/items/:id", updateItemController);
router.delete("/items/:id", deleteItemController);

export default router;
