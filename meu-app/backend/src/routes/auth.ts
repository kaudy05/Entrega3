import { Router } from 'express';
import { initDB } from '../database/database';

const router = Router();

// cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, username, password } = req.body;

  const db = await initDB();

  await db.run(
    'INSERT INTO user (nome, username, password, perfil_id) VALUES (?, ?, ?, ?)',
    [nome, username, password, 1]
  );

  res.json({ message: 'Usuário criado' });
});

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const db = await initDB();

  const user = await db.get(
    'SELECT * FROM user WHERE username = ? AND password = ?',
    [username, password]
  );

  if (!user) {
    return res.status(401).json({ error: 'Login inválido' });
  }

  res.json(user);
});

export default router;