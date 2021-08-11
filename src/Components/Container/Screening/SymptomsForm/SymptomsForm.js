import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, NavItem } from "react-bootstrap";
import "./SymptomsForm.css";
import Symptomsitems from "../../../../assets/SymptomsItems/SymptomsItems";
import Data from "../../../Data/SymptomsData.json";
import Loading from "../../../../assets/Loading/Loading";
import AuthContext from "../../../../Store/auth-context";
import ModalInfo from "../../../../assets/Modal-Info/ModalInfo";

function SymptomsForm(props) {
  const [isFilePicked, setIsFilePicked] = useState();
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    id:"",
    data:""
  });
  const [dataSymptoms, setdataSymptoms] = useState();
  const [open, setOpen] = useState(false)
  const inputRef = useRef();
  const authCtx = useContext(AuthContext);

  const triggerFileSelect = () => inputRef.current.click();

  useEffect(() => {
    try {
      setIsLoading(true);
      async function getSymptoms() {
        const response = await axios.get("/get-data/get-symptom");
        let content;
        if (response.status === 202) {
          // ("MASUK");
          setIsLoading(false);
          content = await response.data.data.symptom_data;
          // ("Content" + content);
          setdataSymptoms(content);
        } else {
          setIsLoading(false);
          throw new Error(response);
        }
      }

      getSymptoms();
    } catch (error) {
      alert(error.message);
    }
  }, []);

  function checkInfo(){
      setOpen(true);
  }

  function uploadChangeHandler(file) {
    setSelectedFile({
      ...selectedFile,
      data: file
    });
    setIsFilePicked(true);
  }

  const symptomsHandler = (c) => () => {
    const clickedTitle = checked.indexOf(c);
    const all = [...checked];
    if (clickedTitle === -1) {
      all.push(c);
    } else {
      all.splice(clickedTitle, 1);
    }
    setChecked(all);
  };

  async function submitFormHandler(event) {
    try {
      if (window.confirm("Are You Sure ?")) {
        event.preventDefault();
        setIsLoading(true);

        const bodyRequest = {
          "file_upload_id": `${selectedFile.id}`,
          "detail_symptom": `${checked}`
        }

        const token = `Bearer ${authCtx.token}`;
        const config = {
          headers:{
            Authorization: token
          }
        };

        const response = await axios.post("/account/symptom-user", bodyRequest, config);
        if (response.status === 200 || response.status === 202) {
          (JSON.stringify(response));
          setIsLoading(false);
          alert("Success !");
          // setChecked("");
          // setSelectedFile(await response.data);
        } else {
          setIsLoading(false);
          throw new Error(response);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function uploadHandler() {
    try {
      setIsLoading(true);
      let file = selectedFile.data;
      const formBodyData = new FormData();
      formBodyData.append("upload-file", file);
      const token = authCtx.token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post("/account/upload-file/covid-screener", formBodyData, {headers});
      if (response.status === 202 || response.status === 200) {
        setIsLoading(false);
        setSelectedFile({
          ...selectedFile,
          id: response.data.data.file_id
        })
        alert("Success !");
      } else {
        setIsLoading(false);
        throw new Error(response);
      }
    } catch (error) {
      alert(error.message);
    }
  }


  // ("CHECKING: " + checked);
  // ("symptoms: ", dataSymptoms);

  return (
    <div>
    {open && <ModalInfo open={open} setOpen={setOpen} title="Guide Form" bodyText="1. Upload Scan Swab Test / PCR / Antigen (Optional)" footerText="2. Choose your symptom from the list (mandatory)" />}
      <header className="Screenings">
        <h1>Symptom Covid Form</h1>
        <button className="btn-step btn btn-warning" onClick={checkInfo} ><i className="fas fa-info-circle" />Guide</button>
        <div className="screening-container">
          <div className="screening">
            <h3>Scan Test Covid (Optional)</h3>
            <img
              className="entry-img"
              src="https://img.icons8.com/windows/452/file-upload.png"
              alt="Entry Form"
            />
            {isFilePicked ? <p>File Saved !</p> : <p>Format jpg/png/jpeg</p>}
            <input
              id="input"
              type="file"
              name="upload"
              accept="application/pdf,image/*"
              multiple={false}
              onChange={(e)=>uploadChangeHandler(e.target.files[0])}
              ref={inputRef}
            />
            <div className="btn-group">
              <button
                onClick={triggerFileSelect}
                className="btn-upload btn btn-primary"
              >
                Upload File
              </button>
              <button
                onClick={uploadHandler}
                className="btn-upload btn btn-success"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="symptom-form">
          <div className="symptom-form-container">
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                <h3>
                    Choose This Box Below to Describe Your Symptoms :
                </h3>
                <div className="list-choice">
                    {dataSymptoms?.map((d, i) => {
                    return (
                        <Symptomsitems
                        title={d.symptom_detail}
                        key={d.ID}
                        onChange={symptomsHandler(d.symptom_detail)}
                        value={d.symptom_detail}
                        />
                    );
                    })}
                </div>
                <button
                    type="submit"
                    className="btn-submit btn btn-success btn-block"
                    onClick={submitFormHandler}
                >
                    Submit
                </button>
                </div>
            )}
        </div>
      </section>
    </div>
  );
}

export default SymptomsForm;
