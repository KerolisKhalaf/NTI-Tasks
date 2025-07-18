const express = require("express");
const router = express.Router();
const {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard
} = require("./card.controller");

router.post("/", createCard);
router.get("/", getAllCards);
router.get("/:id", getCardById);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;
