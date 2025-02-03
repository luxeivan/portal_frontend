import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark, Polygon } from "@pbe/react-yandex-maps";
import { Button, Radio, Space, Typography } from "antd";

const { Paragraph } = Typography;

export default function MapInput({ name, value = {}, onChange, ...rest }) {
  const [mode, setMode] = useState("point");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [polygonFinished, setPolygonFinished] = useState(false);

  const [mapState, setMapState] = useState({
    center: [55.75, 37.62],
    zoom: 7,
    type: "yandex#map", 
  });

  useEffect(() => {
    if (value) {
      if (value.point) setSelectedPoint(value.point);
      if (value.polygon) {
        setPolygonPoints(value.polygon);
        if (value.polygon.length >= 3) setPolygonFinished(true);
      }
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
      setPolygonFinished(false);
    }
  };

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    if (mode === "point") {
      setSelectedPoint(coords);
    } else if (mode === "polygon") {
      if (!polygonFinished) {
        setPolygonPoints([...polygonPoints, coords]);
      }
    }
  };

  const finishPolygon = () => {
    if (polygonPoints.length >= 3) setPolygonFinished(true);
  };

  const clearPolygon = () => {
    setPolygonPoints([]);
    setPolygonFinished(false);
  };

  const clearPoint = () => {
    setSelectedPoint(null);
  };

  const changeMapType = (newType) => {
    setMapState((prev) => ({ ...prev, type: newType }));
  };

  return (
    <div {...rest}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* Инструкция для пользователя */}
        <Paragraph>
          Выберите режим работы: <strong>Точка</strong> — выберите одну точку на
          карте, или <strong>Область на карте</strong> — очертите нужную
          область, кликая по карте. Для области необходимо выбрать не менее 3
          точек. После завершения области нажмите «Завершить область».
        </Paragraph>
        {/* Переключатель режимов */}
        <Radio.Group onChange={handleModeChange} value={mode}>
          <Radio.Button value="point">Точка</Radio.Button>
          <Radio.Button value="polygon">Область на карте</Radio.Button>
        </Radio.Group>
        {/* Кнопки управления для каждого режима */}
        {mode === "polygon" && (
          <Space>
            <Button
              onClick={finishPolygon}
              disabled={polygonPoints.length < 3 || polygonFinished}
            >
              Завершить область
            </Button>
            <Button onClick={clearPolygon}>Очистить область</Button>
          </Space>
        )}
        {mode === "point" && (
          <Button onClick={clearPoint} disabled={!selectedPoint}>
            Сбросить точку
          </Button>
        )}
        {/* Дополнительные кнопки для переключения типа карты */}
        <Space>
          <Button onClick={() => changeMapType("yandex#map")}>
            Стандартный вид
          </Button>
          <Button onClick={() => changeMapType("yandex#hybrid")}>
            Спутниковый вид
          </Button>
        </Space>
        {/* Карта */}
        <YMaps>
          <Map
            state={mapState}
            controls={["zoomControl", "typeSelector", "scaleLine"]}
            width="100%"
            height="400px"
            onClick={handleMapClick}
          >
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
      </Space>
    </div>
  );
}
