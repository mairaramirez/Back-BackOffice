// API pública 

// src/modules/users/users.routes.js

import { Router } from 'express';
import * as usersController from './users.controller.js';

const router = Router();

// GET /users
router.get('/', usersController.getAll);

// GET /users/:id
router.get('/:id', usersController.getById);

// POST /users
router.post('/', usersController.create);

// PUT /users/:id
router.put('/:id', usersController.update);

// DELETE /users/:id
router.delete('/:id', usersController.remove);

export default router;
