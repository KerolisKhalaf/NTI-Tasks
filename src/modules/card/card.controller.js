const Card = require("../../../db/models/card.model");

exports.createCard = async (req, res) => {
  try {
    const { title, description, price, image, owner } = req.body;
    const card = await Card.create({ title, description, price, image, owner });
    res.status(201).json({ message: "Card created", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("owner");
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate("owner");
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { title, description, price, image, owner } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { title, description, price, image, owner },
      { new: true }
    );
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card updated", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
