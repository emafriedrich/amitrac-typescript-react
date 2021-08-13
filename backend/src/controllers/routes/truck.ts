import { Router } from 'express';
import { search, saveOrUpdate } from '../truck';

export default () => {
  const router = Router();
  router.post('/', saveOrUpdate);
  router.get('/search', search);
  return router;
};