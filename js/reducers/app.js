const initialState = {
  lastChecked: null,
  statusMessage: null, // To store live status messages
  convertFrom: null,
  convertTo: null,
  recentEntries: [], // string formed in pattern `from:to`
  test: 'sample',
};

const app = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SAVE_STATE':
      return { ...state, ...payload.data };
    case 'TEST_STATE':
      return { ...state, test: 'samplesssss' };
    default:
      return state;
  }
};


export default app;

