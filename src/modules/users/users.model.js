// src/modules/users/users.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clientNumber: {
      type: Number,
      unique: true,
      index: true
    },
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String
    },
    documento: {
      type: String
    },
    telefono: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    direccion: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const UserModel = mongoose.model('User', userSchema);
