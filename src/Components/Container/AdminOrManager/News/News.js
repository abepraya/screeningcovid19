import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./News.css";

const News = (props) => {
  const history = useHistory();
  function routeUpdateHandler(){
    let path = "/edit-news";
    history.push(path);
  }
  return (
    <section className="master-data-education">
      <h2>News List</h2>
      <Link to={'/news/create-news'}><button className="btn btn-warning">Create New</button></Link>
      <div className="master-data-education-container">
        <ul className="data-education">
          <li className="list-data">
            <div className="box-data">
              <div className="box-content">
                <h3>Title</h3>
                <p>Description</p>
              </div>
              <div className="btn-group" role="group">
                <button className="btn btn-success" onClick={routeUpdateHandler}>Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default News;
