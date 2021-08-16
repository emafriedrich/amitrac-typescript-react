import { Request, Response } from 'express';
import { Affiliate } from '../models/affiliate';

export async function findById(req: Request, res: Response) {
  const { id } = req.params;
  res.send(await Affiliate.findOne(id));
}

export async function saveOrUpdate(req: Request, res: Response) {
  const { body } = req;
  let affiliate = await Affiliate.findOne(req.body.id);
  if (!affiliate) {
    affiliate = new Affiliate();
  }
  affiliate.set(body);
  await affiliate.save();
  res.status(200).send(affiliate);
}


export async function findAll(req: Request, res: Response) {
  res.send(await Affiliate.find());
}
