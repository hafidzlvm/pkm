"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { loadFavorites } from "./slices/favoritesSlice";

function FavoritesLoader() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  return null;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <FavoritesLoader />
      {children}
    </Provider>
  );
}

