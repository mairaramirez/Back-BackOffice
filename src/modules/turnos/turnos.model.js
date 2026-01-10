import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema(
  {
    turnoNumber: {
      type: Number,
      required: true,
      unique: true
    },
    clientNumber: {
      type: Number,
      required: true,
      index: true
    },
    oficio: {
      type: String,
      required: true
    },
    fecha: {
      type: String,
      required: true
    },
    hora: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pendiente', 'confirmado', 'cancelado'],
      default: 'pendiente'
    },
    notas: String
  },
  { timestamps: true }
);

export const TurnoModel = mongoose.model('Turno', turnoSchema);
