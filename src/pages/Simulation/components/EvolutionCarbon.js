import React, { useState } from "react";
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
  "darkblue",
  "pink",
  "yellow",
  "orange",
];

const EvolutionCarbon = ({ data }) => {
  const dataKeysArray = Object.keys(data[0]).slice(1);

  const [opacity, setOpacity] = useState(
    Object.fromEntries(dataKeysArray.map((key) => [key, 1]))
  );
  const [dataKeys, setDataKeys] = useState(
    // {player1: 1, player2: 1, ...}
    Object.fromEntries(dataKeysArray.map((key) => [key, key]))
  );

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    console.log(dataKeys);
    console.log(dataKey);
    console.log(dataKeys[dataKey.trim()].trim());
    if (dataKeys[dataKey] === dataKey) {
      // setOpacity(
      //   Object.keys(opacity)
      //     .filter((key) => key !== dataKey)
      //     .forEach((key) => (opacity[key] = 0.5))
      // );
      setOpacity({ ...opacity, [dataKey]: 1 });
      setDataKeys({ ...dataKeys, [dataKey]: dataKeys[dataKey] + " " });
    } else {
      setOpacity({ ...opacity, [dataKey.trim()]: 0.5 });
      setDataKeys({
        ...dataKeys,
        [dataKey.trim()]: dataKeys[dataKey.trim()].trim(),
      });
    }
  };

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
        <Legend
          align="left"
          verticalAlign="middle"
          layout="vertical"
          onClick={handleMouseEnter}
          onMouseEnter={handleMouseEnter}
        />
        {dataKeysArray.map((player, i) => {
          if (player.startsWith("avg")) {
            return (
              <Line
                type="monotone"
                dataKey={dataKeys[player]}
                strokeOpacity={opacity[player]}
                stroke={colors[i]}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
                strokeWidth={5}
                // onMouseEnter={}
              />
            );
          } else {
            return (
              <Line
                type="monotone"
                dataKey={dataKeys[player]}
                strokeOpacity={opacity[player]}
                stroke={colors[i]}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
                // onMouseEnter={}
              />
            );
          }
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EvolutionCarbon;
