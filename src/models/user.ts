// Modelo de usuario usando prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma.user;
