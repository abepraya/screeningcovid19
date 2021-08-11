import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import './Map.css';
import MapPreview from './MapPreview/MapPreview';
import ENV from '../../Store/ENV';
import {formatDistance, formatTime, generateNewId, getMiles, isBlank, isEmpty, secondsToTime} from '../../Store/utility';
import Loading from '../../assets/Loading/Loading';
import { Container } from '@material-ui/core';
import ModalInfo from '../Modal-Info/ModalInfo';

const options = {
    enableHighAccuracy: true,
    timeout: 10000
}

const pageSize = 5;

const Map = (props) => {
    const [open, setOpen] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [paginatedPost, setPaginatedPost] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [userLocation, setUserLocation] = useState({
        latitude:'',
        longitude:''
    });
    const [destination, setDestination] = useState({
        mode:'',
        totalDistance:'',
        totalTime:'',
        instructions:[],
        coordinates:'',
    });
    
    const [isLoading, setIsLoading] = useState(false);

    function geoUserLocation(){
        setIsLoading(true);
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(positionMap, showError, options);
            setIsLoading(false);
        }else{
            alert("Browser Not Supported");
            setIsLoading(false);
        }
    }
    
    function positionMap(position){
        setUserLocation({
            ...userLocation,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }


    function showError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
          default:
            alert("An unknown error occurred.")
        }
      }

    async function getWaypointLocation() {
        try {
            setIsLoading(true);
            setShowTable(false);
            const userPlace = userLocation.latitude + "," + userLocation.longitude;          
            const destinations = ENV.latitude + "," + ENV.longitude;
            const completeWay = userPlace +"|"+ destinations;
            
            const params = new URLSearchParams([
              ["api_key", ENV.apiKey],
              ["waypoints", completeWay],
              ["mode", destination.mode]
            ]);
          const response = await axios.get("/v1/routing", { params });
          if (response.status === 200) {
              setIsLoading(false);
              await response.data.features.map(items =>{
                      setDestination({
                          ...destination,
                          totalDistance: items.properties.distance,
                          totalTime: items.properties.time,
                          instructions: items.properties.legs,
                          coordinates: items.geometry,
                      })

                      setPaginatedPost(_(items.properties.legs).slice(0).take(pageSize).value());
            })
        } else {
            setIsLoading(false);
            console.log("ERROR MAP: " + response);
            throw new Error("Can't Found ! Detail: " + response);
        }
        }catch(error){
            setIsLoading(false);
            console.log(error);
            alert("CATCH: " + error.message);
        }
    }

    function modeChangeHandler(e){
        console.log(e.target.value);
        setDestination({
            mode: e.target.value
        });
    };

    function openTable(){
        setShowTable(true)
    }

    function pageHandler(pageNumber){
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedPost = _(destination.instructions).slice(startIndex).take(pageSize).value();
        setPaginatedPost(paginatedPost);
    }


    if(pageCount === 1){
        return null;
    }

    const pageCount = destination.instructions? Math.ceil(destination.instructions.length / pageSize) : 0;
    console.log("PAGE COUNT: " + pageCount);
    const pages = _.range(1, pageCount + 1);
    console.log("PAGES: " + pages);

    let totalTime = "Total Time: "+ secondsToTime(destination.totalTime);
    let totalDistance = "Total Distance: " + formatDistance(destination.totalDistance);

    console.log("PaginatedPOST : " + JSON.stringify(paginatedPost));

    return(
        <Container>
            {props.children}
            <div className="maps">
            {open && <ModalInfo open={open} setOpen={setOpen} title="Duration" bodyText={totalDistance} footerText={totalTime} />}
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                <button type="button" className="btn btn-light" onClick={geoUserLocation}><i className="material-icons"style={{color: "orange",marginRight:"10px",verticalAlign:'middle', fontSize:'22px'}}>my_location</i>GET USER LOCATION</button>
                    <div className="btn-group" role="group">
                        <select className="btn btn-light dropdown-toggle" aria-haspopup="true" aria-expanded="false" value={destination.mode} onChange={modeChangeHandler}>
                            <option className="dropdown-item" value="none">-SELECT MODE-</option>
                            <option className="dropdown-item" value="drive">DRIVE</option>
                            <option className="dropdown-item" value="walk">WALK</option>
                            <option className="dropdown-item" value="approximated_transit">APPROXIMATED TRANSIT</option>
                            <option className="dropdown-item" value="transit">TRANSIT</option>
                            <option className="dropdown-item" value="bicycle">BICYCLE</option>
                        </select>
                    </div>
                <button type="button" className="btn btn-light" onClick={getWaypointLocation}><i className="material-icons" style={{color: "red",marginRight:"10px",verticalAlign:'middle', fontSize:'22px'}}>location_on</i>DESTINATION</button>
            </div>
            <div className="map-container">
                <MapPreview 
                center={[ENV.latitude, ENV.longitude]} 
                userLocation={[userLocation.latitude, userLocation.longitude]} 
                user={props.user} 
                position={destination.coordinates}
                /> 
            {showTable? (<div className="table-container">        
                <table className="table table-primary">
                    <thead>
                        <tr className="table-info">
                            {/* <th>Id</th> */}
                            <th>Instruction</th>
                            <th>Distance</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                            {(isLoading? <Loading /> : showTable && (isEmpty(paginatedPost) || isBlank(paginatedPost)? (null) : <>{paginatedPost?.map((item1,index1) =>{
                                return item1.steps?.map((item2,index2)=>{
                                    return (
                                        <tr key={index2}>
                                            {/* <td>{generateNewId()}</td> */}
                                            <td>{item2.instruction.text}</td>
                                            <td>{formatDistance(item2.distance)}</td>
                                            <td>{secondsToTime(item2.time)}</td>
                                        </tr>
                                )
                            })
                        })}</>))}
                    </tbody>
                </table>
            </div>) :
            (isLoading? 
            <Loading /> : null    
            )
            }
            </div>
                {/* <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                    {
                        pages.map(page =>(
                            <li className={page === currentPage? "page-item active" : "page-item"}>
                            <p className="page-link" onClick={()=>pageHandler(page)}>{page}</p>
                            </li>
                            ))
                        }
                        </ul>
                    </nav> */}
            <div className="btn-group">
                {(isEmpty(destination.instructions)|| isBlank(destination.instructions))? null : 
                    (
                    <>
                    <button type="button" className="btn btn-success" onClick={openTable}><i className="material-icons"style={{color: "yellowgreen",marginRight:"10px",verticalAlign:'middle', fontSize:'22px'}}>navigation</i>NAVIGATE</button>
                    <button type="button" className="btn btn-warning" onClick={()=>setOpen(true)}><i className="material-icons"style={{color: "red",marginRight:"10px",verticalAlign:'middle', fontSize:'22px'}}>message</i>INFO</button>
                    </>
                )}  
                {showTable && <button type="button" className="btn btn-light" onClick={()=>{setShowTable(false)}}><i className="material-icons">visibility_off</i></button>}
            </div>  
            </div>             
        </Container>
    )
}

export default Map;