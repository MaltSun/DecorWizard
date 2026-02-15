// src/config/prisma.js
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'], // для дебага
});

export default prisma;