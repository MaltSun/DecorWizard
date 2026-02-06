import { config } from "../config/index.js";

export const getAllCatalog = async (req, res) => {
  const items = await config.catalog.findMany();
  res.json(items);
};

export const getCatalogItem = async (req, res) => {
  const { id } = req.params;
  const item = await config.catalog.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: "Товар не найден" });
  res.json(item);
};

export const createCatalogItem = async (req, res) => {
  if (req.user.role !== "OWNER")
    return res.status(403).json({ error: "Только владелец" });

  const {
    name,
    description,
    image,
    price,
    composition,
    kcal,
    protein,
    fats,
    carbs,
  } = req.body;

  const newItem = await config.catalog.create({
    data: {
      name,
      description,
      image,
      price,
      composition,
      kcal,
      protein,
      fats,
      carbs,
    },
  });

  res.status(201).json(newItem);
};

export const deleteCatalogItem = async (req, res) => {
  if (req.user.role !== "OWNER")
    return res.status(403).json({ error: "Только владелец" });

  const { id } = req.params;
  await config.catalog.delete({ where: { id } });
  res.status(204).send();
};
