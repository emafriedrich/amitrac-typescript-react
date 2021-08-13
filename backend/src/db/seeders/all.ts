import { Affiliate } from '../../models/affiliate';
import { initDatabase } from '../db'
import * as faker from 'faker';
import { User } from '../../models/user';
import { Truck } from '../../models/truck';
import { TruckDriver } from '../../models/truck-driver';

async function seed() {
  const affiliatesQuantity = 30;
  const affiliates = [];
  for (let index = 0; index < affiliatesQuantity; index++) {
    const user = new User(faker.internet.userName(), faker.internet.password());
    await user.save();
    const affiliate = new Affiliate();
    affiliate.companyName = faker.company.companyName();
    affiliate.cuit = faker.datatype.number(999999999999).toString();
    affiliate.user = user;
    affiliate.credentialNumber = faker.datatype.number(99999999).toString();
    affiliate.credentialExpiration = faker.datatype.datetime();
    await affiliate.save();
    affiliates.push(affiliate);
  }
  for (const affiliate of affiliates) {
    const trucksQuantity = 10;
    for (let index = 0; index < trucksQuantity; index++) {
      const truck = new Truck();
      truck.patent = faker.random.alphaNumeric(8);
      truck.brand = faker.company.companyName();
      truck.vtvExpiration = faker.datatype.datetime();
      truck.assuranceExpiration = faker.datatype.datetime();
      truck.patentExpiration = faker.datatype.datetime();
      truck.affiliate = affiliate;
      await truck.save();
    }
    const employeeQuantity = 10;
    for (let index = 0; index < employeeQuantity; index++) {
      const user = new User(faker.internet.userName(), faker.internet.password());
      await user.save();
      const truckDriver = new TruckDriver();
      truckDriver.name = faker.name.findName();
      truckDriver.affiliate = affiliate;
      truckDriver.user = user;
      await truckDriver.save();
    }
  }
}


(async () => {
  await initDatabase();
  await seed();
})();