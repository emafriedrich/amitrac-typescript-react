import { Request, Response } from 'express';
import { Affiliate } from '../models/affiliate';
import { User } from '../models/user';

export async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const affiliate = await Affiliate.findOne(id);
  removeInactiveTruckDrivers(affiliate);
  removeInactiveTrucks(affiliate);
  res.send(affiliate);
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
  const affiliates = await Affiliate.find({ relations: ['user'], order: { companyName: 'ASC' } });
  res.send(affiliates);
}

function removeInactiveTruckDrivers(affiliate: Affiliate) {
  affiliate.truckDrivers = affiliate.truckDrivers.filter(truckDriver => truckDriver.active);
}

function removeInactiveTrucks(affiliate: Affiliate) {
  affiliate.trucks = affiliate.trucks.filter(truck => truck.active);
}

