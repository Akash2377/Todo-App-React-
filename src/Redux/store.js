import { legacy_createStore as createStore } from "redux";
import { reducer } from "./reducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
export const store = createStore(reducer, applyMiddleware(thunk));
