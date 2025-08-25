import { Router } from 'express';
import { createCar, getAllCars, getCarById, updateCarById, deleteCarById } from '../controllers/carController';

const router = Router();

router.post('/', createCar);
router.get('/', getAllCars);
router.get('/:id', getCarById);
router.put('/:id', updateCarById);
router.delete('/:id', deleteCarById);

export default router;
