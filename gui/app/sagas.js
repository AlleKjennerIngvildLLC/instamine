import { call, put, takeLatest } from 'redux-saga/effects';
import MinerClient from './miner';



function* requestResponse(action) {
    try {

        yield put();
        yield put({type: "START_STATUS_REQUEST_SAGA_SUCCEEDED"});
     } catch (e) {
        yield put({type: "START_STATUS_REQUEST_SAGA_FAILED", message: e.message});
     }

}

function* minerSaga() {
    yield takeLatest("START_STATUS_REQUEST_SAGA", requestResponse);
}

export default minerSaga;
