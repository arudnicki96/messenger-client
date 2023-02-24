import axios from "axios";

const API_URL = "/api/users";

const register = (username, email, password, passwordConfirm) => {
  return axios.post(API_URL + "/signup", {
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        window.localStorage.setItem("user", response.data);
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  register,
  logout,
};
