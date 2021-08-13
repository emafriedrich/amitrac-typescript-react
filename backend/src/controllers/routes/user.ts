import { Router } from 'express';
import { changePassword, login, register } from '../user';

export default () => {
  const router = Router();
  router.post('/', register);
  router.post('/login', login);
  router.put('/changePassword', changePassword);
  return router;
};