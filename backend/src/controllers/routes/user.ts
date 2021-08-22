import { Router } from 'express';
import { changePassword, changePasswordAdmin, login, register } from '../user';

export default () => {
  const router = Router();
  router.post('/', register);
  router.post('/login', login);
  router.put('/changePassword', changePassword);
  router.put('/changePasswordAdmin', changePasswordAdmin);
  return router;
};