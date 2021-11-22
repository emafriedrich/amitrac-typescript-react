import { api } from './constants';

export async function getAffiliates() {
  const response = await api.get('/affiliates');
  const data = response.data
  return data.length ? [...data] : { ...data };
}

export async function saveAffiliate(affiliate) {
  const response = await api.post('/affiliates', affiliate);
  return response.data;
}

export async function saveTruckDriver(truckDriver) {
  await api.post('/truckDrivers', truckDriver);
}

export async function saveTruck(truck) {
  await api.post('/trucks', truck);
}

export async function changePassword(data) {
  await api.put('/users/changePasswordAdmin', data);
}

export async function setActiveTruckDriver(data) {
  await api.post('/truckDrivers/setActive', { id: data.truckDriverId, active: data.active });
}

export async function setActiveTruck(data) {
  await api.post('/trucks/setActive', { id: data.truckId, active: data.active });
}

export async function changeTruckPhoto(data) {
  return await api.post('/trucks/changePhoto', { id: data.truckId, image: data.truckImage });
}

export async function findAffiliateById(affiliateId) {
  const response = await api.get(`/affiliates/${affiliateId}`);
  return response.data;
}
