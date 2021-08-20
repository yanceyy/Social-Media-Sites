import React, { useRef, useState } from "react";
import "./index.less";
import { connect } from "react-redux";
import { SetUserInfo } from "../../redux/action/Auth";
import { login } from "../../api/action";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

function LoginPage(props) {
    const email = useRef();
    const password = useRef();
    const [isactive, setActive] = useState(false);
    const [state, setState] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
    });
    const { vertical, horizontal, open } = state;
    const handleClick = () => {
        setState({
            open: true,
            vertical: "top",
            horizontal: "center",
        });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleLogin = async (e) => {
        setActive(true);
        e.preventDefault();
        try {
            const res = await login(
                email.current.value,
                password.current.value
            );
            props.setUserInf(res.userInfo);
            props.history.push("/");
        } catch (error) {
            console.log("error");
            handleClick();
        } finally {
            setActive(false);
        }
    };
    return (
        <div className="login">
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="wrong username or password"
                key={vertical + horizontal}
            />
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialWhat</h3>
                    <span className="loginDesc">Embrace the World</span>
                </div>
                <div className="loginRight" onSubmit={handleLogin}>
                    <form className="loginBox">
                        <input
                            type="email"
                            placeholder="Email"
                            id="LoginUsername"
                            ref={email}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            id="LoginPassword"
                            ref={password}
                            required
                            maxLength="18"
                            minLength="6"
                        />
                        <button className="LoginButton" disabled={isactive}>
                            {isactive ? (
                                <CircularProgress size="20px" />
                            ) : (
                                "Login"
                            )}
                        </button>
                        <div className="loginForget">Forget password?</div>
                        <button className="loginRegisterButton">
                            Create a New account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function setUserInformation(dispatch) {
    return {
        setUserInf: (userInfo) => dispatch(SetUserInfo(userInfo)),
    };
}

export default connect(
    (state) => ({ userInfo: state.userInfo }),
    setUserInformation
)(LoginPage);
