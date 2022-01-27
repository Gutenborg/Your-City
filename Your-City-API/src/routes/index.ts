import { Router } from 'express';
import businessRoute from './business';
import cityRoute from './city';
import seatRoute from './seat';
import userRoute from './user';

export type RouteEndPoints = '/business' | '/city' | '/users' | '/seat';

const routes: Record<RouteEndPoints, Router> = {
  '/business': businessRoute,
  '/city': cityRoute,
  '/users': userRoute,
  '/seat': seatRoute,
};

export default routes;
