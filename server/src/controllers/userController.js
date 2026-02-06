import {  config } from '../config/index.js';    

export const getProfile = async (req, res) => {
  const user = await config.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, name: true, phone: true, bakeryName: true, role: true },
  });
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { name, phone, bakeryName } = req.body;

  const updated = await config.user.update({
    where: { id: req.user.id },
    data: { name, phone, bakeryName },
  });

  res.json(updated);
};

export const deleteProfile = async (req, res) => {
  await config.user.delete({ where: { id: req.user.id } });
  res.status(204).send();
};