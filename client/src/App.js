import React from "react";
import { createStore, combineReducers } from "redux";
import { BrowserRouter, Route } from "react-router-dom";
import AllFdLists from "./components/reducer/allfdListsReducer.js";
import SearchedFdLists from "./components/reducer/searchedFdListsReducer.js";
import Authetication from "./components/reducer/authetication.js";
import FdSpeech from "./components/reducer/fdspeech.js";
import MySpeech from "./components/reducer/myspeech.js";
import { Provider } from "react-redux";
import { ChatPage } from "./components/chatpage";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";
import "./App.css";

const allReducers = combineReducers({
  AllFdLists: AllFdLists,
  SearchedFdLists: SearchedFdLists,
  Authetication: Authetication,
  FdSpeech: FdSpeech,
  MySpeech: MySpeech
});

let store = createStore(allReducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={ChatPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
