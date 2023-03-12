import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import EyePasswordHide from "../../icons/EyePasswordHide";
import EyePasswordShow from "../../icons/EyePasswordShow";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { onLoginSuccess } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { LoginSuccessResponse } from "../../types/loginSuccessResponse";
import socket from "../../socket/socket";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleAxiosSuccess = (response: AxiosResponse) => {
    const data: LoginSuccessResponse = response.data;
    dispatch(onLoginSuccess(data));
    socket.auth = { userId: data.user._id, username: data.user.username };
    socket.connect();

    navigate("/messenger");
  };

  socket.on("connect_error", (err) => {
    if (err.message) Swal.fire(err.message);
  });
  const passwordIcon = (
    <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
      {isPasswordShown ? <EyePasswordShow /> : <EyePasswordHide />}
    </div>
  );

  const passwordInputType = isPasswordShown ? "text" : "password";
  const handleAxiosError = (error) => {
    setErrorMessage(error.response.data.message);
  };
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/api/users/login", {
          email: email,
          password: password,
        })
        .then((response) => handleAxiosSuccess(response));
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form onSubmit={loginUser}>
          <p className={styles.statusText}>{errorMessage}</p>
          <div className={styles.signUp}>
            <label htmlFor={"email"}>Email</label>
            <input
              type={"email"}
              name={"email"}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setErrorMessage("")}
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
            onClick={loginUser}
            className={styles.submitButton}
          >
            Login
          </button>
        </form>

        <div
          className={styles.registerLink}
          onClick={() => navigate("/register")}
        >
          Don't have account yet? Tap to register
        </div>
      </div>
    </div>
  );
};

export default Login;
