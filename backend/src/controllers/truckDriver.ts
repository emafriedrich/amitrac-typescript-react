import { Request, Response } from "express";
import { TruckDriver } from '../models/truck-driver';
import * as service from './services/truckDriver';

export async function saveOrUpdate(req: Request, res: Response) {
  const { body } = req;
  const truckDriver = await service.saveOrUpdate(body);
  res.send(truckDriver);
}

export async function setActive(req: Request, res: Response) {
  const { active, id } = req.body;
  const truckDriver = await TruckDriver.findOne(id);
  truckDriver.active = active;
  await truckDriver.save();
  res.send({ message: 'ok' });
}
