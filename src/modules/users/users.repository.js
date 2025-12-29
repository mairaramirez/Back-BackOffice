// Manejan la persistencia

// src/modules/users/users.repository.js
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.resolve('src/storage/users.json');

/**
 * Lee el archivo users.json y devuelve un array
 */
async function readFile() {
  const data = await fs.readFile(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

/**
 * Escribe el array completo en users.json
 */
async function writeFile(users) {
  await fs.writeFile(
    USERS_FILE,
    JSON.stringify(users, null, 2),
    'utf-8'
  );
}

/**
 * Devuelve todos los usuarios
 */
export async function findAll() {
  return await readFile();
}

/**
 * Busca usuario por ID
 */
export async function findById(id) {
  const users = await readFile();
  return users.find(u => u.id === id);
}

/**
 * Busca usuario por documento (DNI / CI / LC)
 */
export async function findByDocumento(documento) {
  const users = await readFile();
  return users.find(u => u.documento === documento);
}

/**
 * Crea un nuevo usuario
 */
export async function create(user) {
  const users = await readFile();
  users.push(user);
  await writeFile(users);
  return user;
}

/**
 * Actualiza parcialmente un usuario
 */
export async function update(id, partial) {
  const users = await readFile();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...partial,
    updatedAt: new Date().toISOString()
  };

  await writeFile(users);
  return users[index];
}
