import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import Login from "./Components/Container/Auth/SignIn/Login";
import SignUp from "./Components/Container/Auth/SignUp/Signup";
import Home from './Components/Container/Home/Home';
import NotFound from './Components/Container/ErrorPage/NotFound';
import WelcomePage from './Components/Container/Welcome/LandingPage';
import UserProfile from './Components/Container/Profile/UserProfile';
import EditProfile from './Components/Container/Profile/EditProfile/EditProfile';
import Screening from './Components/Container/Screening/Screening';
import SymptomsForm from './Components/Container/Screening/SymptomsForm/SymptomsForm';
import React,{ useEffect, useState, useContext } from 'react';
import About from './Components/Container/About/About';
import AuthContext from './Store/auth-context';
import Navbar from './assets/Navigation/Navbar';
import '../src/App.css';
import Footer from './assets/Footer/Footer';
import Education from './Components/Container/Education/Education';
import ScrollToTop from './ScrollToTop';
import AdminNavbar from './assets/Navigation/admin-navbar/adminNavbar';
import Dashboard from './Components/Container/AdminOrManager/Dashboard/Dashboard';
import MasterDataEducation from './Components/Container/AdminOrManager/MasterDataEducation/MasterDataEducation';
import DataScreening from './Components/Container/AdminOrManager/DataScreening/DataScreening';
import CreateDataEducation from './Components/Container/AdminOrManager/MasterDataEducation/CreateDataEducation/CreateDataEducation';
import UpdateDataEducation from './Components/Container/AdminOrManager/MasterDataEducation/UpdateDataEducation/UpdateDataEducation';
import News from './Components/Container/AdminOrManager/News/News';
import CreateNews from './Components/Container/AdminOrManager/News/CreateNews/CreateNews';
import UpdateNews from './Components/Container/AdminOrManager/News/UpdateNews/UpdateNews';
import SigninAdmin from './Components/Container/AdminOrManager/AuthAdmin/SigninAdmin';
import SignupAdmin from './Components/Container/AdminOrManager/AuthAdmin/SignupAdmin/SignupAdmin';


function App() {
  const authCtx = useContext(AuthContext)
  const [userData, setUserData] = useState({});
  const [screeningData, setScreeningData] = useState({});
  const [scheduleData, setScheduleData] = useState({});
  const [open, setOpen] = useState(false);

    // useEffect(() => {
    //   async function getProfile(){
    //     await axios.get('/account/get-user/profile').then(response => {
    //       console.log("DATA: " + JSON.stringify(response.data.data));
    //       console.log("STATUS: " + response.status);
    //       if(response.status === 200 || response.statusText === "OK"){
    //         setUserData(response.data.data);
    //       }
    //     })
    //     .catch(error => {    
    //       console.log("useEffect Error: ",error.message);
    //     })
        
    //     await axios.interceptors.response.use(response => {
          
    //       return response;
    //     }, error => {
    //       if (error.response.status === 401) {
    //         console.log(error.response);
    //       }    
    //       return error;
    //     });
    //   }
      
    //   getProfile();
      
    //     return () => {
    //       setUserData({});
    //     };
      
      
    // }, [])

  return (
  <Router>
    <ScrollToTop />
        <div className="App">
          {authCtx.isAdmin? <AdminNavbar /> : <Navbar />}
                <Switch>
                    <Route exact path="/" component={authCtx.isLoggedIn? Home : WelcomePage} />
                    <Route path='/unauthorized' component={NotFound} />
                    {!authCtx.isLoggedIn && (<Route path="/sign-in" component={()=> <Login />} />)}
                    {!authCtx.isLoggedIn && (<Route path="/sign-up" component={SignUp} />)}
                    {authCtx.isLoggedIn && (<Route path="/home" component={()=><Home screeningData={screeningData} />} />)}
                    {authCtx.isLoggedIn && (<Route path="/education" component={()=><Education />} />)}
                    {authCtx.isLoggedIn && (<Route path="/profile" exact component={()=> <UserProfile user={userData} screeningData={screeningData} scheduleData={scheduleData} />} />)}
                    {authCtx.isLoggedIn && (<Route path="/profile/:id" component={()=><EditProfile user={userData} />}/>)}
                    {authCtx.isLoggedIn && (<Route path="/screening" exact component={Screening}/>)}
                    {authCtx.isLoggedIn && (<Route path="/screening/:id" component={SymptomsForm}/>)}
                    {authCtx.isLoggedIn && (<Route path="/about" component={()=><About user={userData} />} />)}
                    {!authCtx.isAdmin && (<Route path="/admin-login" component={() => <SigninAdmin />} />)}
                    {!authCtx.isAdmin && (<Route path="/admin-signup" component={() => <SignupAdmin />} />)}
                    {authCtx.isAdmin && (<Route path="/dashboard" component={()=> <Dashboard />} />)}
                    {authCtx.isAdmin && (<Route path="/master-data-education" exact component={()=> <MasterDataEducation />} />)}
                    {authCtx.isAdmin && (<Route path="/master-data-education/:id" component={()=> <CreateDataEducation />} />)}
                    {authCtx.isAdmin && (<Route path="/edit-data-education" component={()=> <UpdateDataEducation />} />)}
                    {authCtx.isAdmin && (<Route path="/news" exact component={()=> <News />} />)}
                    {authCtx.isAdmin && (<Route path="/news/:id" component={()=> <CreateNews />} />)}
                    {authCtx.isAdmin && (<Route path="/edit-news" component={()=> <UpdateNews />} />)}
                    {authCtx.isAdmin && (<Route path="/data-screening" exact component={()=><DataScreening />} />)}
                    <Route path="*">  
                      <Redirect to='/unauthorized' />
                    </Route>
                </Switch>
            {!authCtx.isAdmin && <Footer />}
        </div>
    </Router>
  )
}

export default App;