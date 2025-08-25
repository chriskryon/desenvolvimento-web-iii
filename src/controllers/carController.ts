import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createCar = async (req: Request, res: Response) => {
  try {
    const { modelo, ano } = req.body;
    const carro = await prisma.carro.create({
      data: { modelo, ano }
    });
    res.status(201).json(carro);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar carro', details: error });
  }
};

export const getAllCars = async (_req: Request, res: Response) => {
  try {
    const carros = await prisma.carro.findMany();
    res.json(carros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar carros', details: error });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carro = await prisma.carro.findUnique({ where: { id: Number(id) } });
    if (!carro) return res.status(404).json({ error: 'Carro não encontrado' });
    res.json(carro);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar carro', details: error });
  }
};

export const updateCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { modelo, ano } = req.body;
    const carro = await prisma.carro.update({
      where: { id: Number(id) },
      data: { modelo, ano }
    });
    res.json(carro);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar carro', details: error });
  }
};

export const deleteCarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.carro.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir carro', details: error });
  }
};
