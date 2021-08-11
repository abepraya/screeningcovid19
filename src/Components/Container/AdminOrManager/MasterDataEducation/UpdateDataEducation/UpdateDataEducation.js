import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router';
import AuthContext from '../../../../../Store/auth-context';
import { lastWord } from '../../../../../Store/utility';
import './UpdateDataEducation.css'

const UpdateDataEducation = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const [dataEducation, setDataEducation] = useState({
        title:'',
        picture:'',
        description:'',
    });
    // const [picture, setPicture] = useState();
    const {params:{id}} = useRouteMatch('/edit-data-education/:id');
    const history = useHistory();

    async function getDataEdu(){
      try{
      setIsLoading(true)
      let url = history.location.pathname;
      let token = `Bearer ${authCtx.tokenSuper}`;
      const config = {
        headers:{
          Authorization: token
        }
      }
      const response = await axios.get(`/education/get-education/${id}`, config);
      if(response.status === 200 || response.status === 202){
        setIsLoading(false)
        console.log("masuk gaan", JSON.stringify(response.data))
        setDataEducation({
          title: await response.data.data.data.title,
          description: await response.data.data.data.content,
          picture: await response.data.data.data.file_thumbnail_id
        });
      }else{
        setIsLoading(false)
        throw new Error(response);
      }
    }
    catch(err){
      alert(err.message);
    }
    }

    function routeBackHandler(){
        let path="/master-data-education";
        history.push(path);
    }
    
    async function submitHandler(event){
      try{
        setIsLoading(true)
        if(window.confirm("Are you sure?")){
          event.preventDefault();
          let token = `Bearer ${authCtx.tokenSuper}`;
          const config = {
            headers:{
              Authorization: token
            }
          }
          const bodyData = {
            "title": dataEducation.title,
            "file_thumbnail_id": dataEducation.picture,
            "content_education": dataEducation.description
          }

          const response = await axios.put(`/education/update-education/${id}`, bodyData, config);
          if(response.status === 200 || response.status === 202){
            setIsLoading(false)
            alert("Update Success !");
            history.push('/master-data-education')
          }else{
            setIsLoading(false)
            throw new Error(response);
          }
        }

      }catch(err){
        alert(err.message);
      }
    }

    async function uploadChangeHandler(file){
      setDataEducation({
        ...dataEducation,
        picture: file
      })
    }

    useEffect(() => {
      getDataEdu();
    }, [])

    console.log(dataEducation)

    console.log("ID UPDATE LAST WORLD: " + id);
    return (
        <header className="new-data-education">
            <form className="Form">
            <div className="Field">
          <h3 className="text-center">Edit Data Education</h3>
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
              // value={dataEducation.picture}
              onChange={(e) => uploadChangeHandler(e.target.files[0])}
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
                Save
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

export default UpdateDataEducation;
