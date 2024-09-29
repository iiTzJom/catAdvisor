import { sessionService } from "redux-react-session";
import userReducer from "./reducer/userData";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootConfig = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootConfig);

export const store = configureStore({
  reducer: persistedReducer,
});
sessionService.initSessionService(store);

export const persistor = persistStore(store);
