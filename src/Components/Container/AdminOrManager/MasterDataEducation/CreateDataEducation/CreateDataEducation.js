import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../../../../../Store/auth-context';
import './CreateDataEducation.css'

const CreateDataEducation = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const [dataEducation, setDataEducation] = useState({
        title:'',
        author:'',
        description:''
    });
    const [picture, setPicture] = useState();
    const history = useHistory();

    function routeBackHandler(){
        let path="/master-data-education";
        history.push(path);
    }
    async function submitHandler(event){
      try{
        if(window.confirm("Are You Sure ?")){
          event.preventDefault();
          let token = `Bearer ${authCtx.tokenSuper}`;
          const config = {
            headers:{
              Authorization: token
            }
          }
          const bodyData = {
            "title": dataEducation.title,
            "file_thumbnail_id": picture,
            "content_education": dataEducation.description
          }
          
          const response = await axios.post('/education/add-education',bodyData , config);
          
          if(response.status === 202 || response.status === 200){
            history.push('/master-data-education')
          }
          else{
            throw new Error(response)
          }
        }
    
      }catch(err){
        alert(err.message)
      }
    }

    async function uploadHandler(file){
      try{
        setIsLoading(true)
        const token = `Bearer ${authCtx.tokenSuper}`;
        const formBodyData = new FormData();
        formBodyData.append("upload-file", file);
        const config = {
          headers:{
            Authorization: token
          }
        }
        const response = await axios.post("/account/upload-file/education", formBodyData, config);
        if(response.status === 200 || response.status === 202){
          setIsLoading(false)
          setPicture(response.data.data.file_id)
        }else{
          setIsLoading(false)
          throw new Error(response)
        }
      }catch(err){
        alert(err.message)
      }
    }

    return (
        <header className="new-data-education">
            <form className="Form">
            <div className="Field">
          <h3 className="text-center">Create Data Education</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={dataEducation.title}
              onChange={(e) =>
                setDataEducation({
                   ...dataEducation,
                  title: e.target.value,
                })
              }
            />
          </div>
          {/* <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              value={dataEducation.author}
              onChange={(e) =>
                setDataEducation({
                  ...dataEducation,
                  author: e.target.value,
                })
              }
            />
          </div> */}
          <div className="form-group">
            <label>Picture</label>
            <input
              type="file"
              accept="image/*" 
              multiple={false}
              className="form-control"
              placeholder="Picture"
              // value={picture}
              onChange={(e) => uploadHandler(e.target.files[0])}
              // ref={inputRef}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              type="textarea"
              cols={25}
              rows={5}
              className="form-control"
              placeholder="Description"
              value={dataEducation.description}
              onChange={(e) =>
                setDataEducation({
                  ...dataEducation,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="multiple-button">
            {isLoading ? (
              <>
                <button
                  className="btn-edit btn btn-primary btn-block"
                  type="submit"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="btn-edit btn btn-primary btn-block"
                onClick={submitHandler}
              >
                Create
              </button>
            )}
            <button
              type="submit"
              className="btn-edit btn btn-danger btn-block"
              onClick={routeBackHandler}
            >
              Cancel
            </button>
          </div>
        </div>
            </form>
        </header>
    )
}

export default CreateDataEducation
