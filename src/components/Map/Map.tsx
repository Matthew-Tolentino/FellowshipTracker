import React, { useEffect } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, ImageOverlay, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import LOTRmap from '../../imgs/MiddleEarth.jpg'

const imageBounds: [[number, number], [number, number]] = [[0,0], [2400, 2424]];

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
        style={{height: '50vh', width: '75vw'}}
        maxBoundsViscosity={1}
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
    </div>
  );
}

export default Map; 