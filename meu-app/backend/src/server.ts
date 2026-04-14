import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth';
import noticiaRoutes from './routes/noticia';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/noticias', noticiaRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🔥');
});