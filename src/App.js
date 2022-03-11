import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import { Provider } from "react-redux";
import store,{history} from "./redux/store";
import Main from "./Main"
import { ConnectedRouter } from "connected-react-router";
import Home from "./components/Home"
import ProtectedRoute from "./private/ProtectedRoute"
const App = () => {
  return (
    <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <Router> */}
          <Main/>
      {/* </Router> */}
    </ConnectedRouter>
    </Provider>
  );
};

export default App;