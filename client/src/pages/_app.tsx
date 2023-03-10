import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "layouts/Layout";
import { Provider } from "react-redux";
import store from "../store";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/ru";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from "notistack";

moment.locale("ru"); // it is required to select default locale manually

function MyApp({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <SnackbarProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default MyApp;
