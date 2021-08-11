import React,{useContext, useEffect, useRef, useState} from 'react';
import './UserProfile.css';
import { useHistory } from 'react-router';
import QRCode from "react-qr-code";
import axios from 'axios';
import AuthContext from '../../../Store/auth-context';
import Loading from '../../../assets/Loading/Loading';
import { isEmpty } from '../../../Store/utility';
import { Container } from '@material-ui/core';
import EditProfile from '../Profile/EditProfile/EditProfile';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router ,Link, Switch, useRouteMatch, useParams, Route } from 'react-router-dom';
import Moment from 'moment';
import ModalScreeningResult from '../../../assets/ModalScreeningResult/ModalScreeningResult';

const UserProfile = ({screeningData, scheduleData}) => {
const imageDefault = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
const [userData, setUserData] = useState({});
const [footerOff, setFooterOff] = useState(false);
const [userAvatar, setUserAvatar] = useState();
const [isLoading, setIsLoading] = useState(false);
const [dataScreening, setDataScreening] = useState();
const [openModal, setOpenModal] = useState(false);
const [detailScreening, setDetailScreening] = useState({
    screeningStatus:'',
    screeningSuggest:'',
    symptom:[]
})

const history = useHistory();
const inputRef = useRef();
const authCtx = useContext(AuthContext);
const userIsLoggedIn = authCtx.isLoggedIn;
const profilePicture = authCtx.profilePicture;
let {path, url } = useRouteMatch();

const triggerFileSelect = () => inputRef.current.click();

    async function getDataScreening(){
        try{
            setIsLoading(true)
            let token = `Bearer ${authCtx.token}`;
            const config = {
                headers:{
                    Authorization: token
                }
            }

            const response = await axios.get("/account/all-screener", config);
            if(response.status === 202 || response.status === 200){
                setIsLoading(false);
                setDataScreening(response.data.data.list)
            }else{
                throw new Error(response);
            }
        }catch(err){
            alert(err.message);
        }
    }

    async function openModalHandler(screenerId){
        try{
            setIsLoading(true)
            setOpenModal(true);
            let token = `Bearer ${authCtx.token}`;
            const config = {
                headers:{
                    Authorization: token
                }
            }

            const response = await axios.get(`/account/detail-screener/${screenerId}`, config);
            if(response.status === 200 || response.status === 202){
                setIsLoading(false);
                setDetailScreening({
                    ...detailScreening,
                    screeningStatus: response.data.data.detail_screening.screening_status,
                    screeningSuggest: response.data.data.detail_screening.screening_suggest,
                    symptom: response.data.data.detail_screening.symptom
                })
            }else{
                setIsLoading(false);
                throw new Error(response)
            }

        }catch(err){
            alert(err.message)
        }
    }


    function avatarChangeHandler(file){
        setUserAvatar(file);
    }

    function routeEditProfile(){
        let path = `\edit-profile`;
        history.push(path);
    }

    console.log("Check Data Screening: "+ JSON.stringify(dataScreening))

    async function submitHandler(event){
        try{
            event.preventDefault();
            setIsLoading(true);
            let file = userAvatar;
            console.log(file);
            let token = authCtx.token;
            const formBodyData = new FormData();
            formBodyData.append('upload-file',file);
            console.log(formBodyData);
            const response = await axios.post("/account/upload-file/avatar",formBodyData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });

            if(response.status === 200){
                setIsLoading(false);
                setUserAvatar(response.data);
                authCtx.avatars(userAvatar);
                alert("UPLOAD SUCCESS!");
                window.location.reload();
            }else{
                setIsLoading(false);
                alert("UPLOAD FAILED! \n File Size Too Big or Not Allowed !");
                throw new Error("UPLOAD FAILED" + JSON.stringify(response));
            }
            setUserAvatar('');
        }catch(error){
            console.log("CATCH ERROR: " + error);
        }
    }

    useEffect(() => {
        Aos.init({duration: 2000});
        setIsLoading(true);
        async function getProfile(){
            const token = authCtx.token;
            await axios.get('/account/get-user/profile',{
              headers:{
                'Authorization':`Bearer ${token}`,
              }
            }).then(response => {
              console.log("DATA: " + JSON.stringify(response.data.data));
              console.log("STATUS: " + response.status);
              if(response.status === 200 || response.statusText === "OK"){
                setIsLoading(false);
                setUserData(response.data.data);
              }else{
                  setIsLoading(false);
                throw new Error(`Can't Access Data Case. Detail : ${response}`);
              }
            })
            .catch(error => {  
                setIsLoading(false);
                console.log("useEffect Error: ",error.message);
            })
            
            await axios.interceptors.response.use(response => {
              
              return response;
            }, error => {
              if (error.response.status === 401) {
                console.log(error.response);
              }    
              return error;
            });
          }
        getProfile();
        getDataScreening();

        if(!isEmpty(userData.image_url)){
            authCtx.avatars(userData.image_url)
        }else if(!isEmpty(userAvatar)){
            authCtx.avatars(userAvatar)
        }
        
    }, [])

    console.log("EEH"+ profilePicture)
    Moment.locale("en");

    return (
        <div>
            {isLoading? <Loading /> : null}
            {openModal && <ModalScreeningResult setOpenModal={setOpenModal} labelInput="Sugguestion" suggestion={detailScreening.screeningSuggest} title="Result" screeningStatus={detailScreening.screeningStatus} symptom={detailScreening.symptom}  />}
        <main className="main">
        <header className="profile" data-aos="fade-up">
                <h1>Profile</h1>
                <div className="profile-container">
                    <div className="profile-img">
                    {isLoading?
                        (
                            <div className="avatar spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                            </div>
                            ):
                            (<img className="avatar" src={isEmpty(userData.image_url)?  imageDefault : userData.image_url} alt="profile-picture" id="img" onClick={triggerFileSelect} />)
                        }
                    <input id="input" type="file" accept="image/*" multiple={false} onChange={(e)=>avatarChangeHandler(e.target.files[0])} ref={inputRef} style={{display:"none"}} />
                            {isLoading?
                            (
                                <button className="btn-editProfile btn btn-success btn-block" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                                </button>
                                ):
                                (<button type="submit" className="btn-editProfile btn btn-success btn-block" onClick={submitHandler}>Upload Photo</button>)}
                             <Link to={'/profile/edit-profile'} >
                            <button type="submit" className="btn-editProfile btn btn-primary btn-block" onClick={routeEditProfile}>Edit Profile</button>
                            </Link>
                    </div>
                    <div className="profile-description">
                        <h3>{userData.full_name}</h3>
                        {isLoading? null : <h3>{userData.gender === "male"? <i className="fas fa-mars" style={{color:"rgb(30,144,255)"}}/>: <i className="fas fa-venus" style={{color:"rgb(221,160,221)"}}/>}</h3>}
                        <p>{userData.address}</p> 
                    </div>
                    <div className="qrcode">
                        <QRCode value={JSON.stringify(userData)} size={205} />
                        <h5>{userData.ktp_number}</h5>
                    </div>
                </div>
        </header>
                </main>
                {/* <div className="schedule" data-aos="fade-up">
                        <h2>Schedule Test</h2>
                            <div className="schedule-container">
                                {scheduleData ? <h5>No Data</h5> : (<><div className="schedule-img">
                                <QRCode value={JSON.stringify(userData)} size={115} />
                                </div>
                                <div className="schedule-description">
                                   <h3>Type</h3>
                                   <p>Date</p>
                                   <p>Time</p>
                                </div></>)}
                            </div>
                </div> */}
                <div className="history-screening" data-aos="fade-up">
                    <h2>History Screening</h2>
                    <div className="history-screening-container">
                        <div className="history-screening-img">
                           {dataScreening?.map((val, key)=>{
                               return(
                                <div class="qrcodes-screening">
                                <QRCode value={val} size={115} key={val.ID} onClick={()=>openModalHandler(val.screener_id)} />
                                <p>{Moment(val.createdAt).format("DD MMM YYYY")}</p>
                                </div>
                               )
                           })}
                        </div>
                        <div className="history-screening-description">
                        </div>
                    </div>
                </div>
                </div>
    )
}

export default UserProfile;
