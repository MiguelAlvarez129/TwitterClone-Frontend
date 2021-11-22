import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "rsuite/dist/styles/rsuite-default.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./Main"
import Home from "./components/Home"
import ProtectedRoute from "./private/ProtectedRoute"
const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Main/>
      </Router>
    </Provider>
  );
};

export default App;