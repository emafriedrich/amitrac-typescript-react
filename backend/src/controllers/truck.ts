import { Request, Response } from "express";
import { copyFileSync } from 'fs';
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
  const truck = await Truck.findOne(id);
  truck.active = active;
  await truck.save();
  res.send({ message: 'ok' });
}

export async function changePhoto(req: Request, res: Response) {
  const { image, id } = req.body;
  const truck = await Truck.findOne(id);
  const publicPath = process.env.PUBLIC_PATH_IMAGES + '/' + image.split('/')[2];
  copyFileSync(image, publicPath);
  truck.truckImage = '/img/' + publicPath.split('/')[publicPath.split('/').length - 1];
  await truck.save();
  res.send(truck);
}
