import axios from "axios";
import Moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../../../assets/Card/Card";
import Chart from "../../../../assets/Chart/Chart";
import { formatCase } from "../../../../Store/utility";
import "./Dashboard.css";
import Loading from '../../../../assets/Loading/Loading';
import ReactPlayer from 'react-player'
import ENV from '../../../../Store/ENV';
import AuthContext from "../../../../Store/auth-context";
import { ResponsiveEmbed } from "react-bootstrap";

const Dashboard = (props) => {
  const [dataCase, setDataCase] = useState([]);
  const [visitorCase, setVisitorCase] = useState();
  const [dataAdmin, setDataAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  async function getDataAdmin(){
    try{
      setIsLoading(true)
      let tokenAdmin = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: tokenAdmin
        }
      }

      const response = await axios.get("/account/get-employee/profile", config);
      if(response.status === 202 || response.status === 200){
        setIsLoading(false);
        console.log("DATA ADMIN: "+ JSON.stringify(response.data));
        setDataAdmin(response.data.data.name);
      }else{
        setIsLoading(false);
        throw new Error(response);
      }
    }catch(err){
      alert(err.message);
    }
  }

  async function getVisitorData(){
    try{
      setIsLoading(true)
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: token
        }
      };

      const response = await axios.get('/manager/get-data/screening', config);
      if(response.status === 202){
        setIsLoading(false)
        setVisitorCase(response.data.data);
      }else{
        throw new Error(response)
      }
    }catch(err){
      alert(err.message)
    }
  }

  async function getDataCase(){
    try{
      setIsLoading(true);
      const response = await axios.get('/countries/IDN');
      let content;
      if(response.status === 202 || response.status === 200){
        setIsLoading(false);
        content = await response.data;
        let arrContent = [content.confirmed.value, content.recovered.value, content.deaths.value, content.lastUpdate];
        setTimeout(() => {
          setDataCase(arrContent);
        }, 5000);
      }else{
        setIsLoading(false);
        throw new Error(response);
      }

    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    getDataCase();
    getDataAdmin();
    getVisitorData();

    return () => {
      setDataCase("");
    }
    
  }, [])

  Moment.locale("en");
  let date = dataCase[3];
  let confirmed = dataCase[0];
  let recovered = dataCase[1];
  let deaths = dataCase[2];


  console.log("Visitor Case: " + JSON.stringify(visitorCase))
  return (
    <>
    <main className="main">
      <header className="header admin-header">
        <h1>Welcome {dataAdmin}</h1>
      </header>
    </main>
      <section className="dashboard">
        <h1>Case Indonesia</h1>
      <div className="dashboard-container">
      {isLoading? <Loading /> : dataCase === undefined ? null :(
        <>
        <Card
        title="Confirmed"
        value={formatCase(confirmed)}
        img="https://icon-library.com/images/join-icon-png/join-icon-png-6.jpg"
        lastUpdate={Moment(date).format("DD MMM YYYY")}
        />
        <Card
        title="Recovered"
        value={formatCase(recovered)}
        img="https://image.flaticon.com/icons/png/512/1512/1512922.png"
        lastUpdate={Moment(date).format("DD MMM YYYY")}
        />
        <Card
        title="Deaths"
        value={formatCase(deaths)}
        img="https://cdn.iconscout.com/icon/free/png-256/death-2511679-2103286.png"
        lastUpdate={Moment(date).format("DD MMM YYYY")}
        />
        </>
      )}
      </div>
      </section>
      <section className="visitor">
        <h2>Screening Report COVID-19</h2>
        <div className="visitor-container">
          {visitorCase?.data?.map((val, index) => {
            return (
              <>
              <Card 
              title={val.status_screening}
              img="https://icon-library.com/images/2ac006fd9e_12296.png"
              value={val.total_data}
              lastUpdate={Moment(Date.now()).format("DD MMM YYYY")}
              />
              </>
            )
          })}
          
        </div>
      </section>
      <section className="video-player">
        <h2>Introduction RSUP Persahabatan</h2>
        <div className="video-player-container">
          <div className="video">
            <ReactPlayer url={ENV.video_intro_url} loop="true" playbackRate="1" style={{borderRadius:"25px;"}} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
