import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLogin } from "../Redux/action";
const Navbar = () => {
  const stateInfo = useSelector((state) => state.islogin);
  const dispatch = useDispatch();
  const loginStatus = localStorage.getItem("loginKey");
  return (
    <div className="navbar_Container">
      <Link to="/" className="buttonNav">
        Home
      </Link>
      <h1 style={{ fontFamily: "cursive", color: "white" }}>
        TODO APPLICATION
      </h1>
      <Link to="/login">
        {stateInfo === true || loginStatus === "true" ? (
          <button
            className="buttonNav"
            onClick={() => {
              localStorage.setItem("loginKey", false);
              return dispatch(isLogin(false));
            }}
          >
            Logout
          </button>
        ) : (
          ""
        )}
      </Link>
    </div>
  );
};

export default Navbar;
