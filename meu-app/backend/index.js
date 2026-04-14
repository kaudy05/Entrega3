const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

const SECRET = 'chave_super_secreta';

let users = [];
let noticias = [];

// ================= CADASTRO =================
app.post('/api/auth/cadastro', (req, res) => {
  try {
    const { nome, username, password } = req.body;

    if (!nome || !username || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const exists = users.find(u => u.username === username);

    if (exists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    users.push({ id: Date.now(), nome, username, password });

    return res.json({ message: 'Usuário criado com sucesso 🔥' });

  } catch (err) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

// ================= LOGIN =================
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: 'Login inválido' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'Login OK 🔥',
      token
    });

  } catch (err) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

// ================= NOTÍCIAS =================
app.post('/api/noticias', (req, res) => {
  try {
    const { titulo, resumo, texto } = req.body;

    if (!titulo || !resumo || !texto) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const nova = {
      id: Date.now(),
      titulo,
      resumo,
      texto
    };

    noticias.push(nova);

    return res.json({
      message: 'Notícia criada com sucesso 🔥',
      noticia: nova
    });

  } catch (err) {
    return res.status(500).json({ message: 'Erro interno' });
  }
});

// ================= LISTAR =================
app.get('/api/noticias', (req, res) => {
  return res.json(noticias);
});

// ================= SERVER =================
app.listen(3000, '0.0.0.0', () => {
  console.log('🔥 Backend rodando na porta 3000');
});