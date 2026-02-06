import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import RootSaga from "./Sagas/RootSaga";
import RootReducer from "../Redux/Reducers/RootReducer";

const saga = createSagaMiddleware()

const Store = configureStore({
    reducer: RootReducer,
    middleware: () => [saga]
})

export default Store

saga.run(RootSaga)