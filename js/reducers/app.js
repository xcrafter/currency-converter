const initialState = {
  lastChecked: null,
  isRequesting: false,
  statusMessage: null, // To store live status messages
  convertFrom: null,
  convertTo: null,
  lastFromRate: 0,
  lastToRate: 0,
  amount: 0,
  result: 0,
  currencies: [],
  recentEntries: [], // string formed in pattern `from:to`
  history: {},
};

export const actionTypes = {
  IS_REQUESTING: 'IS_REQUESTING',
  REQUEST_ENDS: 'REQUEST_ENDS',
  SAVE_STATE: 'SAVE_STATE',
  RESET_RATES: 'RESET_RATES',
  CLEAR_ALL: 'CLEAR',
};

const app = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SAVE_STATE':
      return { ...state, ...payload.data };
    case 'IS_REQUESTING':
      return { ...state, isRequesting: true, statusMessage: null };
    case 'REQUEST_ENDS':
      return { ...state, isRequesting: false };
    case 'RESET_RATES':
      return { ...state, lastFromRate: 0, lastToRate: 0 };
    case 'CLEAR':
      return { ...state, ...initialState };
    default:
      return state;
  }
};


export default app;

