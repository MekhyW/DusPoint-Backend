import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = (req: Request, res: Response) => {
  const { clientId } = req.body;
  if (!clientId) return res.status(400).json({ error: 'Client ID required' });

  const token = jwt.sign({ clientId }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, ticket_type, is_administrator, online_status, friends_list } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        ticket_type,
        is_administrator,
        online_status,
        friends_list,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      console.log(req.body.user);
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving user' });
    }
  };

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, ticket_type, is_administrator, online_status, friends_list } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        email,
        ticket_type,
        is_administrator,
        online_status,
        friends_list,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
