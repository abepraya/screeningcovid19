import React, { useCallback, useEffect, useState } from "react";
import Footer from "../assets/Footer/Footer";

let logoutTimer;
let logoutTimerAdmin;

const AuthContext = React.createContext({
  token: "",
  tokenSuper:"",
  isUploadedAvatar: false,
  isAdmin: false,
  isLoggedIn: false,
  avatars: () => {},
  login: (token) => {},
  logout: () => {},
  loginAdmin: (tokenSuper) => {},
  logoutAdmin: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialTokenSuper = localStorage.getItem("tokenSuper");
  const [token, setToken] = useState(initialToken);
  const [tokenSuper, setTokenSuper] = useState(initialTokenSuper);
  const [avatar, setAvatar] = useState();
  const isLoggedIn = !!token;
  const isUploadedAvatar = !!avatar;
  const isAdmin = !!tokenSuper;

  const login = (token, expirationTime) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    logoutTimer = setTimeout(logout, expirationTime - Date.now());
    setToken(token);
  };

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    clearTimeout(logoutTimer);
  }, []);

  const loginAdmin = (tokenSuper, expirationTimeAdmin) => {
    localStorage.setItem("tokenSuper", tokenSuper);
    localStorage.setItem("expirationTimeAdmin",expirationTimeAdmin);
    logoutTimerAdmin = setTimeout(logoutAdmin, expirationTimeAdmin - Date.now());
    setTokenSuper(tokenSuper);
  }

  const logoutAdmin = useCallback(()=> {
    setTokenSuper(null);
    localStorage.removeItem("tokenSuper");
    localStorage.removeItem("expirationTimeAdmin");
    clearTimeout(logoutTimerAdmin);
  },[])

  const avatars = (file) => {
    setAvatar(file);
  };

  useEffect(() => {
    if (token) {
      let timeLeft = localStorage.getItem("expirationTime") - Date.now();
      if (timeLeft < 6000) timeLeft = 0;
      logoutTimer = setTimeout(logout, timeLeft);
    }
    else if (tokenSuper){
      let timeLeftAdmin = localStorage.getItem("expirationTimeAdmin") - Date.now();
      if(timeLeftAdmin < 6000) timeLeftAdmin = 0;
      logoutTimerAdmin = setTimeout(logoutAdmin, timeLeftAdmin);
    }
    else{
      return;
    }
  }, [token, logout, tokenSuper, logoutAdmin]);

  const contextValue = {
    token,
    tokenSuper,
    isAdmin,
    isLoggedIn,
    isUploadedAvatar,
    avatars,
    login,
    logout,
    loginAdmin,
    logoutAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
