import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      role = "CUSTOMER",
      phone,
      bakeryName,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }

    // Проверка наличия JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET не установлен в переменных окружения");
      return res.status(500).json({ error: "Ошибка конфигурации сервера" });
    }

    // Валидация role
    const validRoles = ["CUSTOMER", "OWNER"];
    const userRole =
      role &&
      typeof role === "string" &&
      validRoles.includes(role.toUpperCase())
        ? role.toUpperCase()
        : "CUSTOMER";

    // Нормализация email
    const normalizedEmail = email.trim().toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return res.status(409).json({ error: "Пользователь уже существует" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name: name ? name.trim() : null,
        role: userRole,
        phone: phone ? phone.trim() : null,
        bakeryName:
          userRole === "OWNER" ? (bakeryName ? bakeryName.trim() : null) : null,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
    });

    // Более детальная обработка ошибок
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ error: "Пользователь с таким email уже существует" });
    }

    if (error.code === "P2003") {
      return res.status(400).json({ error: "Ошибка валидации данных" });
    }

    res.status(500).json({
      error: "Внутренняя ошибка сервера",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }

    // Проверка наличия JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET не установлен в переменных окружения");
      return res.status(500).json({ error: "Ошибка конфигурации сервера" });
    }

    // Нормализация email для входа
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    res.status(500).json({
      error: "Внутренняя ошибка сервера",
      message:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const test = async (req, res) => {
  res.json({ message: "Logout endpoint is under construction" });
};
