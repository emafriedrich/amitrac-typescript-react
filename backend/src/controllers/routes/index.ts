import * as express from 'express';
import affiliate from './affiliate';
import truck from './truck';
import user from './user';

export default () => {
  const router = express.Router();
  router.use('/users', user());
  router.use('/trucks', truck());
  router.use('/affiliates', affiliate());
  router.get('/ping', (req, res) => res.send('pong'));
  return router;
};