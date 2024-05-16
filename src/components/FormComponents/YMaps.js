import React, { useCallback, useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  TypeSelector,
  FullscreenControl,
  RulerControl,
  Polygon,
} from "react-yandex-maps";
import { Form, Input, Typography } from "antd";

const YMapsComponent = ({
  onAddressSelect,
  name,
  read = false,
  value = {},
}) => {
  const refPlacemark = useRef();
  const [newCoords, setNewCoords] = useState([
    value.latitude || 0,
    value.longitude || 0,
  ]);
  const form = Form.useFormInstance();
  const [mapState] = useState({
    center: [55.751574, 37.573856],
    zoom: 9,
  });

  const onMapClick = useCallback(
    (e) => {
      if (!read) {
        const coords = e.get("coords");
        form.setFieldValue([name, "latitude"], coords[0]);
        form.setFieldValue([name, "longitude"], coords[1]);
        setNewCoords(() => coords);
      }
    },
    [onAddressSelect, read]
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <Form.List name={name}>
        {(fields) => (
          <>
            <Form.Item name={"latitude"} label={"Широта"}>
              {read ? (
                <Typography.Text>{value?.latitude}</Typography.Text>
              ) : (
                <Input
                  onChange={(event) => {
                    form.setFieldValue("latitude", event.target.value);
                    setNewCoords(() => [event.target.value, newCoords[1]]);
                  }}
                />
              )}
            </Form.Item>
            <Form.Item name={"longitude"} label={"Долгота"}>
              {read ? (
                <Typography.Text>{value?.longitude}</Typography.Text>
              ) : (
                <Input
                  onChange={(event) => {
                    form.setFieldValue("longitude", event.target.value);
                    setNewCoords(() => [newCoords[0], event.target.value]);
                  }}
                />
              )}
            </Form.Item>

            {/* <Form.Item
              name={"latitude"}
              label={"Широта"}
              initialValue={value.latitude}
            >
              {!read ? (
                <Input
                  onChange={(event) => {
                    form.setFieldValue([name, "latitude"], event.target.value);
                    setNewCoords(() => [event.target.value, newCoords[1]]);
                  }}
                />
              ) : (
                <Typography.Text>{value.latitude}</Typography.Text>
              )}
            </Form.Item>
            <Form.Item
              name={"longitude"}
              label={"Долгота"}
              initialValue={value.longitude}
            >
              {!read ? (
                <Input
                  onChange={(event) => {
                    form.setFieldValue([name, "longitude"], event.target.value);
                    setNewCoords(() => [newCoords[0], event.target.value]);
                  }}
                />
              ) : (
                <Typography.Text>{value.longitude}</Typography.Text>
              )}
            </Form.Item> */}
            <YMaps>
              <Map
                state={mapState}
                onClick={onMapClick}
                width="100%"
                height="400px"
              >
                <ZoomControl />
                <FullscreenControl />
                <TypeSelector options={{ float: "right" }} />
                <RulerControl />
                <Placemark
                  instanceRef={refPlacemark}
                  onDragEnd={(event) => {
                    if (!read) {
                      const coords = refPlacemark.current.geometry._coordinates;
                      form.setFieldValue([name, "latitude"], coords[0]);
                      form.setFieldValue([name, "longitude"], coords[1]);
                      setNewCoords(() => coords);
                    }
                  }}
                  geometry={newCoords}
                  options={{
                    iconImageSize: [50, 50],
                    draggable: !read,
                    preset: "islands#blueStarIcon",
                    hideIconOnBalloonOpen: false,
                    openEmptyHint: true,
                  }}
                  properties={{}}
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

// import React, { useCallback, useRef, useState } from "react";
// import {
//   YMaps,
//   Map,
//   Placemark,
//   ZoomControl,
//   TypeSelector,
//   FullscreenControl,
//   RulerControl,
//   Polygon,
// } from "react-yandex-maps";
// import axios from "axios";
// import { Form, Input } from "antd";

// const YMapsComponent = ({ onAddressSelect, name }) => {
//   const refPlacemark = useRef();
//   const [coordinates, setCoordinates] = useState([]);
//   const [newCoords, setNewCoords] = useState([0, 0]);
//   const form = Form.useFormInstance();
//   const [mapState] = useState({
//     center: [55.751574, 37.573856],
//     // controls: ['typeSelector'],
//     zoom: 9,
//   });

//   const onMapClick = useCallback(
//     async (e) => {
//       const coords = e.get("coords");
//       form.setFieldValue([name, "latitude"], coords[0]);
//       form.setFieldValue([name, "longitude"], coords[1]);
//       setNewCoords(() => coords);
//     },
//     [onAddressSelect]
//   );

//   return (
//     <div style={{ marginBottom: "20px" }}>
//       <Form.List name={name}>
//         {(fields) => (
//           <>
//             <Form.Item name={"latitude"} label={"Широта"}>
//               <Input
//                 onChange={(event) => {
//                   form.setFieldValue("latitude", event.target.value);
//                   setNewCoords(() => [event.target.value, newCoords[1]]);
//                 }}
//               />
//             </Form.Item>
//             <Form.Item name={"longitude"} label={"Долгота"}>
//               <Input
//                 onChange={(event) => {
//                   form.setFieldValue("longitude", event.target.value);
//                   setNewCoords(() => [newCoords[0], event.target.value]);
//                 }}
//               />
//             </Form.Item>
//             <YMaps>
//               <Map
//                 state={mapState}
//                 onClick={onMapClick}
//                 width="100%"
//                 height="400px"
//               >
//                 <ZoomControl />
//                 <FullscreenControl />
//                 <TypeSelector options={{ float: "right" }} />
//                 <RulerControl />
//                 <Placemark
//                   instanceRef={refPlacemark}
//                   onDragEnd={(event) => {
//                     const coords = refPlacemark.current.geometry._coordinates;
//                     form.setFieldValue("latitude", coords[0]);
//                     form.setFieldValue("longitude", coords[1]);
//                     setNewCoords(() => coords);
//                   }}
//                   geometry={newCoords}
//                   options={{
//                     iconImageSize: [50, 50],
//                     draggable: true,
//                     preset: "islands#blueStarIcon",
//                     hideIconOnBalloonOpen: false,
//                     openEmptyHint: true,
//                   }}
//                   properties={{}}
//                 />
//               </Map>
//             </YMaps>
//           </>
//         )}
//       </Form.List>
//     </div>
//   );
// };

// export default YMapsComponent;
