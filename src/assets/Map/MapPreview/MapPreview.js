import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { dataToArray, isBlank, isEmpty } from "../../../Store/utility";
import LocationMarker from "../LocationMarker/LocationMarker";
import './MapPreview.css';

const MapPreview = (props) => {
  const purpleOptions = { color: 'purple' }
 
  let polyline = [];
  if(!isEmpty(props.position) || !isBlank(props.position)){
    for(let i = 0; i <= props.position.coordinates[0].length - 1; i++){
      let data = dataToArray(props.position.coordinates[0][i]);
      polyline.push(data);
    }
  }


  return (
        <MapContainer center={props.center} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={props.center}>
                <Popup>
                RSP Persahabatan Rawamangun
                </Popup>
            </Marker>
            {isEmpty(props.userLocation) || isBlank(props.userLocation)?
            (null)
            :
            (
              <Marker position={props.userLocation}>
                  <Popup>
                  Home
                  </Popup>
              </Marker>
            )
            }
            {polyline === undefined || polyline === null? (null) :<Polyline pathOptions={purpleOptions} positions={polyline} />}
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPreview;
