import { FETCH_DATA_PENDING, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../actions/sign-in';

const initialState = {
  pending: false,
  signInInfo: [],
  error: '',
};

export default function signInReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        pending: false,
        signInInfo: action.signInInfo,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getData = state => state.signInInfo;
export const getDataPending = state => state.pending;
export const getDataError = state => state.error;
