import { getAffiliates } from '../../api/affiliates';

export const ADD_AFFILIATE = 'ADD_AFFILIATE';
export const SAVE_AFFILIATE_INIT = 'SAVE_AFFILIATE_INIT';
export const SAVE_AFFILIATE_SUCCESS = 'SAVE_AFFILIATE_SUCCESS';
export const ADD_TRUCK_DRIVER = 'ADD_TRUCK_DRIVER';
export const ADD_TRUCK = 'ADD_TRUCK';
export const FIND_ALL_INIT = 'FIND_ALL_INIT';
export const FIND_ALL_SUCCESS = 'FIND_ALL_SUCCESS';
export const SELECT_AFFILIATE = 'SELECT_AFFILIATE';

export function addAffiliate(affiliate) {
  return {
    type: ADD_AFFILIATE,
    affiliate,
  };
}

export function saveAffiliateInit(affiliate) {
  return {
    type: SAVE_AFFILIATE_INIT,
    affiliate,
  };
}

export function saveAffiliateSuccess() {
  return { type: SAVE_AFFILIATE_SUCCESS };
}

export function addTruckDriver(truckDriver) {
  return { type: ADD_TRUCK_DRIVER, truckDriver };
}

export function addTruck(truck) {
  return { type: ADD_TRUCK, truck };
}

export function findAllInit() {
  return async (dispatch) => {
    const affiliates = await getAffiliates();
    dispatch(findAllSuccess(affiliates));
  }
}

export function findAllSuccess(affiliates = []) {
  return { type: FIND_ALL_SUCCESS, affiliates };
}

export function selectAffiliate(selectedAffiliate) {
  return { type: SELECT_AFFILIATE, selectedAffiliate };
}