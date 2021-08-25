import { Router } from 'express';
import { search, saveOrUpdate, setActive, changePhoto } from '../truck';

export default () => {
  const router = Router();
  router.post('/', saveOrUpdate);
  router.get('/search', search);
  router.post('/setActive', setActive);
  router.post('/changePhoto', changePhoto);
  return router;
};