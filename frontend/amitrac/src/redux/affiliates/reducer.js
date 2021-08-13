import { ADD_AFFILIATE, FIND_ALL_SUCCESS, SAVE_AFFILIATE_INIT, SAVE_AFFILIATE_SUCCESS, SELECT_AFFILIATE } from './actions';

const initialState = {
  affiliates: [],
  selectedAffiliate: null,
  isLoading: false,
};

export function affiliatesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_AFFILIATE:
      return {
        ...state,
        affiliates: state.affiliates.concat([action.affiliate])
      }; 
    case SAVE_AFFILIATE_INIT:
      return {
        ...state,
        isLoading: true,
      }
    case SAVE_AFFILIATE_SUCCESS:
      return { ...state, isLoading: false };
    case SELECT_AFFILIATE:
      return { ...state, selectedAffiliate: action.selectedAffiliate };
    case FIND_ALL_SUCCESS:
      return { ...state, affiliates: action.affiliates };
    default:
      return state
  }
}