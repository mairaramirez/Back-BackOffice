// turnos.service.js
import * as repo from './turnos.repository.js';
import { getNextSequence } from '../counters/counters.repository.js';
import { UserModel } from '../users/users.model.js';

export const getAllTurnos = async () => {
  return await repo.findAll();
};

export const createTurno = async (data) => {
  // 1. Validar que el cliente exista
  const user = await UserModel.findOne({ clientNumber: Number(data.clientNumber) });
  if (!user) {
    throw new Error('Cliente no existe');
  }

  // 2. Generar número de turno
  const turnoNumber = await getNextSequence('turnos');

  return await repo.create( {
    turnoNumber,
    ...data
  });
};


export const getTurnosByClient = async (clientNumber) => {
  // 1️⃣ Validar que el cliente exista
  const user = await UserModel.findOne({ clientNumber });

  if (!user) {
    throw new Error('Cliente no existe');
  }

  // 2️⃣ Buscar turnos del cliente
  const turnos = await repo.findByClientNumber(clientNumber);

  return turnos;
};

export const confirmarTurno = async (turnoNumber) => {
  const turno = await repo.findByTurnoNumber(turnoNumber);

  if (!turno) {
    throw new Error('Turno no existe');
  }

  if (turno.status === 'cancelado') {
    throw new Error('No se puede confirmar un turno cancelado');
  }

  const ocupado = await repo.findConfirmadoBySlot(
    turno.fecha,
    turno.hora
  );

  if (ocupado) {
    throw new Error(
      'Ya existe un turno confirmado para esa fecha y hora'
    );
  }

  turno.status = 'confirmado';
  await turno.save();

  return turno;
};

export const cancelarTurno = async (turnoNumber) => {
  const turno = await repo.findByTurnoNumber(turnoNumber);

  if (!turno) {
    throw new Error('Turno no existe');
  }

  if (turno.status === 'cancelado') {
    throw new Error('El turno ya está cancelado');
  }

  turno.status = 'cancelado';
  await turno.save();

  return turno;
};


