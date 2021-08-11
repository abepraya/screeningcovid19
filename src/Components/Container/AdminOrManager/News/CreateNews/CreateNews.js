import React, { useState } from 'react'
import { useHistory } from 'react-router';
import './CreateNews.css'

const CreateNews = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataEducation, setDataEducation] = useState({
        title:'',
        author:'',
        description:'',
        updatedBy:'',
        createdBy:'',
        deletedBy:''
    });
    const [picture, setPicture] = useState();
    const history = useHistory();
    function routeBackHandler(){
        let path="/news";
        history.push(path);
    }
    function submitHandler(event){
        event.preventDefault();
    }
    return (
        <header className="new-data-education">
            <form className="Form">
            <div className="Field">
          <h3 className="text-center">Create News</h3>
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
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <label>Picture</label>
            <input
              type="file"
              accept="image/*" 
              multiple={false}
              className="form-control"
              placeholder="Picture"
              value={picture}
              onChange={(e) => setPicture(e.target.files[0])}
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

export default CreateNews
