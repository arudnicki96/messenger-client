import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import EyePasswordHide from "../../icons/EyePasswordHide";
import EyePasswordShow from "../../icons/EyePasswordShow";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";
import { RootState } from "../../store";
const Login = (props) => {
  const navigate = useNavigate();

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password)).then(() => {
      navigate("/messenger");
      window.location.reload();
    });
  };

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const passwordIcon = (
    <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
      {isPasswordShown ? <EyePasswordShow /> : <EyePasswordHide />}
    </div>
  );
  const passwordInputType = isPasswordShown ? "text" : "password";

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <div className={styles.signUp}>
          <label htmlFor={"email"}>Email</label>
          <input
            type={"email"}
            name={"email"}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor={"new-password"}>Password</label>
          <div className={styles.inputWrapper}>
            <input
              type={passwordInputType}
              autoComplete={"current-password"}
              id="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordIcon}
          </div>
        </div>
        <button
          type={"submit"}
          onClick={loginSubmit}
          className={styles.submitButton}
        >
          Login
        </button>
      </form>
      <div className={styles.registerLink}>
        Don't have account yet? Tap to register
      </div>
    </div>
  );
};

export default Login;
