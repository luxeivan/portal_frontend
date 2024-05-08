

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
      console.log(e)
      form.setFieldValue('latitude', coords[0])
      form.setFieldValue('longitude', coords[1])
      setNewCoords(() => coords);
      // try {
      //   const response = await axios.get(
      //     `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=fd781d3b-b40d-4f6a-a236-865c242547cb&geocode=${coords.join(
      //       ","
      //     )}`
      //   );

      //   const address =
      //     response.data.response.GeoObjectCollection.featureMember[0].GeoObject
      //       .metaDataProperty.GeocoderMetaData.text;
      //   onAddressSelect(address);
      //   setSelectedAddress(address);
      // } catch (error) {
      //   console.error("Ошибка при получении адреса по координатам:", error);
      // }
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
              // iconContent: "+",
              // hintContent: '123'
            }}
          />
        </Map>
      </YMaps>
    </>
  );
};

export default YMapsComponent;
