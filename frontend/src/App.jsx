import React from "react";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import "./App.less";
import { Switch, Route } from "react-router-dom";
function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={ProfilePage} />
            </Switch>
        </div>
    );
}

export default App;
