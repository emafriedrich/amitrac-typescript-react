import { Affiliate } from '../../models/affiliate';
import { Truck } from '../../models/truck';

export async function saveOrUpdate(body: any) {
  let truck = await Truck.findOne(body.id);
  if (!truck) {
    truck = new Truck();
  }
  truck.patent = body.patent;
  truck.brand = body.brand;
  truck.vtvExpiration = body.vtvExpiration;
  truck.assuranceExpiration = body.assuranceExpiration;
  truck.patentExpiration = body.patentExpiration;
  truck.affiliate = await Affiliate.findOne(body.affiliateId);
  await truck.save();
  return truck;
}