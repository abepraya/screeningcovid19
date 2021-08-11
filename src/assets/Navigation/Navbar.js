import React, { useContext, useState } from 'react';
import './Navbar.css';
import Logo from '../Img/LogoRS/logo-rsup-persahabatan.png'
import { useHistory } from 'react-router';
import AuthContext from '../../Store/auth-context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Container } from '@material-ui/core';


export const Navbar = (props) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    async function signOutHandler(){
        try{
          setIsLoading(true)
          const token = `Bearer ${authCtx.token}`;
      
          let config = {
            headers:{
              Authorization: token
            }
          }
      
          const response = await axios.delete('/account/logout-account', config);
          if(response.status === 202){
            setIsLoading(false);
            authCtx.logout();
            history.replace('/');
          }else{
            throw new Error("FAILED LOGOUT ! " + response.statusText);
          }
        
          await axios.interceptors.response.use(response => {
            alert("Interceptor1: " + JSON.stringify(response))
            return response;
         }, error => {
            alert("Interceptor2: " + error)
           return error;
         });
        }catch(error){
          console.error("LOGOUT ERROR !" + error.message);
        }
    }

    return (
        <div className="banner">
            <div className="navbar">
                {isLoading? <Loading /> : null}
                <Link to={isLoggedIn? "/home" : "/"}><img className="logo" src={Logo} alt="brand-logo" /></Link>
                <ul>
                    {isLoggedIn && <Link to="/home"><li><a><i className="fas fa-home" style={{marginRight:"10px;"}}/>home</a></li></Link>}
                    {isLoggedIn && <Link to="/about"><li><a><i class="fas fa-info" style={{marginRight:"10px;"}}/>About</a></li></Link>}
                    {isLoggedIn && <Link to="/education"><li><a><i class="fas fa-graduation-cap" style={{marginRight:"10px;"}}/>Education</a></li></Link>}
                    {isLoggedIn && <Link to="/screening"><li><a><i class="fas fa-tasks" style={{marginRight:"10px;"}}/>Screening</a></li></Link>}
                    {isLoggedIn && <Link to="/profile"><li><a><i class="fas fa-user-alt" style={{marginRight:"10px;"}}/>Profile</a></li></Link>}
                    {isLoggedIn && <Link><li onClick={signOutHandler} ><a><i class="fas fa-sign-out-alt" style={{marginRight:"10px;"}}/>Signout</a></li></Link>}
                </ul>
            </div>           
        </div>
    )
}


export default Navbar;
