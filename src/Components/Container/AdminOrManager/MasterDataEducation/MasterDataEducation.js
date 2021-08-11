import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import AuthContext from "../../../../Store/auth-context";
import "./MasterDataEducation.css";

const MasterDataEducation = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [educationList, setEducationList] = useState();


  function routeUpdateHandler(eduID){
    let path = `/edit-data-education/${eduID}`;
    history.push(path);
  }

  async function getDataEducation(){
    try{
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: token
        }
      }

      const response = await axios.get('/education/get-education',config);
      if(response.status === 202 || response.status === 200){
        console.log("GET LIST EDUCATION: "+ JSON.stringify(response.data.data));
        setEducationList(response.data.data.list);
      }else{
        throw new Error(response);
      }
    }catch(err){
      alert(err.message)
    }
  }

  async function deleteDataEducation(eduID){
    try{
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: token
        }
      }
      console.log("EDU ID: " + eduID)
      const response = await axios.delete(`/education/delete-education/${eduID}`, config);
      if(window.confirm("Are you sure to delete this content?")){
        if(response.status === 202 || response.status === 200){
          alert("Delete Success !");
          window.location.reload()
        }else{
          throw new Error(response)
        }
    }else{
      throw new Error(response)
    }
    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    getDataEducation();
  }, [])



  return (
    <section className="master-data-education">
      <h2>Education List</h2>
      <Link to={'/master-data-education/create-new-data-education'}><button className="btn btn-warning">Create New</button></Link>
      <div className="master-data-education-container">
        <ul className="data-education">
          {educationList === null ? <li>No Data</li> : null }
          {educationList?.map((val, index) => {
            return (
            <li className="list-data" key={val.education_id}>
              <div className="box-data">
                <div className="box-content">
                  <h3>{val.title}</h3>
                  <p>{val.content}</p>
                </div>
                <div className="btn-group" role="group">
                  <button className="btn btn-success" onClick={()=>routeUpdateHandler(val.education_id)}>Edit</button>
                  <button className="btn btn-danger" onClick={()=>deleteDataEducation(val.education_id)}>Delete</button>
                </div>
              </div>
            </li>
            )
          }) 
          }
        </ul>
      </div>
    </section>
  );
};

export default MasterDataEducation;
