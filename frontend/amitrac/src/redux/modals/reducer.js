import { SET_OPEN_ADD_TRUCK_DRIVER_MODAL, SET_OPEN_ADD_TRUCK_MODAL, SET_OPEN_CHANGE_PASSWORD_MODAL } from "./actions";

const initialState = {
  openChangePasswordModal: false,
  openAddTruckModal: false,
  openAddTruckDriverModal: false,
};

export function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_OPEN_CHANGE_PASSWORD_MODAL:
      return { ...state, openChangePasswordModal: action.openChangePasswordModal };
    case SET_OPEN_ADD_TRUCK_MODAL:
      return { ...state, openAddTruckModal: action.openAddTruckModal };
    case SET_OPEN_ADD_TRUCK_DRIVER_MODAL:
      return { ...state, openAddTruckDriverModal: action.openAddTruckDriverModal };
    default:
      return state;
  }
};

