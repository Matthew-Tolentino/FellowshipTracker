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
import { Member } from '../../Models/Member';

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
    map.setView(L.latLng(data.coord), 0);
  }, [map, data.coord]);
  return null;
}

interface IMap {
  progress: number;
  members: Member[]
}

const Map: React.FC<IMap> = ({ progress, members }) => {
  const center: LatLngExpression = [1200, 1600];
  const mapData = new MapData();

  return (
    <div className="map">
      {/* <h1>Fellowship Progress</h1> */}
      <div className='map-section'>
        <MapContainer
          center={center}
          minZoom={-1}
          maxZoom={1}
          crs={L.CRS.Simple}
          style={{height: '100%', width: '100%'}}
          maxBoundsViscosity={1}
        >
          <ImageOverlay url={LOTRmap} bounds={imageBounds}/>
          <FitBounds />
          <SetViewOnFocus coord={mapData.getPathProgress(progress).at(-1)}/>
          {/* <Marker position={center} icon={iconMarker}>
            <Popup>This is a marker on the image for testing</Popup>
          </Marker> */}
          <Polyline positions={mapData.pathCoords} color={mapData.totalPathColor} weight={10} stroke={true}>
            <Popup>This is the path.</Popup>
          </Polyline>

          <Polyline positions={mapData.getPathProgress(progress)} color={mapData.progressPathColor} weight={8}>
            <Popup>This is the progress path.</Popup>
          </Polyline>

          <ClickHandler />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;