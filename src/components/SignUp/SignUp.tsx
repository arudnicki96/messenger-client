import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import EyePasswordHide from "../../icons/EyePasswordHide";
import EyePasswordShow from "../../icons/EyePasswordShow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type RegisterUserData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();
  const passwordIcon = (
    <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
      {isPasswordShown ? <EyePasswordShow /> : <EyePasswordHide />}
    </div>
  );

  const registerUser = async (data: RegisterUserData) => {
    return await axios
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
      navigate("/");
    }
  };
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
        Register
      </button>
    </form>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>{SignUpForm}</div>
    </div>
  );
};

export default SignUp;
