import React from "react";
import { YMaps, Map, Placemark, Polygon, ZoomControl } from "@pbe/react-yandex-maps";

const MapDisplay = ({
  mapState,
  onBoundsChange,
  onClick,
  selectedPoint,
  polygonPoints,
  mapRef,
}) => {
  return (
    <YMaps>
      <Map
        state={mapState}
        width="100%"
        height="400px"
        onClick={onClick}
        onBoundsChange={onBoundsChange}
        instanceRef={mapRef}
      >
        <ZoomControl />
        {selectedPoint && <Placemark geometry={selectedPoint} />}
        {polygonPoints.length > 0 && (
          <Polygon
            geometry={[polygonPoints]}
            options={{
              fillColor: "rgba(0, 0, 255, 0.3)",
              strokeColor: "#0000FF",
              strokeWidth: 2,
            }}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default MapDisplay;