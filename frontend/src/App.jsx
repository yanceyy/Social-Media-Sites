import React from "react";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import "./App.less";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import { useHistory } from "react-router-dom";
import { checkReturnHome } from "./utils/commonfunctions";
import { getFromLocalStorage } from "./utils/commonfunctions";
function App() {
    let history = useHistory();
    checkReturnHome(getFromLocalStorage(), history);
    return (
        <Provider store={store}>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/profile/:userId" component={ProfilePage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </Provider>
    );
}

export default App;
