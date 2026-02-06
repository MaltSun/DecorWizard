import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const register = async (req, res) => {
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

  const existing = await config.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Пользователь уже существует" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await config.user.create({
    data: {
      email,
      passwordHash,
      name,
      role,
      phone,
      bakeryName: role === "OWNER" ? bakeryName : null,
    },
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({
    token,
    user: { id: user.id, email: user.email, role: user.role, name: user.name },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await config.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Неверный email или пароль" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role, name: user.name },
  });
};
