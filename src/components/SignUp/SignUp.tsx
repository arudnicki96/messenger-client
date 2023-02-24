import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import EyePasswordHide from "../../icons/EyePasswordHide";
import EyePasswordShow from "../../icons/EyePasswordShow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

enum actions {
  login = "Login",
  register = "Register",
}

type RegisterUserData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type LoginUserData = {
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [userAction, setUserAction] = useState<actions>(actions.login);

  const { register, handleSubmit } = useForm();
  const passwordIcon = (
    <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
      {isPasswordShown ? <EyePasswordShow /> : <EyePasswordHide />}
    </div>
  );

  const loginUser = (data: LoginUserData) =>
    axios
      .post("/api/users/login", data)
      .then((response) => handleAxiosSuccess(response));

  const registerUser = (data: RegisterUserData) => {
    axios
      .post("/api/users/signup", data)
      .then((response) => handleAxiosSuccess(response));
  };

  const passwordInputType = isPasswordShown ? "text" : "password";

  const handleAxiosSuccess = (response) => {
    const user = response.data.user;
    const { _id, username } = user;
    if (!user) {
      // TODO there needs to be global frontend way of handling rejection
      window.alert("ooops there was a problem");
    } else {
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("id", _id);
      navigate("/messenger");
    }
  };
  const LoginForm = (
    <div>
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
          {userAction}
        </button>
      </form>
      <div
        className={styles.registerLink}
        onClick={() => setUserAction(actions.register)}
      >
        Don't have account yet? Tap to register
      </div>
    </div>
  );

  const SignUpForm = (
    <form onSubmit={handleSubmit(registerUser)}>
      <div className={styles.signUp}>
        <label htmlFor={"email"}>Email</label>
        <input type={"email"} name={"email"} {...register("email")}></input>
        <label htmlFor={"username"}>Username</label>
        <input
          type={"text"}
          name={"username"}
          {...register("username")}
        ></input>
        <label htmlFor={"new-password"}>Password</label>
        <div className={styles.inputWrapper}>
          <input
            type={passwordInputType}
            autoComplete={"new-password"}
            id="new-password"
            {...register("password")}
          />
          {passwordIcon}
        </div>
        <label htmlFor={"passwordConfirm"}>Confirm Password</label>
        <div className={styles.inputWrapper}>
          <input
            type={passwordInputType}
            name={"passwordConfirm"}
            {...register("passwordConfirm")}
          ></input>
          {passwordIcon}
        </div>
      </div>
      <button
        type={"submit"}
        onClick={handleSubmit(registerUser)}
        className={styles.submitButton}
      >
        {userAction}
      </button>
    </form>
  );
  const currentForm = userAction === actions.login ? LoginForm : SignUpForm;

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>{currentForm}</div>
    </div>
  );
};

export default SignUp;
