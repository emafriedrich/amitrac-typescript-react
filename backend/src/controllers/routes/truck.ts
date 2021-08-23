import { Router } from 'express';
import { search, saveOrUpdate, setActive } from '../truck';

export default () => {
  const router = Router();
  router.post('/', saveOrUpdate);
  router.get('/search', search);
  router.post('/setActive', setActive);
  return router;
};