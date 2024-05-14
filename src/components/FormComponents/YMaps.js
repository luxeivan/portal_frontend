

import React, { useCallback, useRef, useState } from "react";
import { YMaps, Map, Placemark, ZoomControl, TypeSelector, FullscreenControl, RulerControl, Polygon } from "react-yandex-maps";
import axios from "axios";
import { Form, Input } from "antd";

const YMapsComponent = ({ onAddressSelect, name }) => {
  const refPlacemark = useRef();
  const [coordinates, setCoordinates] = useState([]);
  const [newCoords, setNewCoords] = useState([
    0,
    0
  ]);
  const form = Form.useFormInstance();
  const [mapState] = useState({
    center: [55.751574, 37.573856],
    // controls: ['typeSelector'],
    zoom: 9,
  });

  const onMapClick = useCallback(
    async (e) => {
      const coords = e.get("coords");
      form.setFieldValue([name, 'latitude'], coords[0])
      form.setFieldValue([name, 'longitude'], coords[1])
      setNewCoords(() => coords);
    },
    [onAddressSelect]
  );
// ----------------------------------------------
// const instanceRef = useCallback((ref) => {
//   if (ref) {
//     ref.editor.startDrawing();
//     ref.geometry.events.add('change', (e) => setCoordinates(e.get('newCoordinates')));
//   }
// }, []);
// ----------------------------------------------

  return (
    <div style={{ marginBottom: "20px" }}>
      <Form.List name={name}>
        {(fields) => (
          <>
            <Form.Item
              name={'latitude'}
              label={'Широта'}
            >
              <Input onChange={(event) => {
                form.setFieldValue('latitude', event.target.value)
                setNewCoords(() => [event.target.value, newCoords[1]])
              }} />
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
                <FullscreenControl />
                <TypeSelector options={{ float: "right" }} />
                <RulerControl />
                {/* <Polygon
                  instanceRef={instanceRef}
                  geometry={coordinates}
                  options={{
                    draggable: true,
                    editorDrawingCursor: 'crosshair',
                    strokeColor: "blue",
                    strokeOpacity: 0.5,
                    strokeWidth: 3,
                  }}
                /> */}
                <Placemark
                  instanceRef={refPlacemark}
                  onDragEnd={(event) => {
                    const coords = refPlacemark.current.geometry._coordinates;
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
        )}
      </Form.List>
    </div>
  );
};

export default YMapsComponent;
