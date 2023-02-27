import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import EyePasswordHide from "../../icons/EyePasswordHide";
import EyePasswordShow from "../../icons/EyePasswordShow";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const passwordIcon = (
    <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
      {isPasswordShown ? <EyePasswordShow /> : <EyePasswordHide />}
    </div>
  );
  const handleAxiosError = (error) => {
    setErrorMessage(error.response.data.message);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setErrorMessage(
        "Password and confirm password field contain different value"
      );
    } else {
      try {
        return await axios
          .post("/api/users/signup", {
            email,
            username,
            password,
            passwordConfirm,
          })
          .then((response) => handleAxiosSuccess(response));
      } catch (err) {
        handleAxiosError(err);
      }
    }
  };

  const passwordInputType = isPasswordShown ? "text" : "password";

  const handleAxiosSuccess = (response) => {
    const user = response.data.user;
    const { _id, username } = user;

    window.localStorage.setItem("username", username);
    window.localStorage.setItem("id", _id);
    navigate("/");
  };
  const SignUpForm = (
    <form onSubmit={registerUser}>
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
        onClick={registerUser}
        className={styles.submitButton}
      >
        Register
      </button>
    </form>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <p className={styles.statusText}>{errorMessage}</p>
        {SignUpForm}
      </div>
    </div>
  );
};

export default SignUp;
