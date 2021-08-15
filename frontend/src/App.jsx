import React from "react";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import "./App.less";
import { Switch, Route } from "react-router-dom";
function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </div>
    );
}

export default App;
