"use client";

import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";
import { persistor, store } from "./store";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";


interface GlobalProviderProps {
  children: ReactNode;
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <Provider store={store}>
      <Toaster position="top-center" visibleToasts={1} richColors />
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider>{children}</LanguageProvider>
      </PersistGate>
    </Provider>
  );
}