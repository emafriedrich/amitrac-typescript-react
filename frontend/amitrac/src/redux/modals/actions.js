export const SET_OPEN_CHANGE_PASSWORD_MODAL = 'SET_OPEN_CHANGE_PASSWORD_MODAL';

export const SET_OPEN_ADD_TRUCK_MODAL = 'SET_OPEN_ADD_TRUCK_MODAL';

export const SET_OPEN_ADD_TRUCK_DRIVER_MODAL = 'SET_OPEN_ADD_TRUCK_DRIVER_MODAL';


export function setOpenChangePasswordModal(openChangePasswordModal) {
  return { type: SET_OPEN_CHANGE_PASSWORD_MODAL, openChangePasswordModal };
}

export function setOpenAddTruckModal(openAddTruckModal) {
  return { type: SET_OPEN_ADD_TRUCK_MODAL, openAddTruckModal };
}

export function setOpenAddTruckDriverModal(openAddTruckDriverModal) {
  return { type: SET_OPEN_ADD_TRUCK_DRIVER_MODAL, openAddTruckDriverModal };
}
