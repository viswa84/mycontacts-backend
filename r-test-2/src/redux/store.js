
import { combineReducers, legacy_createStore } from "redux"
import { count_reduser } from "./reduser";


const store = legacy_createStore(count_reduser);

export default store 