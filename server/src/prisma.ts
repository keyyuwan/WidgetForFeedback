import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'], // a cada query realizada, vai loggar a operação
})
