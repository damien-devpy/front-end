import React from "react";
// import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const colors = [
  "blue",
  "red",
  "grey",
  "green",
  "black",
  "brown",
  "lightblue",
  "darkgreen",
  "darkred",
  "pink",
  "yellow",
  "orange",
];

const EvolutionCarbon = ({ data }) => {
  const series = Object.keys(data[0]).slice(1);
  return (
    <LineChart
      width={800}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" type="number" domain={["dataMin", "dataMax"]} />
      <YAxis />
      <Tooltip />
      <Legend align="left" verticalAlign="middle" layout="vertical" />
      {series.map((player, i) => (
        <Line
          type="monotone"
          dataKey={player}
          stroke={colors[i]}
          activeDot={{ r: 6 }}
          isAnimationActive={false}
          // onMouseEnter={}
        />
      ))}
    </LineChart>
  );
};
export default EvolutionCarbon;
