import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth";
import cart from "./cart";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const rootReducer = combineReducers({ auth, cart });
export default persistReducer(persistConfig, rootReducer);
