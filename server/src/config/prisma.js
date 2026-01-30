import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'], // для дебага
});

export default prisma;