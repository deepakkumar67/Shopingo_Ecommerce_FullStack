import { put, takeEvery } from "redux-saga/effects"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/indes"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Services/indes"

function* createSaga(action) {                                                           //Worker Saga
    let response = yield createRecord("feature", action.payload)
    // let response = yield createMultipartRecord("feature", action.payload)
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga() {                                                                    //Worker Saga
    let response = yield getRecord("feature")
    yield put({ type: GET_FEATURE_RED, payload: response })
}

function* updateSaga(action) {                                                           //Worker Saga
    yield updateRecord("feature", action.payload)
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("feature", action.payload)
    // yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })

}
function* deleteSaga(action) {
    const { id } = action.payload || {}
    if (!id) return
    yield deleteRecord("feature", { id })
    yield put({ type: DELETE_FEATURE_RED, payload: { id } })
    yield put({ type: GET_FEATURE })
}


export default function* FeatureSagas() {
    yield takeEvery(CREATE_FEATURE, createSaga)         //Watcher Saga
    yield takeEvery(GET_FEATURE, getSaga)               //Watcher Saga
    yield takeEvery(UPDATE_FEATURE, updateSaga)         //Watcher Saga
    yield takeEvery(DELETE_FEATURE, deleteSaga)         //Watcher Saga
}