import { Request, Response } from "express";
import { Truck } from '../models/truck';
import * as service from './services/truck';

export async function saveOrUpdate(req: Request, res: Response) {
  const { body } = req;
  const truck = await service.saveOrUpdate(body);
  res.send(truck);
}

export async function search(req: Request, res: Response) {
  const { affiliateId  } = req.query;
  const trucks = await Truck.find({ where: { affiliate: { id: affiliateId } } });
  res.send(trucks);
}

export async function setActive(req: Request, res: Response) {
  const { active, ids } = req.body;
  const trucks = await Truck.findByIds(ids);
  for (const truck of trucks) {
    truck.active = active;
    await truck.save();
  }
  res.send({ message: 'ok' });
}
