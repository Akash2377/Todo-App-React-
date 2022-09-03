import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../Redux/action";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [userData, setUserData] = React.useState({ email: "", password: "" });
  const [userLogin, setLoginRes] = React.useState([]);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = userData;
  React.useEffect(() => {
    const getLoginData = () => {
      fetch("http://localhost:8080/loginDetails")
        .then((res) => res.json())
        .then((res) => setLoginRes(res))
        .catch((err) => console.log(err));
    };
    getLoginData();
  }, []);

  const changeLoginStatus = () => {
    const checkDetails = userLogin.filter((user) => {
      return user.email === email && user.password === password;
    });
    if (checkDetails.length > 0) {
      localStorage.setItem("loginKey", true);
      dispatch(isLogin(true));
      navigator("/");
      return;
    } else {
      alert("Wrong Credentials");
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password"
        onChange={handleChange}
      />
      <button onClick={changeLoginStatus}>Login</button>
    </div>
  );
};

export default Login;
