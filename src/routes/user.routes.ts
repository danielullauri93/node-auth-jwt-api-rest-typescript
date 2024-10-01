import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/users.controller";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

// MIDDLEWARE de JWT para ver si estamos autenticados
// se usa el next: para que una vez haga lo correcto pase al next o siguiente paso
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "No se ha proporcionado un token de autenticación" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
  });

  next();
};

router.post('/', authenticateToken, createUser)
router.get('/', authenticateToken, getAllUsers)
router.get('/:id', authenticateToken, getUserById)
router.put('/:id', authenticateToken, updateUser)
router.delete('/:id', authenticateToken,deleteUser)

export default router;
