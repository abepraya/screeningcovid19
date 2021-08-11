import TextField from '@material-ui/core/TextField';
import React,{ useState } from 'react';
import { Register } from '../../../Models/Register';
import { Link, Redirect, useHistory } from "react-router-dom";
import './Signup.css';
import axios from 'axios';
import Loading from '../../../../assets/Loading/Loading';
import Modal from '../../../../assets/Modal/Modal';

const Signup = (props) => {
    const [nik, setNik] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ktp, setKtp] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
   
    async function submitHandler(event){
        try{
            if(window.confirm("Are You Sure ?")){
                setIsLoading(true);
                event.preventDefault();
                const register = new Register(nik, fName,lName, gender, dob, email, password, phoneNumber, address);
                console.log(register);
        
                const bodyFormData = new FormData();
                bodyFormData.append('nik',nik);
                bodyFormData.append("ktpNumber", ktp)
                bodyFormData.append('name', fName + " " + lName);
                bodyFormData.append('gender',gender);
                bodyFormData.append('birthDate',dob);
                bodyFormData.append('msisdn',phoneNumber);
                bodyFormData.append('address',address);
                bodyFormData.append('email',email);
                bodyFormData.append('password',password);
                console.log(bodyFormData);
                clearField();
    
                await axios.post("/auth/registration",bodyFormData).then(response => {
                    console.log(response);
                    if(response.status === 202){
                        setIsLoading(false);
                        history.replace('/sign-in');
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
        setNik("");
        setKtp("");
        setFName("");
        setLName("");
        setGender("");
        setDob("");
        setEmail("");
        setAddress("");
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
                            <label>NIK Keluarga</label>
                            <input type="number" className="form-control" placeholder="Enter NIK Keluarga" value={nik} onChange={(e)=>setNik(e.target.value)} required/>
                        </div>

                        <div className="form-group">
                            <label>NIK KTP Pribadi</label>
                            <input type="number" className="form-control" placeholder="Enter NIK KTP Pribadi" value={ktp} onChange={(e)=>setKtp(e.target.value)} required/>
                        </div>

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

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <br/>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Date of Birth"
                                value={dob}
                                onChange={(e)=>setDob(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" placeholder="Address"  value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="number" className="form-control" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} required/>
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
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

export default Signup;
