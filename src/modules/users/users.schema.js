import Joi from 'joi';

export const createUserSchema = Joi.object({
  nombre: Joi.string().min(2).required(),
  apellido: Joi.string().required(),
  documento: Joi.string().pattern(/^\d+$/).required(),
  telefono: Joi.string().required(),
  email: Joi.string().email().required(),
  direccion: Joi.string().required()
});

export const updateUserSchema = Joi.object({
  nombre: Joi.string().min(2).optional(),
  apellido: Joi.string().optional(),
  documento: Joi.string().pattern(/^\d+$/).optional(),
  telefono: Joi.string().optional(),
  email: Joi.string().email().optional(),
  direccion: Joi.string().optional()
});
