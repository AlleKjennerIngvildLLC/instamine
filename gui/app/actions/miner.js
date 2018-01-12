import {createAction} from 'redux-actions';
import {createActionThunk} from 'redux-thunk-actions';
import Notifications from 'react-notification-system-redux';
import {call, put, takeLatest} from 'redux-saga/effects';

import MinerClient from '../miner';
const {Event} = require('../rpc/messages_pb');
const {CommandRequest, Config, SystemStatusRequest} = require('../rpc/command_pb');

// The connection should be triggered by an action!
let client = new MinerClient();
let handle;

function send_notification(dispatch, title, message) {
  const options = {
    title: title,
    message: message,
    position: 'br',
    autoDismiss: 3
  };
  dispatch(Notifications.info(options));
}

// here the miner has to be specified!
const startMiner = (config, mode) => async(dispatch) => {

  const startRequest = createAction('START_MINER_START');
  const startSuccess = createAction('START_MINER_SUCCEEDED');
  const startFailure = createAction('START_MINER_FAILED');
  const startEnded = createAction('START_MINER_ENDED');

  dispatch(startRequest());

  try {
    var response = await client.startMiner(config, mode);

    if (response.getMessage() == 'Server started') {

      let date = new Date().toLocaleString();
      send_notification(dispatch, 'Miner started.', `Started mining XMR [${date}]`);

      dispatch(startSuccess({mode: mode}));
      if (handle === undefined) {
        handle = setInterval(() => dispatch({type: 'START_STATUS_REQUEST_SAGA'}), 500);
      } else {
        console.log('handle is not undefined. should not be possible!');
      }
    }
  } catch (e) {

    console.error(e);
    dispatch(startFailure(e));
  }

  dispatch(startEnded());
};

const stopMiner = createActionThunk('STOP_MINER', async() => {
  var response = await client.stopMiner();

  if (handle !== undefined) {
    clearInterval(handle);
    handle = undefined;
  }

  return response;
});

const requestStatus = () => async(dispatch) => {

  const startRequest = createAction('FETCH_STATUS_START');
  const startSuccess = createAction('FETCH_STATUS_SUCCEEDED');
  const startFailure = createAction('FETCH_STATUS_FAILED');
  const startEnded = createAction('FETCH_STATUS_ENDED');

  dispatch(startRequest());

  try {
    let event = await client.getMiningStatus();
    dispatch(startSuccess(event));
  } catch (e) {
    dispatch(startFailure(e));
  }
};

const requestSystemStatus = createActionThunk('FETCH_SYSTEM_STATUS', async() => {
  let response = await client.getSystemStatus();
  return response;
});

const updateSettings = createAction('UPDATE_SETTINGS', (value) => {
  return value;
});

function * requestResponse(action) {
  try {
    yield put(requestStatus());
    yield put({type: 'START_STATUS_REQUEST_SAGA_SUCCEEDED'});
  } catch (e) {
    yield put({type: 'START_STATUS_REQUEST_SAGA_FAILED', message: e.message});
  }
}

function * minerSaga() {
  yield takeLatest('START_STATUS_REQUEST_SAGA', requestResponse);
}

export default {
  start : startMiner,
  stop : stopMiner,
  status : requestStatus,
  systemStatus : requestSystemStatus,
  updateSettings : updateSettings,
  minerSaga : minerSaga
};
