import { Request, Response } from 'express';
import { Affiliate } from '../models/affiliate';
import { User } from '../models/user';

export async function findById(req: Request, res: Response) {
  const { id } = req.params;
  res.send(await Affiliate.findOne(id));
}

export async function saveOrUpdate(req: Request, res: Response) {
  const { body } = req;
  let affiliate;
  if (!body.id) {
    affiliate = new Affiliate();
    const user = new User(body.username, body.initialPassword);
    await user.save();
    affiliate.user = user;
  } else {
    affiliate = await Affiliate.findOne(body.id);
  }
  affiliate.set(body);
  await affiliate.save();
  res.status(200).send(affiliate);
}


export async function findAll(req: Request, res: Response) {
  res.send(await Affiliate.find({ relations: ['user'] }));
}
