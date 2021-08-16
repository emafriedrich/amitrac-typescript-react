import { Request, Response } from "express";
import * as service from './services/truckDriver';

export async function saveOrUpdate(req: Request, res: Response) {
  const { body } = req;
  const truck = await service.saveOrUpdate(body);
  res.send(truck);
}
