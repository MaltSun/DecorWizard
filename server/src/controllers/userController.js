import { prisma } from "../config/prisma.js";

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        bakeryName: true,
        role: true,
      },
    });
    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { name, phone, bakeryName } = req.body;
//     const userId = req.user.id; // Берем из middleware авторизации

//     const updated = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         name: name || undefined,
//         phone: phone || undefined,
//         bakeryName: bakeryName || undefined
//       },
//     });

//     // Убираем пароль из ответа для безопасности
//     const { password, ...userWithoutPassword } = updated;
//     res.json(userWithoutPassword);
//   } catch (error) {
//     console.error("Update profile error:", error);
//     res.status(500).json({ error: "Не удалось обновить профиль" });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, bakeryName } = req.body;
    const userId = req.user.id; 

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
        bakeryName, 
      },
    });

    res.json(updated);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Internal server error" });
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
