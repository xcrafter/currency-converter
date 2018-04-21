import { create } from 'apisauce';
import Constants from './../config/constants';
import { actionTypes } from '../reducers/app';

const api = create({
  baseURL: Constants.base_url,
});

/** ** function to initialise currencies */

export const initialiseCurrencies = () => (dispatch) => {
  dispatch({ type: actionTypes.IS_REQUESTING });
  api.get('/rates').then((res) => {
    if (res.status == 200) {
      const result = res.data.rates || [];
      if (result.length > 0) {
        const currenciesList = [];
        result.forEach((element) => {
          currenciesList.push({ value: element.currency, label: element.currency });
        });
        dispatch({
          type: 'SAVE_STATE',
          payload: {
            data: {
              currencies: currenciesList,
              isRequesting: false,
            },
          },
        });
      }
    } else {
      dispatch(broadCastError('Unable to fetch.. please try again'));
      dispatch({ type: actionTypes.REQUEST_ENDS });
    }
  }).catch((e) => {
    dispatch({
      type: 'SAVE_STATE',
      payload: {
        data: {
          statusMessage: 'Unable to fetch data.. Please try again',
        },
      },
    });
    dispatch({ type: actionTypes.REQUEST_ENDS });
  });
};

// funcion to setData to redux store

export const setData = (property, value) => (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_STATE,
    payload: {
      data: {
        [property]: value,
      },
    },
  });
  if (property == 'convertFrom' || property == 'convertTo') {
    dispatch({
      type: actionTypes.RESET_RATES,
    });
  }
  dispatch(convert());
};

// function to calcualte the amount

const findAmount = (from, to, amount) => {
  if (!(from && to)) {
    return 0;
  }
  if (from == to) {
    return amount;
  }
  if (to <= 0) {
    return 0;
  }
  return parseFloat(((from * amount) / to).toString()).toFixed(2);
};


export const broadCastError = message => (dispatch) => {
  alert(message);
  dispatch({
    type: actionTypes.SAVE_STATE,
    payload: {
      data: {
        statusMessage: message,
      },
    },
  });
};

export const setParameter = key => (dispatch) => {
  const splittedData = key.split(':');
  dispatch({
    type: actionTypes.SAVE_STATE,
    payload: {
      data: {
        convertFrom: splittedData[0],
        convertTo: splittedData[1],
        lastFromRate: 0,
        lastToRate: 0,
      },
    },
  });
  dispatch(convert());
};

export const clearAllData = () => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ALL });
  dispatch(initialiseCurrencies());
};

const checkForNull = value => (value != 'null');

export const addToRecentEntries = key => (dispatch, getState) => {
  const {
    recentEntries, lastFromRate, lastToRate, history,
  } = getState().app;
  if (!recentEntries.includes(key)) {
    const splittedData = key.split(':');
    if ((splittedData[0] !== splittedData[1]) && checkForNull(splittedData[0]) && checkForNull(splittedData[1])) {
      recentEntries.unshift(key);
      dispatch({
        type: actionTypes.SAVE_STATE,
        payload: {
          data: {
            recentEntries,
          },
        },
      });
      const rate = parseFloat((lastFromRate / lastToRate).toString()).toFixed(2);
      if (Array.isArray(history[key]) && rate > 0) {
        if (!history[key].includes(rate)) { history[key].unshift(rate); }
      } else history[key] = [rate];
    }
  }
};

// function to convert

export const convert = () => (dispatch, getState) => {
  const {
    convertFrom, convertTo, amount, lastFromRate, lastToRate,
  } = getState().app;
  // const isSameAmount = (convertFrom == convertTo) && convertFrom && convertTo;
  if (lastFromRate && lastToRate) {
    const output = findAmount(Number(lastFromRate), Number(lastToRate), Number(amount));
    dispatch({
      type: 'SAVE_STATE',
      payload: {
        data: {
          result: output,
        },
      },
    });
  } else {
    dispatch({ type: actionTypes.IS_REQUESTING });
    api.get('/rates').then((res) => {
      if (res.status == 200) {
        let fromRate = 0;
        let toRate = 0;
        const result = res.data.rates || [];
        if (result.length > 0) {
          result.forEach((element) => {
            if (element.currency === convertFrom) fromRate = element.rate;
            if (element.currency === convertTo) toRate = element.rate;
          });
        }
        const output = findAmount(Number(fromRate), Number(toRate), Number(amount));
        const key = `${convertFrom}:${convertTo}`;

        dispatch({
          type: 'SAVE_STATE',
          payload: {
            data: {
              result: output,
              lastFromRate: fromRate,
              lastToRate: toRate,
              isRequesting: false,
            },
          },
        });
        dispatch(addToRecentEntries(key));
      } else {
        dispatch(broadCastError('Unable to fetch.. please try again'));
        dispatch({ type: actionTypes.REQUEST_ENDS });
      }
    }).catch((e) => {
      dispatch(broadCastError('Unable to fetch.. please try again'));
      dispatch({ type: actionTypes.REQUEST_ENDS });
    });
  }
};

