import { Affiliate } from '../../models/affiliate';
import { TruckDriver } from '../../models/truck-driver';
import { User } from '../../models/user';

export async function saveOrUpdate(body: any) {
  let truckDriver = await TruckDriver.findOne({ where: { id: body.id } });
  if (!truckDriver) {
    truckDriver = new TruckDriver();
    const user = new User(body.username, body.initialPassword);
    await user.save();
    truckDriver.user = user;
    truckDriver.affiliate = await Affiliate.findOne(body.affiliateId);
  }
  truckDriver.name = body.name;
  await truckDriver.save();
  return truckDriver;
}