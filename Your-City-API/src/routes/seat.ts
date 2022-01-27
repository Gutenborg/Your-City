import { Router } from 'express';
import { createSeat, deleteSeat, editSeat, getSeatById, getSeats } from '../controller/seat';
import { verifyUser } from '../controller/user';

const seatRouter = Router();

seatRouter.get('/', verifyUser(), getSeats);

seatRouter.get('/:id', verifyUser(), getSeatById);

seatRouter.post('/', verifyUser(/* 'admin' */), createSeat);

seatRouter.put('/:id', verifyUser(/* 'admin' */), editSeat);

seatRouter.delete('/:id', verifyUser('admin'), deleteSeat);

export default seatRouter;
