import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../../Store/auth-context";
import './adminNavbar.css';

const AdminNavbar = (props) => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const [dataUser, setDataUser] = useState({
    name:'',
    role:''
  });
  const history = useHistory();
  async function signoutHandler(){
    try{
        let token;
        token = `Bearer ${authCtx.tokenSuper}`;
        let config = {
          headers:{
            Authorization: token
          }
        }
        const response = await axios.put('/account/logout-account', null, config);
        if(response.status === 200 || response.status === 202){
            console.log("Success");
            authCtx.logoutAdmin();
            history.replace('/admin-login');

        }else{
            throw new Error(response);
        }
    }catch(err){
        alert(err.message);
    }
  }

  async function getAdminData(){
    try{
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.get('/account/get-employee/profile', config);
      if(response.status === 202){
        setDataUser({
          name: response.data.data.name,
          role: response.data.data.role
        })
      }
      else{
        throw new Error(response);
      }
    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    getAdminData();
    
  }, [])

  return (
    <div className="w3-sidebar w3-light-grey w3-bar-block">
      <ul>
      <h3 className="w3-bar-item">{dataUser.name} / {dataUser.role}</h3>
        {isAdmin && (dataUser.role === "Hospital Manager" || dataUser.role === "Hospital Staff" || dataUser.role === "Admin")? <Link to="/dashboard"><li className="w3-bar-item w3-button">
            Dashboard
        </li></Link> : null}
        {isAdmin && (dataUser.role === "Hospital Manager" || dataUser.role === "Hospital Staff")? null : <Link to="/master-data-education"><li className="w3-bar-item w3-button">
            Master Data Education
        </li></Link>}
        {/* {isAdmin && (dataUser.role === "Hospital Manager" || dataUser.role === "Hospital Staff")? null : <Link to="/news"><li className="w3-bar-item w3-button">
            News
        </li></Link>} */}
        {isAdmin && (dataUser.role === "Hospital Manager" || dataUser.role === "Admin")? null : <Link to="/data-screening"><li className="w3-bar-item w3-button">
            Data Screening
        </li></Link>}
        {isAdmin && (dataUser.role === "Hospital Manager" || dataUser.role === "Hospital Staff" || dataUser.role === "Admin")? <li className="w3-bar-item w3-button" onClick={signoutHandler}>
        Signout
        </li> : null}
      </ul>
    </div>
  );
};

export default AdminNavbar;
