/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import "react-leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/useCities";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../Hooks/useGeolocation";
import Button from "./Button";
import { useURLPosition } from "../Hooks/useURLPosition";

function Map() {
  // eslint-disable-next-line no-unused-vars
  const [mapPosition, setMapPositions] = useState([40, 30]);

  const [mapLat, mapLng] = useURLPosition();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const { cities } = useCities();


 
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPositions([mapLat, mapLng]);
      return;
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition){
        
        setMapPositions([geolocationPosition.lat, geolocationPosition.lng]);}
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    
    click: (e) => { navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)},
  });
}
export default Map;
