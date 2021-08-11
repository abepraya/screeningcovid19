import { Container } from '@material-ui/core';
import axios from 'axios';
import React,{ useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import AuthContext from '../../../Store/auth-context';
import { cloneAsObject } from '../../../Store/utility';
import './Screening.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Loading from '../../../assets/Loading/Loading';

function Screening({ match }) {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const inputRef = useRef();
    
    useEffect(() => {
        Aos.init({duration: 1500})
    }, []);
    const triggerFileSelect = () => inputRef.current.click();

    // function uploadChangeHandler(file){
    //     setSelectedFile(file);
    //     setIsFilePicked(true);
    // }

    async function uploadHandler(file){
        try {
            // event.preventDefault();
            setIsFilePicked(true);
            setIsLoading(true);
            // let file = selectedFile;
            const formBodyData = new FormData();
            formBodyData.append('upload-file', file);
            console.log("FormBodyData Scan: " + formBodyData);
            const token = authCtx.token;
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            const response = await axios.post('/account/upload-file/vaccine', formBodyData, {headers});
            if(response.status === 202 || response.status === 200){
                setIsLoading(false);
                alert('Success !');
                setSelectedFile(await response.data.data.file_id);
                setIsFilePicked(false);
            }else{
                setIsLoading(false);
                throw new Error(response);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function submitHandler(event){
        try{
            // uploadHandler(event)
            setIsLoading(true);
            console.log("check selected file: " + selectedFile)
            let token = `Bearer ${authCtx.token}`;
            const bodyData = {
                "file_upload_id": `${selectedFile}`
            }
            
            const config = {
                headers:{
                    Authorization: token
                }
            }

            if(window.confirm("Are you sure?")){
            event.preventDefault();
            const response = await axios.post('/account/symptom-user', bodyData, config);
                if(response.status === 200 || response.status === 202){
                    alert("Upload Success");
                    setIsLoading(false)
                }else{
                    throw new Error(response);
                }
            }
        }catch(err){
            alert(err.message);
        }
    }

    function routeSymptomsFormHandler(){
        let path = '/covid-form';
        history.push(path);
    }

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
    console.log("Selected File: " + JSON.stringify(selectedFile, getCircularReplacer()));

    return (
        <header className="Screenings">
            {isLoading? <Loading /> : null}
            <h1>Choose Screening Method</h1>
            <div className="screening-container">
                <div className="screening first" data-aos="fade-right">
                    <h3>Scan Vaccine Covid</h3>
                    <img className="entry-img img-first" src='https://img.icons8.com/windows/452/file-upload.png' alt="Entry Form"/>
                    {isFilePicked ? <p>File Saved !</p> : <p>Format jpg/png/jpeg</p>}
                    <input id="input" type="file" accept="image/*" multiple={false} onChange={(e)=>uploadHandler(e.target.files[0])} ref={inputRef} />
                    {!isLoading && 
                    (
                    <div className="btn-group">
                        <button onClick={triggerFileSelect} className="btn-upload btn btn-primary">Upload File</button>
                        <button onClick={(e)=>submitHandler(e)} className="btn-upload btn btn-success">Send</button>
                    </div>
                    )}
                </div>
                <div className="screening second" data-aos="fade-left">
                    <h3>Identify Covid Form</h3>
                    <img className="entry-img img-second" src='https://www.pngall.com/wp-content/uploads/8/Writing-PNG-Download-Image.png' alt="Entry Form"/> 
                    <p>Move to Symptom Covid Form </p>
                    <div className="btn-group">
                        <Link to={'/screening/covid-form'}><button className="btn-upload btn btn-primary">Go</button></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Screening;
