import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import { Provider } from "react-redux";
import store,{history} from "./redux/store";
import Main from "./Main"
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position:"top-center",
  autoClose:3000,
  hideProgressBar:false,
  newestOnTop:false,
  rtl:false,
  // draggable:false
  pauseOnHover:true,
  pauseOnFocusLoss:false,
  theme:"colored"
}

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
            <Main/>
            <ToastContainer {...toastConfig}/>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;