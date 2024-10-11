import React, { useEffect } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, ImageOverlay, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import LOTRmap from '../../imgs/MiddleEarth.jpg'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const imageBounds: [[number, number], [number, number]] = [[0,0], [2400, 2424]];

const iconMarker = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size of the Leaflet marker
  iconAnchor: [12, 41], // Anchor point of the marker icon
  popupAnchor: [1, -34], // Popup position relative to the icon
  shadowSize: [41, 41], // Shadow size of the marker icon
});

const Map: React.FC = () => {
  const center: LatLngExpression = [1200, 1212];

  const pathCoordinates: LatLngExpression[] = [
    [500, 500],
    [1000, 1000],
    [1500, 1200],
    [2000, 1800]
  ]

  const FitBounds = () => {
    const map = useMap();
    useEffect(() => {
      map.fitBounds(imageBounds);
      map.setMaxBounds(imageBounds);
    }, [map]);
    return null;
  }

  return (
    <div className='map-section'>
      <MapContainer
        center={center}
        zoom={3}
        minZoom={-1}
        maxZoom={10}
        crs={L.CRS.Simple}
        style={{height: '100%', width: '75%'}}
        maxBoundsViscosity={1}
      >
        <ImageOverlay url={LOTRmap} bounds={imageBounds}/>
        <FitBounds />
        <Marker position={center} icon={iconMarker}>
          <Popup>This is a marker on the image for testing</Popup>
        </Marker>
        <Polyline positions={pathCoordinates} color='red'>
          <Popup>This is the path.</Popup>
        </Polyline>
      </MapContainer>
    </div>
  );
}

export default Map; 