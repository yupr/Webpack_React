import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createPromise } from 'redux-promise-middleware';
import reducer from "./reducers";

//reduxのロジック
const promise = createPromise({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'] });
const middleware = applyMiddleware(promise, thunk, createLogger());

export default createStore(reducer, middleware);