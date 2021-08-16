import { api } from './constants';

export async function getAffiliates() {
  const response = await api.get('/affiliates');
  const data = response.data
  return data.length ? [...data] : { ...data };
}

export async function saveAffiliate(affiliate) {
  await api.post('/affiliates', affiliate);
}

export async function saveTruckDriver(truckDriver) {
  await api.post('/truckDrivers', truckDriver);
}

export async function saveTruck(truck) {
  await api.post('/trucks', truck);
}
