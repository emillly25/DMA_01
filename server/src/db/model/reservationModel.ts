import { model } from 'mongoose';
import { ReservationSchema } from '../schemas/reservationSchema';

interface ReservationFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  school: string;
  grade: string;
  question?: string;
}
const Reservation = model<ReservationFormData>(
  'reservation',
  ReservationSchema,
);

export class ReservationModel {
  async createReservation(
    reservation: ReservationFormData,
  ): Promise<ReservationFormData | null> {
    return await Reservation.create(reservation);
  }
}

const reservationModel = new ReservationModel();
export { reservationModel };
