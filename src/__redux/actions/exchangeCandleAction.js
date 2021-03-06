import { FETCH_CANDLE_EXCHANGE_FAILURE, FETCH_CANDLE_EXCHANGE_SUCCESS, EXCHANGE_TYPE_SUCCESS, EXCHANGE_TYPE_FAILURE, EXCHANGE_SYM_SUCCESS, EXCHANGE_SYM_FAILURE } from '../actions/types';
import {fxcm, oanda, forexcom, fxpro, icmarkets, icmtrader, octafx, pepperstone, fxpig } from '../../__misc/fx/';
import { poloniex, bitmex, bittrex, kraken, bitfinex, huobi, hitbtc, binance, okex, gemini, zb, kucoin, coinbase } from '../../__misc/cc/'
import Axios from 'axios';

export const exchangeCandleAction = (input, modalId) => {
  return (dispatch, getState) => {
    const { selectedExchange, selectedSym, selectedResolution, intervalFrom, intervalTo } = input;
    Axios(`https://cors-anywhere.herokuapp.com/https://finnhub.io/api/v1/${selectedExchange}/candle?symbol=${selectedSym.value}&resolution=${selectedResolution}&from=${intervalFrom}&to=${intervalTo}&token=bp3cl47rh5r9d7scmmd0`)
      .then((result) => {
        if(!result.headers['content-type'].includes('application/json')) {
          if(result.headers['content-type'].includes('text/html'))
            throw new Error('Please select a platform')
          else {
            throw new Error(result.data)
          }
        }
        const { c, h, l, o, t, s, v } = result.data;
        if ((s !== 'no_data') && c != null && h != null && l != null && o != null && t != null) {
          let concatObj = {};
          concatObj = { c_c: [...c], h_h: [...h], l_l: [...l], o_o: [...o], t_t: [...t], s_s: s }
          if (v) {
            Object.assign(concatObj, {v_v: [...v]});
          }
          return concatObj;
        } else {
          throw new Error(s)
        }
      })
      .then((conObj) => {
        let primaryBatch = [];
        let alternateBatch = [];
        const timestamps = [...conObj.t_t];
        timestamps.forEach((dt, i) => {
          primaryBatch.push({
            x: new Date(dt * 1000),
            y: [conObj.o_o[i], conObj.h_h[i], conObj.l_l[i], conObj.c_c[i]]
          })
          if (conObj.v_v) {
            alternateBatch.push(conObj.v_v[i])
          }
        });
        dispatch({
          type: FETCH_CANDLE_EXCHANGE_SUCCESS,
          payload: {
            dsid: modalId,
            status: conObj.s_s,
            primary: primaryBatch,
            alternate: alternateBatch
          }
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_CANDLE_EXCHANGE_FAILURE,
          payload: {
            dsid: modalId,
            status: err.message
          }
        })
      })
  }
}

export const exchangeTypeSymGrpAction = (input) => {
  return (dispatch, getState) => {
    switch(input) {
      case 'forex':
        dispatch ({
          type: EXCHANGE_TYPE_SUCCESS,
          payload:  {
            selectedExchange: input,
            selectedExSymGroup: ["oanda", "fxcm", "forex.com", "octafx", "fxpig", "pepperstone", "icmtrader", "ic markets", "fxpro"],
            status: true
          }
        })
        break;
      case 'crypto':
        dispatch ({
          type: EXCHANGE_TYPE_SUCCESS,
          payload:  {
            selectedExchange: input,
            selectedExSymGroup: ["POLONIEX", "Bitmex", "BITTREX", "KRAKEN", "BITFINEX", "COINBASE", "HUOBI", "HITBTC", "Binance", "OKEX", "GEMINI", "ZB", "KUCOIN"],
            status: true
          }
        })
        break;
      default:
        dispatch ({
          type: EXCHANGE_TYPE_FAILURE,
          payload: {
            status: false
          }
        })
        break;
    }
  }
}

export const exchangeSymAction = (input, exch) => {
  return (dispatch, getState) => {
    if(exch === 'forex') {
      switch(input) {
        case 'oanda':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: oanda,
              status: true
            }
          })
          break;
        case 'fxcm':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: fxcm,
              status: true
            }
          })
          break;
        case 'forex.com':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: forexcom,
              status: true
            }
          })
          break;
        case 'fxpro':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: fxpro,
              status: true
            }
          })
          break;
        case 'fxpig':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: fxpig,
              status: true
            }
          })
          break;
        case 'ic markets':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: icmarkets,
              status: true
            }
          })
          break;
        case 'icmtrader':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: icmtrader,
              status: true
            }
          })
          break;
        case 'octafx':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: octafx,
              status: true
            }
          })
          break;
        case 'pepperstone':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: pepperstone,
              status: true
            }
          })
          break;
        default:
          dispatch ({
            type: EXCHANGE_SYM_FAILURE,
            payload:  {
              status: false
            }
          })
          break;
      }
    } else if(exch === 'crypto') {
      switch(input) {
        case 'POLONIEX':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: poloniex,
              status: true
            }
          })
          break;
        case 'Bitmex':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: bitmex,
              status: true
            }
          })
          break;
        case 'BITTREX':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: bittrex,
              status: true
            }
          })
          break;
        case 'KRAKEN':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: kraken,
              status: true
            }
          })
          break;
        case 'BITFINEX':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: bitfinex,
              status: true
            }
          })
          break;
        case 'COINBASE':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: coinbase,
              status: true
            }
          })
          break;
        case 'HUOBI':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: huobi,
              status: true
            }
          })
          break;
        case 'HITBTC':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: hitbtc,
              status: true
            }
          })
          break;
        case 'Binance':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: binance,
              status: true
            }
          })
          break;
        case 'OKEX':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: okex,
              status: true
            }
          })
          break;
        case 'GEMINI':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: gemini,
              status: true
            }
          })
          break;
        case 'ZB':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: zb,
              status: true
            }
          })
          break;
        case 'KUCOIN':
          dispatch ({
            type: EXCHANGE_SYM_SUCCESS,
            payload:  {
              selectedExSymGroup: input,
              selectedExSymMul: kucoin,
              status: true
            }
          })
          break;
        default:
          dispatch ({
            type: EXCHANGE_SYM_FAILURE,
            payload:  {
              status: false
            }
          })
          break;
      }
    }
  }
}
