import { Router } from 'express';
import { saveOrUpdate, setActive } from '../truckDriver';

export default () => {
  const router = Router();
  router.post('/', saveOrUpdate);
  router.post('/:id/setActive', setActive);
  return router;
};