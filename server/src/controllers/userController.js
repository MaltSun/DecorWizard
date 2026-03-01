import { prisma } from '../config/prisma.js';

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, phone: true, bakeryName: true, role: true },
    });
    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, bakeryName } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, phone, bakeryName },
    });

    res.json(updated);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.status(204).send();
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};