import React, { useState, useRef, useEffect } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Polygon,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { Button, Radio, Space, Typography, Row, Col } from "antd";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Назначаем виртуальную файловую систему шрифтов – обращаемся к свойству vfs
pdfMake.vfs = pdfFonts.vfs;

const { Paragraph } = Typography;

export default function MapInput({ name, value = {}, onChange, ...rest }) {
  const [mode, setMode] = useState("point");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [mapState, setMapState] = useState({
    center: [55.75, 37.62],
    zoom: 7,
    type: "yandex#map",
  });

  // Сохраняем ссылку на экземпляр карты для получения актуальных центра и зума
  const mapRef = useRef(null);

  useEffect(() => {
    if (value) {
      if (value.point) setSelectedPoint(value.point);
      if (value.polygon) setPolygonPoints(value.polygon);
    }
  }, [value]);

  useEffect(() => {
    const data = { point: selectedPoint, polygon: polygonPoints };
    console.log("MapInput data:", data);
    if (onChange) onChange(data);
  }, [selectedPoint, polygonPoints, onChange]);

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    if (newMode === "polygon") {
      setSelectedPoint(null);
    } else if (newMode === "point") {
      setPolygonPoints([]);
    }
  };

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    if (mode === "point") {
      setSelectedPoint(coords);
    } else if (mode === "polygon") {
      setPolygonPoints((prev) => [...prev, coords]);
    }
  };

  const clearPolygon = () => {
    setPolygonPoints([]);
  };

  const clearPoint = () => {
    setSelectedPoint(null);
  };

  const changeMapType = (newType) => {
    setMapState((prev) => ({ ...prev, type: newType }));
  };

  const handleBoundsChange = (e) => {
    const newZoom = e.get("newZoom");
    const newCenter = e.get("newCenter");
    setMapState((prev) => ({ ...prev, zoom: newZoom, center: newCenter }));
  };

  const generatePDF = async () => {
    // Для режима полигона нужно минимум 3 точки
    if (mode === "polygon" && polygonPoints.length < 3) {
      console.error("Для сохранения области нужно выбрать минимум 3 точки.");
      return;
    }

    const mapTypeMapping = {
      "yandex#map": "map",
      "yandex#hybrid": "sat,skl",
    };

    const baseUrl = "https://static-maps.yandex.ru/1.x/";

    // Получаем актуальные центр и зум с карты (если экземпляр уже создан)
    let center, zoom;
    if (mapRef.current) {
      center = mapRef.current.getCenter();
      zoom = mapRef.current.getZoom();
    } else {
      center = mapState.center;
      zoom = mapState.zoom;
    }

    // Параметр ll задаётся в формате: долгота,широта
    const ll = `${center[1]},${center[0]}`;
    const size = "650,450";
    const l = mapTypeMapping[mapState.type] || "map";

    let overlays = "";
    if (mode === "point" && selectedPoint) {
      // Для точки: порядок – долгота,широта
      const pt = `${selectedPoint[1]},${selectedPoint[0]},pm2rdm`;
      overlays = `&pt=${pt}`;
    } else if (mode === "polygon" && polygonPoints.length >= 3) {
      // Для полигона: собираем точки и замыкаем полигон, если необходимо
      const formatCoord = (coord) => Number(coord).toFixed(5);
      let pts = polygonPoints.map(
        ([lat, lon]) => `${formatCoord(lon)},${formatCoord(lat)}`
      );
      if (pts[0] !== pts[pts.length - 1]) {
        pts.push(pts[0]);
      }
      const polyline = pts.join("~");
      // Формат: точки, цвет линии, толщина линии, цвет заливки
      const overlayParam = `${polyline},0x0000FF,2,0x0000FF4D`;
      overlays = `&pl=${overlayParam}`;
    }

    const url = `${baseUrl}?ll=${ll}&z=${zoom}&size=${size}&l=${l}${overlays}`;
    console.log("Сформированный URL для статической карты:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка при получении изображения карты: ${errorText}`);
      }
      const blob = await response.blob();
      const base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      const docDefinition = {
        content: [
          { text: "Карта", style: "header" },
          {
            image: base64data,
            width: 500,
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            marginBottom: 15,
          },
        },
        // defaultStyle не задаём – pdfMake использует шрифты из vfs
      };
      pdfMake.createPdf(docDefinition).download("map.pdf");
    } catch (error) {
      console.error("Ошибка при загрузке изображения карты:", error);
    }
  };

  // Отображаем кнопку для сохранения PDF, если выбрана точка или (для полигона) минимум 3 точки
  const showSavePdfButton =
    (mode === "point" && selectedPoint) ||
    (mode === "polygon" && polygonPoints.length >= 3);

  return (
    <div {...rest} style={{ padding: "16px" }}>
      <Paragraph>
        Выберите режим работы: <strong>Точка</strong> — выберите одну точку на
        карте, или <strong>Область на карте</strong> — очертите нужную область,
        кликая по карте.
      </Paragraph>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Radio.Group onChange={handleModeChange} value={mode}>
              <Radio.Button value="point">Точка</Radio.Button>
              <Radio.Button value="polygon">Область на карте</Radio.Button>
            </Radio.Group>
          </Col>
          <Col
            xs={24}
            sm={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            {mode === "point" && selectedPoint && (
              <Button onClick={clearPoint} danger>
                Сбросить точку
              </Button>
            )}
            {mode === "polygon" && polygonPoints.length > 0 && (
              <Button onClick={clearPolygon} danger>
                Очистить область
              </Button>
            )}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <Button onClick={() => changeMapType("yandex#map")}>
              Стандартный вид
            </Button>
          </Col>
          <Col>
            <Button onClick={() => changeMapType("yandex#hybrid")}>
              Спутниковый вид
            </Button>
          </Col>
          {showSavePdfButton && (
            <Col>
              <Button type="primary" onClick={generatePDF}>
                Сохранить в PDF
              </Button>
            </Col>
          )}
        </Row>
      </Space>
      <div style={{ marginTop: "16px" }}>
        <YMaps>
          <Map
            state={mapState}
            width="100%"
            height="400px"
            onClick={handleMapClick}
            onBoundsChange={handleBoundsChange}
            instanceRef={mapRef} // сохраняем ссылку на экземпляр карты
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
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { YMaps, Map, Placemark, Polygon,  ZoomControl } from "@pbe/react-yandex-maps";
// import { Button, Radio, Space, Typography } from "antd";

// const { Paragraph } = Typography;

// export default function MapInput({ name, value = {}, onChange, ...rest }) {
//   const [mode, setMode] = useState("point");
//   const [selectedPoint, setSelectedPoint] = useState(null);
//   const [polygonPoints, setPolygonPoints] = useState([]);
//   const [polygonFinished, setPolygonFinished] = useState(false);

//   const [mapState, setMapState] = useState({
//     center: [55.75, 37.62],
//     zoom: 7,
//     type: "yandex#map",
//   });

//   useEffect(() => {
//     if (value) {
//       if (value.point) setSelectedPoint(value.point);
//       if (value.polygon) {
//         setPolygonPoints(value.polygon);
//         if (value.polygon.length >= 3) setPolygonFinished(true);
//       }
//     }
//   }, [value]);

//   useEffect(() => {
//     const data = { point: selectedPoint, polygon: polygonPoints };
//     console.log("MapInput data:", data);
//     if (onChange) onChange(data);
//   }, [selectedPoint, polygonPoints, onChange]);

//   const handleModeChange = (e) => {
//     const newMode = e.target.value;
//     setMode(newMode);
//     if (newMode === "polygon") {
//       setSelectedPoint(null);
//     } else if (newMode === "point") {
//       setPolygonPoints([]);
//       setPolygonFinished(false);
//     }
//   };

//   const handleMapClick = (e) => {
//     const coords = e.get("coords");
//     if (mode === "point") {
//       setSelectedPoint(coords);
//     } else if (mode === "polygon") {
//       if (!polygonFinished) {
//         setPolygonPoints([...polygonPoints, coords]);
//       }
//     }
//   };

//   const finishPolygon = () => {
//     if (polygonPoints.length >= 3) setPolygonFinished(true);
//   };

//   const clearPolygon = () => {
//     setPolygonPoints([]);
//     setPolygonFinished(false);
//   };

//   const clearPoint = () => {
//     setSelectedPoint(null);
//   };

//   const changeMapType = (newType) => {
//     setMapState((prev) => ({ ...prev, type: newType }));
//   };

//   return (
//     <div {...rest}>
//       <Space direction="vertical" style={{ width: "100%" }}>
//         {/* Инструкция для пользователя */}
//         <Paragraph>
//           Выберите режим работы: <strong>Точка</strong> — выберите одну точку на
//           карте, или <strong>Область на карте</strong> — очертите нужную
//           область, кликая по карте. Для области необходимо выбрать не менее 3
//           точек. После завершения области нажмите «Завершить область».
//         </Paragraph>
//         {/* Переключатель режимов */}
//         <Radio.Group onChange={handleModeChange} value={mode}>
//           <Radio.Button value="point">Точка</Radio.Button>
//           <Radio.Button value="polygon">Область на карте</Radio.Button>
//         </Radio.Group>
//         {/* Кнопки управления для каждого режима */}
//         {mode === "polygon" && (
//           <Space>
//             <Button
//               onClick={finishPolygon}
//               disabled={polygonPoints.length < 3 || polygonFinished}
//             >
//               Завершить область
//             </Button>
//             <Button onClick={clearPolygon}>Очистить область</Button>
//           </Space>
//         )}
//         {mode === "point" && (
//           <Button onClick={clearPoint} disabled={!selectedPoint}>
//             Сбросить точку
//           </Button>
//         )}
//         {/* Дополнительные кнопки для переключения типа карты */}
//         <Space>
//           <Button onClick={() => changeMapType("yandex#map")}>
//             Стандартный вид
//           </Button>
//           <Button onClick={() => changeMapType("yandex#hybrid")}>
//             Спутниковый вид
//           </Button>
//         </Space>
//         {/* Карта */}
//         <YMaps>
//           <Map
//             state={mapState}
//             controls={["zoomControl", "typeSelector", "scaleLine"]}
//             width="100%"
//             height="400px"
//             onClick={handleMapClick}
//           >
//             <ZoomControl />
//             {selectedPoint && <Placemark geometry={selectedPoint} />}
//             {polygonPoints.length > 0 && (
//               <Polygon
//                 geometry={[polygonPoints]}
//                 options={{
//                   fillColor: "rgba(0, 0, 255, 0.3)",
//                   strokeColor: "#0000FF",
//                   strokeWidth: 2,
//                 }}
//               />
//             )}
//           </Map>
//         </YMaps>
//       </Space>
//     </div>
//   );
// }
