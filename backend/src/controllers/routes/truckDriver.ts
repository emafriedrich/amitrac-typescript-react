import { Router } from 'express';
import { saveOrUpdate } from '../truckDriver';

export default () => {
  const router = Router();
  router.post('/', saveOrUpdate);
  return router;
};