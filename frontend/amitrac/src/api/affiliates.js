import { api } from './constants';

export async function getAffiliates() {
  const response = await api.get('/affiliates');
  return response.data;
}