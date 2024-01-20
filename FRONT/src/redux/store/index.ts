import { createStore, Store } from "redux";
// import AppState from "../interfaces";
import rootReducer from "../reducers";

function configureStore(): Store {
  const store = createStore(rootReducer, undefined);
  return store;
}

const store = configureStore();

export default store;