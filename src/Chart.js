import React from "react";
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Scatter
} from "recharts";
import { useZoom } from "./hooks/useZoom";
import { normalDistribution } from "./utils/random";

const numberOfPoints = 1000;

const randomGrowth = normalDistribution(numberOfPoints, 10, 8);
const randomRisk = normalDistribution(numberOfPoints, 20, 4);

const data = new Array(numberOfPoints).fill({}).map((point, index) => ({
  Risk: randomRisk[index],
  Growth: randomGrowth[index]
}));

const ZoomScatterChart = () => {
  const {
    transform,
    onMouseEnter,
    onMouseLeave,
    zoomIn,
    zoomOut,
    zoomPercentage
  } = useZoom({
    x: 0,
    y: 0,
    scale: 1
  });

  const parseMinTick = (dataMin) => (dataMin - 5).toFixed(2);

  const parseMaxTick = (dataMax) => (dataMax + 5).toFixed(2);

  console.log(transform);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width: "600px", height: "400px", overflow: "hidden" }}
    >
      <ScatterChart
        width={600}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`
        }}
      >
        <XAxis
          type="number"
          dataKey="Risk"
          name="Risk"
          unit="%"
          domain={[parseMinTick, parseMaxTick]}
        />
        <YAxis
          type="number"
          dataKey="Growth"
          name="Growth"
          unit="%"
          domain={[parseMinTick, parseMaxTick]}
        />
        <CartesianGrid />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
      <div style={{ position: "fixed" }}>
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>-</button>
        <span>{zoomPercentage.toFixed(0)}%</span>
      </div>
      <div>
        <button></button>
      </div>
    </div>
  );
};

export default ZoomScatterChart;
