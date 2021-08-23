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
  const { active, id } = req.body;
  const truckDriver = await Truck.findOne(id);
  truckDriver.active = active;
  await truckDriver.save();
  res.send({ message: 'ok' });
}
