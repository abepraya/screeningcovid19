import React, { useContext, useEffect, useState } from "react";
import "./DataScreening.css";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DetailInfo from "../../../../assets/Detail-Info/DetailInfo";
import Modal from "../../../../assets/Modal/Modal";
import AuthContext from "../../../../Store/auth-context";
import axios from "axios";
import Loading from "../../../../assets/Loading/Loading";


const DataScreening = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }));

  const classes = useStyles();
  const [acceptModal, setAcceptModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [userId, setUserId] = useState("");
  const authCtx = useContext(AuthContext);
  const [listScreeningUser, setListScreeningUser] = useState([]);
  const [dataScreeningDetail, setDataScreeningDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function openConfirmationBoxHandler(idUser){
    setAcceptModal(true);
    setUserId(idUser);
  }

  function openRejectBoxHandler(idUser){
    setRejectModal(true);
    setUserId(idUser);
  }

  async function submitAcceptHandler(){
    try{
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: token
        }
      }
      const bodyData = {
        'status_screener':'Approved',
        'screening_suggest': suggestion
      }

      const response = await axios.put(`/screening/update-screening/${userId}`,bodyData, config);
      if(response.status === 200 || response.status === 202){
        setIsLoading(false)
        console.log("GOOD JOB", response)
        setAcceptModal(false);
        window.location.reload();
      }else{
        setIsLoading(false);
        throw new Error(response);
      }
    }catch(err){
      alert(err.message)
    }
  }

  async function submitRejectHandler(){
    try{
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: token
        }
      }
      const bodyData = {
        'status_screener':'Declined',
        'screening_suggest': suggestion
      }

      const response = await axios.put(`/screening/update-screening/${userId}`,bodyData, config);
      if(response.status === 200 || response.status === 202){
        console.log("GOOD JOB", response)
        setRejectModal(false);
        window.location.reload();
      }else{
        throw new Error(response)
      }
    }catch(err){
      alert(err.message)
    }
  }

  async function getListDataScreening(){
    try{
      setIsLoading(true);
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: token
        }
      }
      
      const response = await axios.get("/screening/get-screening", config);

      if(response.status === 202 || response.status === 200){
        setIsLoading(false);
        console.log("RESP LIST DATA SCREENING: " + JSON.stringify(response.data.data));
        setListScreeningUser(response.data.data);
      }
      else{
        setIsLoading(false);
        throw new Error(response);
      }
    }catch(err){
      alert(err.message)
    }

  }

  async function getDetailDataScreening(screenerID){
    try{
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: token
        }
      }
      const response = await axios.get(`/screening/get-screening/${screenerID}`, config);
      if(response.status === 202 || response.status === 200){
        console.log("Masuk Gan")
        setDataScreeningDetail(response.data.data.detail_screening.file_url);
      }else{
        throw new Error(response)
      }
    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    getListDataScreening()
  }, [])

  console.log("data screening detail: " + dataScreeningDetail)

  return (
    <section className="data-screening">
      <h2>Data User Screening</h2>
      {isLoading && <Loading />}
      {acceptModal && <Modal setOpenModal={setAcceptModal} title="Accept Permission" labelInput="Note (Optional)" setSuggestion={setSuggestion} saveData={submitAcceptHandler} />}
      {rejectModal && <Modal setOpenModal={setRejectModal} title="Reject Permission" labelInput="Note (Optional)" setSuggestion={setSuggestion} saveData={submitRejectHandler} />}
      <div className="data-screening-container">
          <ul className="user-screening">
            {!listScreeningUser.list && <li>No Data</li>}
            {
            listScreeningUser.list?.map((val) => {
              // if(val.screening_status !== "Approved" && val.screening_status !=="Declined"){
              return (
              <li className="list-user-screening" key={val.screener_id}>
              <div className="box-data-screening">
                <div className="box-image">
                  <Avatar alt={val.name} src="/static/images/avatar/1.jpg" className={classes.large} />
                </div>
                <div className="box-description">
                  <h4>{val.name}</h4>
                  <p>{val.createdAt}</p>
                  <DetailInfo title="Detail Info" vaccineFile={val.file_type === "covid-screener" && val.file_url} testFile={val.file_type === "vaccine" && val.file_url} dataSymptom={val.symptom} />
                </div>
                <div className="btn-group" role="group">
                  <button className="btn btn-success" onClick={()=>openConfirmationBoxHandler(val.screener_id)}><i className="fas fa-check"/></button>
                  <button className="btn btn-danger" onClick={()=>openRejectBoxHandler(val.screener_id)}><i className="fas fa-trash"/></button>
                </div>
              </div>
              </li>)
              // }
            })}
          </ul>
      </div>
    </section>
  );
};

export default DataScreening;
