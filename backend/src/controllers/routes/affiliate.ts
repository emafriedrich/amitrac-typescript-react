import { Router } from 'express';
import { findAll, findById, saveOrUpdate } from '../affiliate';

export default () => {
  const router = Router();
  router.post('/', saveOrUpdate);
  router.get('/:id', findById);
  router.get('/', findAll);
  return router;
};