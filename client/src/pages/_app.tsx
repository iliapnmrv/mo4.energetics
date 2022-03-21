import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "layouts/Layout";
import { Provider } from "react-redux";
import store from "../store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru"); // it is required to select default locale manually

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={"ru"}
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;
