import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../../../../assets/Loading/Loading';
import AuthContext from '../../../../Store/auth-context';
import { SigningIn } from '../../../Models/SigningIn';
import './SigninAdmin.css'

function SigninAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setrememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  function clearField() {
    setEmail("");
    setPassword("");
    setrememberMe(false);
  }
  async function submitHandler(event) {
    try {
      event.preventDefault();
      setIsLoading(true);
      const bodyReq = new SigningIn(email, password);
      console.log(bodyReq);

      await axios
        .post("/employee/auth/login", bodyReq)
        .then((response) => {
          console.log("HERE: " + JSON.stringify(response));
          if (email === "" && password === "") {
            setIsLoading(false);
            setErrorMessage("Please Input Email and Password");
          } else if (response.status === 202) {
            console.log(
              "Sukses LOGIN TOKEN: ",
              response.data.data.access_token
            );
            localStorage.setItem('rememberMe', rememberMe);
            localStorage.setItem('user', rememberMe? email : '');
            localStorage.setItem('pass', rememberMe? password : '');
            setIsLoading(false);
            const token = response.data.data.access_token;
            // const expirationTime = new Date((new Date().getTime() + 3600000))
            authCtx.loginAdmin(token, Date.now() + 86400000); //session 24 hours
            history.push("/dashboard");
          } else {
            setErrorMessage("Invalid Email or Password");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("CATCH ERR: " + error);
          if (
            error.response.data.meta.message ===
            "Password atau email/nomor hp tidak benar"
          ) {
            setIsLoading(false);
            setErrorMessage(error.response.data.meta.message);
          } else {
            setIsLoading(false);
            setErrorMessage("Please Input Email and Password !");
          }
        });

      setIsLoading(false);
      clearField();
    } catch (error) {
      console.log("TEST ERROR: ", error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const user = rememberMe ? localStorage.getItem('user') : '';
        const secretPass = rememberMe ? localStorage.getItem('pass') : '';
        setEmail(user);
        setPassword(secretPass);
        setrememberMe(rememberMe);
        
  }, []);
    return (
        <header className="login">
        <div className="login-container">
          <form className="Forms" onSubmit={submitHandler}>
            {isLoading ? <Loading /> : null}
            <h3>Sign In</h3>
            {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
            <div className="input-group mt-3">
            <span class="input-group-text" id="addon-wrapping"><i className="material-icons">person</i></span>
                  <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
  
            <div className="input-group mt-3">
            <span class="input-group-text" id="addon-wrapping"><i className="material-icons">lock_outline</i></span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
  
            <div className="input-group mt-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                  checked={rememberMe}
                  onChange={(e) => setrememberMe(e.target.checked)}
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
  
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="/admin-signup"><button className="btn btn-danger" type="button"><i className="fas fa-clinic-medical" style={{marginRight:"10px;"}}/>&nbsp;&nbsp;Signup</button></Link>
                  <button className="btn btn-primary me-md-2" type="submit"><i className="fas fa-sign-in-alt" style={{marginRight:"12px;"}}/>&nbsp;&nbsp;Login</button>
            </div>
          </form>
        </div>
      </header>
    )
}

export default SigninAdmin;
