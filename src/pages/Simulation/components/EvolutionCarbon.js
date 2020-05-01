import React from "react";
// import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
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
    <ResponsiveContainer width="100%" minWidth={800} aspect={5.0 / 3.0}>
      <LineChart
        minWidth={200}
        minHeight={100}
        data={data}
        margin={{
          top: 5,
          right: 10,
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
    </ResponsiveContainer>
  );
};
export default EvolutionCarbon;
