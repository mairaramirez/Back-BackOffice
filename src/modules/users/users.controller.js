// manejan HTTP

// src/modules/users/users.controller.js

import * as usersService from './users.service.js';

/* GET /users */
export const getAll = (req, res) => {
  const users = usersService.getAllUsers();
  res.json(users);
};

/* GET /users/:id */
export const getById = (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json(user);
};

/* POST /users */
export const create = (req, res) => {
  try {
    const user = usersService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* PUT /users/:id */
export const update = (req, res) => {
  const { id } = req.params;

  try {
    const updated = usersService.updateUser(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* DELETE /users/:id */
export const remove = (req, res) => {
  const { id } = req.params;

  const deleted = usersService.deleteUser(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.status(204).send();
};
