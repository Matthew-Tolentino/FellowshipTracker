import React, { useEffect } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, ImageOverlay, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import LOTRmap from '../../imgs/MiddleEarth.jpg'

const imageBounds: [[number, number], [number, number]] = [[0,0], [2400, 2424]];

const Map: React.FC = () => {
  const center: LatLngExpression = [300, 400];

  const pathCoordinates: LatLngExpression[] = [
    [100, 100],
    [200, 200],
    [300, 400],
    [400, 600]
  ]

  const FitBounds = () => {
    const map = useMap();
    useEffect(() => {
      map.fitBounds(imageBounds);
    }, [map]);
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={-1}
      minZoom={-2}
      maxZoom={1}
      crs={L.CRS.Simple}
      style={{height: '400px', width: '600px'}}
    >
      <ImageOverlay url={LOTRmap} bounds={imageBounds}/>
      <FitBounds />
      <Marker position={center}>
        <Popup>This is a marker on the image for testing</Popup>
      </Marker>
      <Polyline positions={pathCoordinates} color='red'>
        <Popup>This is the path.</Popup>
      </Polyline>
    </MapContainer>
  );
}

export default Map; 