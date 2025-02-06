import React, { useEffect, useRef } from "react";
import { Typography } from "antd";
import { useMap } from "../../../stores/useMap";
import MapControls from "./MapControls";
import MapDisplay from "./MapDisplay";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs;

const { Paragraph } = Typography;

export default function MapInput({ name, value = {}, onChange }) {
  const mapRef = useRef(null);
  const {
    mode,
    selectedPoint,
    polygonPoints,
    mapState,
    handleModeChange, //переключаем режим: точка, область или область+точка
    handleMapClick, //обрабатываем клик по карте: добавляем точку или вершину области
    clearPolygon, // очищаем область
    clearPoint, // очищаем точку
    changeMapType, // меняем тип карты: стандартная или спутниковая
    generatePDF, // генерируем пдфку с картой
  } = useMap(value);

  useEffect(() => {
    const data = { point: selectedPoint, polygon: polygonPoints };
    if (onChange) onChange(data);
  }, [selectedPoint, polygonPoints, onChange]);

  const showSavePdfButton =
    (mode === "point" && selectedPoint) ||
    (mode === "polygon" && polygonPoints.length >= 3) ||
    (mode === "areaAndPoint" && selectedPoint && polygonPoints.length >= 3);

  return (
    <div style={{ padding: "16px" }}>
      <Paragraph>
        Выберите режим работы: <strong>Точка</strong> — выберите одну точку на
        карте, или <strong>Область на карте</strong> — очертите нужную область,
        кликая по карте.
      </Paragraph>
      <MapControls
        mode={mode}
        onModeChange={handleModeChange}
        onClearPoint={clearPoint}
        onClearPolygon={clearPolygon}
        onChangeMapType={changeMapType}
        showSavePdfButton={showSavePdfButton}
        onSavePdf={() =>
          generatePDF(mode, selectedPoint, polygonPoints, mapRef, mapState)
        }
      />
      <div style={{ marginTop: "16px" }}>
        <MapDisplay
          mapState={mapState}
          onBoundsChange={(e) => console.log(e)}
          onClick={(e) => handleMapClick(e.get("coords"))}
          selectedPoint={selectedPoint}
          polygonPoints={polygonPoints}
          mapRef={mapRef}
        />
      </div>
    </div>
  );
}
