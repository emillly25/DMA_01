import { Request, Response, NextFunction } from 'express';
import { reservationModel } from '../db';

class ReservationController {
  async createReservation(req: Request, res: Response, next: NextFunction) {
    try {
      const reservationData = req.body;

      const result = await reservationModel.createReservation(reservationData);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  }
}

const reservationController = new ReservationController();
export { reservationController };
