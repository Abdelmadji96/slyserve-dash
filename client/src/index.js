import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
//import store from "./store";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import ScrollToTop from "./ScrollToTp";
const loading = <CircularProgress color="primary" />;

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <ScrollToTop />
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
