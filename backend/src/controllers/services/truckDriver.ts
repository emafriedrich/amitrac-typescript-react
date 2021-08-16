import { Affiliate } from '../../models/affiliate';
import { TruckDriver } from '../../models/truck-driver';
import { User } from '../../models/user';

export async function saveOrUpdate(body: any) {
  let truckDriver = await TruckDriver.findOne(body.id);
  if (!truckDriver) {
    truckDriver = new TruckDriver();
  }
  truckDriver.name = body.name;
  const user = new User(body.username, body.initialPassword);
  await user.save();
  truckDriver.user = user;
  truckDriver.affiliate = await Affiliate.findOne(body.affiliateId);
  await truckDriver.save();
  return truckDriver;
}