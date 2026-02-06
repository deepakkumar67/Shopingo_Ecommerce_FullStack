import { call, put, takeEvery } from "redux-saga/effects"
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/indes"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Services/indes"


function* createSaga(action) {
    try {
        let response = yield call(createRecord, "faq", action.payload)
        yield put({ type: CREATE_FAQ_RED, payload: response })
    } catch (err) {
        console.error("Create FAQ failed:", err)
    }
}

// let response = yield createMultipartRecord("faq", action.payload)
function* getSaga() {                                                                    //Worker Saga
    let response = yield getRecord("faq")
    yield put({ type: GET_FAQ_RED, payload: response })
}

function* updateSaga(action) {                                                           //Worker Saga
    yield updateRecord("faq", action.payload)
    yield put({ type: UPDATE_FAQ_RED, payload: action.payload })

    // let response = yield updateMultipartRecord("faq", action.payload)
    // yield put({ type: UPDATE_FAQ_RED, payload: action.payload })

}
function* deleteSaga(action) {                                                           //Worker Saga
    yield deleteRecord("faq", action.payload)
    yield put({ type: DELETE_FAQ_RED, payload: action.payload })

}


export default function* FaqSagas() {
    yield takeEvery(CREATE_FAQ, createSaga)         //Watcher Saga
    yield takeEvery(GET_FAQ, getSaga)               //Watcher Saga
    yield takeEvery(UPDATE_FAQ, updateSaga)         //Watcher Saga
    yield takeEvery(DELETE_FAQ, deleteSaga)         //Watcher Saga
}