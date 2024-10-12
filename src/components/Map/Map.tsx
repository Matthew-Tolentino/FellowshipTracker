import React, { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, ImageOverlay, Marker, Polyline, useMap, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
// import LOTRmap from '../../imgs/MiddleEarth.jpg'
import LOTRmap from '../../imgs/lotrmap.jpeg'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MapData from './MapData/MapData';

const imageBounds: [[number, number], [number, number]] = [[0,0], [2400, 3200]];

const iconMarker = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size of the Leaflet marker
  iconAnchor: [12, 41], // Anchor point of the marker icon
  popupAnchor: [1, -34], // Popup position relative to the icon
  shadowSize: [41, 41], // Shadow size of the marker icon
});

const ClickHandler = () => {
  useMapEvent('click', (e) => {
    const {lat, lng} = e.latlng;
    console.log(`[${Math.trunc(lat)}, ${Math.trunc(lng)}]`);
  });
  return null;
}

const Map: React.FC = () => {
  const center: LatLngExpression = [1200, 1600];

  const mapData = new MapData();

  const FitBounds = () => {
    const map = useMap();
    useEffect(() => {
      map.fitBounds(imageBounds);
      map.setMaxBounds(imageBounds);
    }, [map]);
    return null;
  }

  const SetViewOnFocus = (data: any) => {
    const map = useMap();
    useEffect(() => {
      // let a  = L.latLng([1,2,3]);
      // let b = L.latLng([1,2])
      // console.log(data.coord, a, b);
      console.log(L.latLng(data.coord));
      map.setView(L.latLng(data.coord), map.getZoom());
    }, [map, data.coord]);

    return null;
  }

  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress(prev => prev + .1);
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className='map-section'>
      <MapContainer
        center={center}
        zoom={-1}
        minZoom={-1}
        maxZoom={3}
        crs={L.CRS.Simple}
        style={{height: '100%', width: '75%'}}
        maxBoundsViscosity={1}
      >
        <ImageOverlay url={LOTRmap} bounds={imageBounds}/>
        <FitBounds />
        <SetViewOnFocus coord={mapData.getPathProgress(progress).at(-1)}/>
        {/* <Marker position={center} icon={iconMarker}>
          <Popup>This is a marker on the image for testing</Popup>
        </Marker> */}
        <Polyline positions={mapData.pathCoords} color='red'>
          <Popup>This is the path.</Popup>
        </Polyline>

        <Polyline positions={mapData.getPathProgress(progress)} color='green'>
          <Popup>This is the progress path.</Popup>
        </Polyline>

        <ClickHandler />
      </MapContainer>
    </div>
  );
}

export default Map;