

import React, { useCallback, useRef, useState } from "react";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import axios from "axios";
import { Form, Input } from "antd";

const YMapsComponent = ({ onAddressSelect }) => {
  const ref = useRef();
  const [newCoords, setNewCoords] = useState([
    0,
    0
  ]);
  const form = Form.useFormInstance();
  const [mapState, setMapState] = useState({
    center: [55.751574, 37.573856],
    zoom: 9,
  });

  const onMapClick = useCallback(
    async (e) => {
      const coords = e.get("coords");
      form.setFieldValue('latitude', coords[0])
      form.setFieldValue('longitude', coords[1])
      setNewCoords(() => coords);
    },
    [onAddressSelect]
  );

  return (
    <>
      <Form.Item
        name={'latitude'}
        label={'Широта'}
      >
        <Input onChange={(event) => {
          form.setFieldValue('latitude', event.target.value)
          setNewCoords(() => [event.target.value, newCoords[1]])
        }}/>
      </Form.Item>
      <Form.Item
        name={'longitude'}
        label={'Долгота'}
      >
        <Input onChange={(event) => {
          form.setFieldValue('longitude', event.target.value)
          setNewCoords(() => [newCoords[0], event.target.value])
        }} />
      </Form.Item>
      <YMaps>
        <Map state={mapState} onClick={onMapClick} width="100%" height="400px">
          <ZoomControl />
          <Placemark
            instanceRef={ref}
            onDragEnd={(event) => {
              const coords = ref.current.geometry._coordinates;
              form.setFieldValue('latitude', coords[0])
              form.setFieldValue('longitude', coords[1])
              setNewCoords(() => coords);
            }}
            geometry={newCoords}
            options={{
              iconImageSize: [50, 50],
              draggable: true,
              preset: "islands#blueStarIcon",
              hideIconOnBalloonOpen: false,
              openEmptyHint: true
            }}
            properties={{
            }}
          />
        </Map>
      </YMaps>
    </>
  );
};

export default YMapsComponent;
