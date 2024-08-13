import React from 'react';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';

const mapState = { center: [55.76, 37.64], zoom: 8, behaviors: ['disable("scrollZoom")', 'drag'] };

const FilialMap = ({ filials }) => (
  <YMaps>
    <Map state={mapState} width="100%" height="400px">
      <ZoomControl />
      {filials.map((filial, index) => (
        <Placemark
          key={index}
          geometry={filial.coordinates}
          properties={{
            balloonContent: `<div>${filial.name}<br>${filial.address}</div>`,
            hintContent: filial.name,
          }}
          options={{
            preset: 'islands#greenDotIconWithCaption',
          }}
        />
      ))}
    </Map>
  </YMaps>
);

export default FilialMap;
