import { Router } from 'express';
import { initDB } from '../database/database';

const router = Router();

// criar
router.post('/', async (req, res) => {
  const { titulo, resumo, texto } = req.body;

  const db = await initDB();

  await db.run(
    'INSERT INTO noticia (titulo, resumo, texto, status) VALUES (?, ?, ?, ?)',
    [titulo, resumo, texto, 'RASCUNHO']
  );

  res.json({ message: 'Notícia criada' });
});

// listar
router.get('/', async (req, res) => {
  const db = await initDB();

  const noticias = await db.all('SELECT * FROM noticia');

  res.json(noticias);
});

// editar
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, resumo, texto } = req.body;

  const db = await initDB();

  await db.run(
    'UPDATE noticia SET titulo=?, resumo=?, texto=? WHERE id=?',
    [titulo, resumo, texto, id]
  );

  res.json({ message: 'Atualizado' });
});

// deletar
router.delete('/:id', async (req, res) => {
  const db = await initDB();

  await db.run('DELETE FROM noticia WHERE id=?', [req.params.id]);

  res.json({ message: 'Deletado' });
});

export default router;