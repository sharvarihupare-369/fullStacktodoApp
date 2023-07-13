import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {reducer as todoReducer} from "./reducer"
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todoReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))