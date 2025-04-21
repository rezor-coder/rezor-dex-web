import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { store } from "./app/store";



// if (window.location.pathname !== "/") {
//   require("./index.scss");
// }

// if (window.location.pathname === "/"){
//   require("./assets/css/bootstrap/bootstrap.min.css");
//   require("./assets/css/style.css");
//   require("./assets/css/blog.css");
//   require("./assets/css/privacyPolicy.css");
//   require("./assets/css/responsive.css");
//   require("./assets/css/walletResponsive.css");
//   require("./assets/css/dark-mode.css");
// }



let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
)
