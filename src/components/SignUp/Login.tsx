import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import EyePasswordHide from "../../icons/EyePasswordHide";
import EyePasswordShow from "../../icons/EyePasswordShow";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { onLoginSuccess } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
type LoginUserData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleAxiosSuccess = (response) => {
    const user = response.data.user;
    if (!user) {
      // TODO there needs to be global frontend way of handling rejection
      window.alert("ooops there was a problem");
    } else {
      dispatch(onLoginSuccess(response.data));
      navigate("/messenger");
    }
  };

  const { register, handleSubmit } = useForm();
  const passwordIcon = (
    <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
      {isPasswordShown ? <EyePasswordShow /> : <EyePasswordHide />}
    </div>
  );

  const passwordInputType = isPasswordShown ? "text" : "password";

  const loginUser = (data: LoginUserData) =>
    axios
      .post("/api/users/login", data)
      .then((response) => handleAxiosSuccess(response));
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(loginUser)}>
          <div className={styles.signUp}>
            <label htmlFor={"email"}>Email</label>
            <input type={"email"} name={"email"} {...register("email")}></input>
            <label htmlFor={"new-password"}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={passwordInputType}
                autoComplete={"current-password"}
                id="current-password"
                {...register("password")}
              />
              {passwordIcon}
            </div>
          </div>
          <button
            type={"submit"}
            onClick={handleSubmit(loginUser)}
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
