import { copyFileSync } from 'fs';
import { Affiliate } from '../../models/affiliate';
import { Truck } from '../../models/truck';

export async function saveOrUpdate(body: any) {
  let truck = await Truck.findOne(body.id);
  if (!truck) {
    truck = new Truck();
  }
  truck.patent = body.patent;
  truck.brand = body.brand;
  truck.vtvExpiration = new Date(body.vtvExpiration);
  truck.assuranceExpiration = new Date(body.assuranceExpiration);
  truck.patentExpiration = new Date(body.patentExpiration);
  const publicPath = process.env.PUBLIC_PATH_IMAGES + '/' + body.truckImage.split('/')[2];
  copyFileSync(body.truckImage, publicPath);
  truck.truckImage = '/img/' + publicPath.split('/')[publicPath.split('/').length - 1];
  truck.affiliate = await Affiliate.findOne(body.affiliateId);
  await truck.save();
  return truck;
}