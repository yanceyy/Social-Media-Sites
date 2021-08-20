import React, { useRef, useState } from "react";
import "./index.less";
import { connect } from "react-redux";
import { SetUserInfo } from "../../redux/action/Auth";
import { register } from "../../api/action";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

function LoginPage(props) {
    const history = useHistory();
    const email = useRef();
    const password = useRef();
    const [passwordagain, setpasswordagain] = useState("");
    const username = useRef();
    const [isactive, setActive] = useState(false);
    const [checkpasswordAgain, updatecheckpasswordAgain] = useState(null);
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

    const handlepassword = (e) => {
        setpasswordagain(e.target.value);

        //debounce
        if (checkpasswordAgain) {
            clearTimeout(checkpasswordAgain);
            updatecheckpasswordAgain(null);
        }
        const passwordAgainT = setTimeout(() => {
            if (e.target.value !== password.current.value) {
                e.target.classList.add("wrong");
            } else {
                e.target.classList.remove("wrong");
            }
        }, 500);
        updatecheckpasswordAgain(passwordAgainT);
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password.current.value !== passwordagain) {
            password.current.setCustomValidity("Password don't match");
        }
        setActive(true);
        try {
            await register(
                username.current.value,
                email.current.value,
                password.current.value
            );
            props.history.push("/login");
        } catch (error) {
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
                <div className="loginRight" onSubmit={handleSignup}>
                    <form className="loginBox">
                        <input
                            type="text"
                            placeholder="Username"
                            ref={username}
                            maxLength="18"
                            minLength="3"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            ref={email}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            ref={password}
                            maxLength="18"
                            minLength="6"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Input Password again"
                            value={passwordagain}
                            onChange={handlepassword}
                            maxLength="18"
                            minLength="6"
                            required
                        />
                        <button className="LoginButton" disabled={isactive}>
                            {isactive ? (
                                <CircularProgress size="20px" />
                            ) : (
                                "Create"
                            )}
                        </button>
                        <div className="loginForget">Forget password?</div>
                        <button
                            className="loginRegisterButton"
                            onClick={() => history.push("/login")}
                        >
                            Login
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
