import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDB = async () => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await db.exec('PRAGMA foreign_keys = ON;');

  // TABELAS
  await db.exec(`
    CREATE TABLE IF NOT EXISTS perfil (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT
    );

    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      username TEXT,
      password TEXT,
      perfil_id INTEGER,
      FOREIGN KEY (perfil_id) REFERENCES perfil(id)
    );

    CREATE TABLE IF NOT EXISTS noticia (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      resumo TEXT,
      texto TEXT,
      autor_id INTEGER,
      status TEXT,
      FOREIGN KEY (autor_id) REFERENCES user(id)
    );

    CREATE TABLE IF NOT EXISTS comentario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      texto TEXT,
      usuario_id INTEGER,
      noticia_id INTEGER,
      FOREIGN KEY (usuario_id) REFERENCES user(id),
      FOREIGN KEY (noticia_id) REFERENCES noticia(id)
    );

    CREATE TABLE IF NOT EXISTS tag (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT
    );
  `);

  // Insert default perfil if not exists
  await db.run('INSERT OR IGNORE INTO perfil (id, nome) VALUES (1, "Usuário")');

  return db;
};