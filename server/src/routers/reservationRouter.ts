import { Router } from 'express';
const reservationRouter: Router = Router();
import { reservationController } from '../controllers/reservationController';

reservationRouter.post('/', reservationController.createReservation);

export { reservationRouter };
