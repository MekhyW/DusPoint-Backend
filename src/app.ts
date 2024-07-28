import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Create a new user
app.post('/users', async (req: Request, res: Response) => {
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
});

// Get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

// Get a user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
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
});

// Update a user by ID
app.put('/users/:id', async (req: Request, res: Response) => {
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
});

// Delete a user by ID
app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
