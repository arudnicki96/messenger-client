import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import EyePasswordHide from "../../icons/EyePasswordHide";
import EyePasswordShow from "../../icons/EyePasswordShow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

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
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [userAction, setUserAction] = useState<actions>(actions.login);

  const passwordIcon = (
    <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
      {isPasswordShown ? <EyePasswordShow /> : <EyePasswordHide />}
    </div>
  );
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

  const registerMutation = useMutation(
    (data: RegisterUserData) => {
      return axios.post("/api/users/signup", data);
    },
    {
      onSuccess: (response) => {
        handleAxiosSuccess(response);
      },
    }
  );

  const loginMutation = useMutation(
    (data: LoginUserData) => {
      return axios.post("/api/users/login", data);
    },
    {
      onSuccess: (response) => handleAxiosSuccess(response),
    }
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({
      email: email,
      password: password,
    });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate({
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    });
  };
  const LoginForm = (
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
    <form onSubmit={registerSubmit}>
      <div className={styles.signUp}>
        <label htmlFor={"email"}>Email</label>
        <input
          type={"email"}
          name={"email"}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor={"username"}>Username</label>
        <input
          type={"text"}
          name={"username"}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor={"new-password"}>Password</label>
        <div className={styles.inputWrapper}>
          <input
            type={passwordInputType}
            autoComplete={"new-password"}
            id="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordIcon}
        </div>
        <label htmlFor={"passwordConfirm"}>Confirm Password</label>
        <div className={styles.inputWrapper}>
          <input
            type={passwordInputType}
            name={"passwordConfirm"}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></input>
          {passwordIcon}
        </div>
      </div>
      <button
        type={"submit"}
        onClick={registerSubmit}
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
