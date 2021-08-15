import React from "react";
import "./index.less";

function LoginPage() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialWhat</h3>
                    <span className="loginDesc">Embrace the World</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input
                            type="text"
                            placeholder="Email"
                            id="LoginUsername"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            id="LoginPassword"
                        />
                        <button className="LoginButton">Login</button>
                        <div className="loginForget">Forget password?</div>
                        <button className="loginRegisterButton">
                            Create a New account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
