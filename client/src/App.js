import React from "react";
import { createStore, combineReducers } from "redux";
import { BrowserRouter, Route } from "react-router-dom";
import AllFdLists from "./components/reducer/allfdListsReducer.js";
import SearchedFdLists from "./components/reducer/searchedFdListsReducer.js";
import Authethication from "./components/reducer/authethication.js";
import { Provider } from "react-redux";
import { ChatPage } from "./components/chatpage";
import { Login } from "./components/login";
import "./App.css";

const allReducers = combineReducers({
  AllFdLists: AllFdLists,
  SearchedFdLists: SearchedFdLists,
  Authethication: Authethication
});

let store = createStore(allReducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={ChatPage} />
          <Route exact path="/login" component={Login} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
