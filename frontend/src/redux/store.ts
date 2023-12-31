import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {reducer as todoReducer} from "./todoReducer/reducer"
import {reducer as authReducer} from "./authReducer/reducer"
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todoReducer,
  authReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))