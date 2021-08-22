import * as express from 'express';
import affiliate from './affiliate';
import truck from './truck';
import truckDriver from './truckDriver';
import upload from './upload';
import user from './user';

export default () => {
  const router = express.Router();
  router.use('/users', user());
  router.use('/trucks', truck());
  router.use('/truckDrivers', truckDriver());
  router.use('/affiliates', affiliate());
  router.use('/upload', upload());
  router.get('/ping', (req, res) => res.send('pong'));
  return router;
};