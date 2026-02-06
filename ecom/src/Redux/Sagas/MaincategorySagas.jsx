import { put, takeEvery } from "redux-saga/effects"
import { CREATE_maincategory, CREATE_maincategory_RED, DELETE_maincategory, DELETE_maincategory_RED, GET_maincategory, GET_maincategory_RED, UPDATE_maincategory, UPDATE_maincategory_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/indes"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Services/indes"

function* createSaga(action) {                                                           //Worker Saga
    let response = yield createRecord("maincategory", action.payload)
    // let response = yield createMultipartRecord("maincategory", action.payload)
    yield put({ type: CREATE_maincategory_RED, payload: response })
}

function* getSaga() {                                                                    //Worker Saga
    let response = yield getRecord("maincategory")
    yield put({ type: GET_maincategory_RED, payload: response })
}

function* updateSaga(action) {                                                           //Worker Saga
    yield updateRecord("maincategory", action.payload)
    yield put({ type: UPDATE_maincategory_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("maincategory", action.payload)
    // yield put({ type: UPDATE_maincategory_RED, payload: action.payload })

}
function* deleteSaga(action) {                                                           //Worker Saga
    yield deleteRecord("maincategory", action.payload)
    yield put({ type: DELETE_maincategory_RED, payload: action.payload })

}


export default function* maincategorySagas() {
    yield takeEvery(CREATE_maincategory, createSaga)         //Watcher Saga
    yield takeEvery(GET_maincategory, getSaga)               //Watcher Saga
    yield takeEvery(UPDATE_maincategory, updateSaga)         //Watcher Saga
    yield takeEvery(DELETE_maincategory, deleteSaga)         //Watcher Saga
}