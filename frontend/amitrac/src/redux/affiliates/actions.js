import { changePassword, getAffiliates, saveAffiliate, saveTruck, saveTruckDriver, setActiveTruckDriver as apiSetActiveTruckDriver, setActiveTruck as apiSetActiveTruck } from '../../api/affiliates';

export const ADD_AFFILIATE = 'ADD_AFFILIATE';
export const SAVE_AFFILIATE_INIT = 'SAVE_AFFILIATE_INIT';
export const SAVE_AFFILIATE_SUCCESS = 'SAVE_AFFILIATE_SUCCESS';
export const ADD_TRUCK_DRIVER = 'ADD_TRUCK_DRIVER';
export const SAVE_TRUCK_INIT = 'ADD_TRUCK';
export const FIND_ALL_INIT = 'FIND_ALL_INIT';
export const FIND_ALL_SUCCESS = 'FIND_ALL_SUCCESS';
export const SELECT_AFFILIATE = 'SELECT_AFFILIATE';
export const SAVE_TRUCK_DRIVER = 'SAVE_TRUCK_DRIVER';
export const SAVE_TRUCK_DRIVER_SUCCESS = 'SAVE_TRUCK_DRIVER_SUCCESS';
export const SET_ACTIVE_TRUCK_DRIVER = 'SET_ACTIVE_TRUCK_DRIVER';
export const SET_ACTIVE_TRUCK = 'SET_ACTIVE_TRUCK';
export const SET_ACTIVE_TRUCK_DRIVER_SUCCESS = 'SET_ACTIVE_TRUCK_DRIVER_SUCCESS';
export const SET_ACTIVE_TRUCK_SUCCESS = 'SET_ACTIVE_TRUCK_SUCCESS';
export const SAVE_TRUCK_SUCCESS = 'SAVE_TRUCK_SUCCESS';

export function addAffiliate(affiliate) {
  return {
    type: ADD_AFFILIATE,
    affiliate,
  };
}

export function saveAffiliateInit(affiliate) {
  return async (dispatch) => {
    await saveAffiliate(affiliate);
    alert('Afiliado guardado');
    window.location.reload();
  }
}

export function changePasswordAction(data) {
  return async (dispatch) => {
    await changePassword(data);
    alert('contraseña cambiada');
  }
}

export function saveAffiliateSuccess() {
  return { type: SAVE_AFFILIATE_SUCCESS };
}

export function saveTruckSuccess(truck) {
  return { type: SAVE_TRUCK_SUCCESS, truck };
}

export function addTruckDriver() {
  return { type: ADD_TRUCK_DRIVER };
}

export function saveTruckInit(truck) {
  return async () => {
    await saveTruck(truck);
    alert('Camión guardado');
    window.location.reload();
  }
}

export function saveTruckBaseData(truck) {
  return async (dispatch) => {
    await saveTruck(truck);
    dispatch(saveTruckSuccess(truck));
  }
}

export function saveTruckDriverBaseData(truck) {
  return async () => {
    await saveTruckDriver(truck);
  }
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

export function setActiveTruckDriver(params) {
  return async (dispatch) => {
    await apiSetActiveTruckDriver(params);
    dispatch(setActiveTruckDriverSuccess(params));
  };
}

export function setActiveTruck(params) {
  return async (dispatch) => {
    await apiSetActiveTruck(params);
    dispatch(setActiveTruckSuccess(params));
  };
}

export function setActiveTruckDriverSuccess(params) {
  return { type: SET_ACTIVE_TRUCK_DRIVER_SUCCESS, params }
}

export function setActiveTruckSuccess(params) {
  return { type: SET_ACTIVE_TRUCK_SUCCESS, params }
}

export function saveTruckDriverInit(truckDriver) {
  return async () => {
    await saveTruckDriver(truckDriver);
    alert('Camionero guardado');
    window.location.reload();
  }
}