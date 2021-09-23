import { copyFileSync } from 'fs';
import { Affiliate } from '../../models/affiliate';
import { Truck } from '../../models/truck';

export async function saveOrUpdate(body: any) {
  let truck = await Truck.findOne({ where: { id: body.id } });
  if (!truck) {
    truck = new Truck();
    const publicPath = process.env.PUBLIC_PATH_IMAGES + '/' + body.truckImage.split('/')[2];
    copyFileSync(body.truckImage, publicPath);
    truck.truckImage = '/img/' + publicPath.split('/')[publicPath.split('/').length - 1];
  }
  truck.patent = body.patent || truck.patent;
  truck.brand = body.brand || truck.brand;
  if (body.vtvExpiration)
    truck.vtvExpiration = new Date(body.vtvExpiration);
  if (body.assuranceExpiration)
    truck.assuranceExpiration = new Date(body.assuranceExpiration);
  if (body.patentExpiration)
    truck.patentExpiration = new Date(body.patentExpiration);
  if (body.affiliateId)
    truck.affiliate = await Affiliate.findOne(body.affiliateId);
  await truck.save();
  return truck;
}