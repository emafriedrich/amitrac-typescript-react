import { Request, Response } from 'express';
import { User } from '../models/user';

export async function register(req: Request, res: Response) {
  const { name, password } = req.body;
  const user = new User(name, password);
  await user.save();
  res.status(201).send({ status: 201, message: 'User was created' });
}

export async function login(req: Request, res: Response) {
  const { name, password } = req.body;
  const user = await User.findOneOrFail({ name });

  const ok = user.comparePassword(password);
  res.status(ok ? 200 : 401).send(ok ? {
    credential: user.credentialNumber()
  } : null);
}

export async function changePassword(req: Request, res: Response) {
  const { name, password, newPassword } = req.body;
  const user = await User.findOneOrFail({ name });
  const userAndPasswordOk = user.comparePassword(password);
  if (userAndPasswordOk) {
    user.changePassword(newPassword);
    await user.save();
    res.send({ message: 'The password was changed' });
  } else {
    res.status(403).send({ message: "The user and password doesn't match" });
  }
}
