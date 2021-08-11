import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../../../../../assets/Loading/Loading';
import { Register } from '../../../../Models/Register';
import './SignupAdmin.css'

function SignupAdmin() {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [shiftTime, setShiftTime] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
   
    async function submitHandler(event){
        try{
            if(window.confirm("Are You Sure ?")){
                setIsLoading(true);
                event.preventDefault();
        
                const bodyFormData = new FormData();
                bodyFormData.append('Email',email);
                bodyFormData.append('Msisdn',phoneNumber);
                bodyFormData.append('Name', fName + " " + lName);
                bodyFormData.append('Gender',gender);
                bodyFormData.append('Password',password);
                bodyFormData.append('Role',role);
                bodyFormData.append('ShifttimeId',shiftTime);
                console.log(bodyFormData);
                
                await axios.post("/employee/auth/registration",bodyFormData).then(response => {
                    console.log(response);
                    if(response.status === 202){
                        setIsLoading(false);
                        clearField();
                        history.replace('/admin-login');
                    }else{
                        setIsLoading(false);
                        setErrorMessage(response.data.meta.message);
                    }
                    
                })
                .catch(err => {
                    setErrorMessage(err.message);
                    setIsLoading(false);
                })

            }
            
            
        }
        catch(error){
            setIsLoading(false);
            setErrorMessage(error.message);
        }
    }

    function clearField(){
        setFName("");
        setLName("");
        setGender("")
        setEmail("");
        setPassword("");
        setPhoneNumber("");
    }
    return (
        <header className="register">
        <div className="register-container">
            <form className="Form" onSubmit={submitHandler}>
                {
                isLoading ?
                (<Loading/>)
                :
                null
                }
                <div className="Field">
                    <h3>Sign Up</h3>
                    {errorMessage?(<p className="text-danger">{errorMessage}</p>) : null}
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name"  value={fName} onChange={(e)=>setFName(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name"  value={lName} onChange={(e)=>setLName(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                            <label>Gender</label>
                            <br/>
                            <select className="form-control" value={gender} onChange={(e)=>setGender(e.target.value)} required>                  
                            <option value="SELECT">- Select -</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            </select>
                    </div>
                    {/* <div className="form-group">
                        <label>Role</label>
                        <input type="text" className="form-control" placeholder="Employee Role"  value={role} onChange={(e)=>setRole(e.target.value)} required/>
                    </div> */}
                    <div className="form-group">
                            <label>Role</label>
                            <br/>
                            <select className="form-control" value={role} onChange={(e)=>setRole(e.target.value)} required>                  
                            <option value="SELECT">- Select -</option>
                            <option value="Hospital Staff">Hospital Staff</option>
                            <option value="Admin">Admin</option>
                            <option value="Hospital Manager">Hospital Manager</option>
                            </select>
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="number" className="form-control" placeholder="Phone Number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                            <label>Shift Time</label>
                            <br/>
                            <select className="form-control" value={shiftTime} onChange={(e)=>setShiftTime(e.target.value)} required>                  
                            <option value="SELECT">- Select -</option>
                            <option value="1">Morning (07.00 am - 17.00 pm)</option>
                            <option value="2">Evening (17.00 pm - 07.00 am)</option>
                            </select>
                        </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="reg-btn btn btn-primary btn-block"><i className="fas fa-save" />&nbsp;&nbsp;Register</button>
                    <p className="forgot-password text-right">
                        Already registered <Link to="/sign-in"><a href="#">sign in?</a></Link>
                    </p>
                </div>
            </form>
        </div>
    </header>
    )
}

export default SignupAdmin
