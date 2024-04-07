import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../reducers/cartReducers";
import { wishlistReducer } from "../reducers/wishlistReducers";
import { settingReducer } from "../reducers/settingReducers";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage: storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage: storage,
};

const settingPersistConfig = {
  key: "setting",
  storage: storage,
};

const persistCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);
const persistSettingReducer = persistReducer(
  settingPersistConfig,
  settingReducer
);

export const store = configureStore({
  reducer: {
    cart: persistCartReducer,
    wishlist: persistWishlistReducer,
    setting: persistSettingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
