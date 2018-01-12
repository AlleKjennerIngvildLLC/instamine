import {handleActions} from 'redux-actions';
import actions from '../actions/miner';

import handleReply from './reply';
import on_connect from './connected';
import {effects} from 'redux-saga';

const {Event} = require('../rpc/messages_pb');
const {CommandRequest, Config, SystemStatusRequest} = require('../rpc/command_pb');

export default handleActions({

  'START_MINER_START': (state, action) => {
    return {
      ...state,
      isStarting: true
    };
  },

  'START_MINER_SUCCEEDED': (state, action) => {
    return {
      ...state,
      isStarting: false,
      status: {
        mode: action.payload.mode,
        running: true
      }
    };
  },

  'START_MINER_FAILED': (state, action) => {
    return {
      ...state,
      isStarting: false
    };
  },

  'START_MINER_END': (state, action) => {
    return {
      ...state,
      isStarting: false
    };
  },

  [actions.updateSettings]: (state, action) => {

    let newState = {
      ...state
    };
    newState.settings[action.payload.name] = action.payload;

    return newState;
  },

  [actions.systemStatus.SUCCEEDED]: (state, action) => {
    let running = action
      .payload
      .getRunning()

    return {
      ...state,
      status: {
        ...state.status,
        running: running
      }
    }
    x;
  },

  [actions.stop.START]: (state, action) => {
    return {
      ...state
    };
  },

  [actions.stop.SUCCEEDED]: (state, action) => {

    return {
      ...state,
      isStarting: false,
      status: {
        mode: undefined,
        running: false
      }
    };
  },

  'FETCH_STATUS_START': (state, action) => {
    return {
      ...state
    };
  },

  'FETCH_STATUS_SUCCEEDED': (state, action) => {

    let event = action.payload;
    let stateUpdate = {};

    if (event.getTimestamp() !== undefined) {

      //console.log(event.toObject())

      switch (event.getTypeCase()) {

        case Event.TypeCase['CONNECTION']:
          stateUpdate = {
            ...stateUpdate,
            ...on_connect(event, state)
          };

          break;

        case Event.TypeCase['REPLY']:

          stateUpdate = {
            ...stateUpdate,
            ...handleReply(event, state)
          };

          break;

        case Event.TypeCase['ERROR']:
          consoel.log('error');
          break;

        case Event.TypeCase['END']:
          console.log('end');
          break;

        case Event.TypeCase['EMPTY']:
          console.log('empty');
          break;

        case Event.TypeCase['RESULT']:

          console.log('on_result');
          break;

        case Event.TypeCase['JOB']:
          console.log('on_job');
          break;

        default:
          break;
      }

      stateUpdate = {
        ...stateUpdate,
        eventHistory: [
          ...state.eventHistory,
          event.toObject()
        ].slice(-10000)
      };

    }
    return {
      ...state,
      ...stateUpdate
    };
  }
}, {
  status: {
    mode: undefined,
    running: false
  },
  isStarting: false,
  settings: {
    config: '',
    walletAddress: '',
    enableGPU: false,
    nThreads: 1
  },
  running: false,
  eventHistory: [],
  hashrates: []
});