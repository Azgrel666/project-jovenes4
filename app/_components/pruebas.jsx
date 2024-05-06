"use client"
import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { markers } from './constants';

const MapboxMap = () => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXpncmVsNjYiLCJhIjoiY2x1cTJ6OHU3MXE1bzJrb2FnMmg3dnZicCJ9.1cCvQYUVTjd80fFCZH1oaQ';

    const initMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'mapbox-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-75.5144, 10.3957],
        zoom: 12,
      });

      setMap(mapInstance);

      // Agregar marcadores
      markers.map((marker) => {
        const markerElement = new mapboxgl.Marker()
          .setLngLat([marker.longitude, marker.latitude])
          .addTo(mapInstance);
          

        markerElement.getElement().addEventListener('click', () => {
          setSelectedMarker(marker);
        });

        return markerElement;
      });
    };

    if (!map) {
      initMap();
    }
  }, [map]);

  return (
    <div className="flex">
      <div
        className={`bg-white p-4 shadow-md ${
          selectedMarker ? 'w-1/3' : 'w-0 hidden'
        }`}
      >
        {selectedMarker && (
          <>
            <h2 className="text-2xl font-bold mb-2">
              {selectedMarker.name}
            </h2>
            <p className="mb-4">{selectedMarker.description}</p>
            <p>
              <strong>Categoría:</strong> {selectedMarker.category}
            </p>
            <p>
              <strong>Subcategoría:</strong> {selectedMarker.subcategory}
            </p>
            
          </>
        )}
      </div>
      <div
        id="mapbox-container"
        className={`bg-gray-200 p-4 w-full ${
          selectedMarker ? 'w-2/3' : 'w-full'
        }`}
      />
    </div>
  );
};

export default MapboxMap;
