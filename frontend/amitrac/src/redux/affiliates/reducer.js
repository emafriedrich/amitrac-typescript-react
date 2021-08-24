import {
  ADD_AFFILIATE,
  ADD_TRUCK_DRIVER,
  FIND_ALL_SUCCESS,
  SAVE_AFFILIATE_INIT,
  SAVE_AFFILIATE_SUCCESS,
  SAVE_TRUCK_SUCCESS,
  SELECT_AFFILIATE,
  SET_ACTIVE_TRUCK_DRIVER_SUCCESS,
  SET_ACTIVE_TRUCK_SUCCESS
} from './actions';

const initialState = {
  affiliates: [],
  selectedAffiliate: null,
  isLoading: false,
};

export function affiliatesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_AFFILIATE:
      const newAffiliate = {
        truckDrivers: [],
        trucks: [],
        credentialExpiration: new Date(),
      };
      return {
        ...state,
        selectedAffiliate: newAffiliate,
      }; 
    case SAVE_AFFILIATE_INIT:
      return {
        ...state,
        affiliate: action.affiliate
      }
    case ADD_TRUCK_DRIVER:
      return { ...state };
    case SET_ACTIVE_TRUCK_DRIVER_SUCCESS:
      const truckDriver = state.selectedAffiliate.truckDrivers.find(td => td.id === action.params.truckDriverId);
      truckDriver.active = action.params.active;
      return { ...state };
    case SET_ACTIVE_TRUCK_SUCCESS:
      const truck = state.selectedAffiliate.trucks.find(td => td.id === action.params.truckId);
      truck.active = action.params.active;
      return { ...state };
    case SAVE_AFFILIATE_SUCCESS:
      return { ...state, isLoading: false };
    case SELECT_AFFILIATE:
      return { ...state, selectedAffiliate: action.selectedAffiliate };
    case SAVE_TRUCK_SUCCESS:
      return { ...state, isLoading: false };
    case FIND_ALL_SUCCESS:
      return { ...state, affiliates: action.affiliates };
    default:
      return state
  }
}