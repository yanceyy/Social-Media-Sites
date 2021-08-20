import React from "react";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import registerPage from "./pages/register";
import "./App.less";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import { useHistory } from "react-router-dom";
import { checkReturnHome } from "./utils/commonfunctions";
import { getFromLocalStorage } from "./utils/commonfunctions";
function App() {
    let history = useHistory();
    console.log(
        history.location.pathname,
        history.location.pathname.indexOf("/profile")
    );
    if (
        history.location.pathname !== "/register" &&
        history.location.pathname.indexOf("/profile") !== 0
    )
        checkReturnHome(getFromLocalStorage(), history);
    const renderPages = (
        <Provider store={store}>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/profile/:userId" component={ProfilePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={registerPage} />
            </Switch>
        </Provider>
    );

    return renderPages;
}

export default App;
