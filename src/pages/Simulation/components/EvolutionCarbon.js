import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { computeEvolutionGraph } from '../../../selectors/footprintSelectors';
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
} from 'recharts';

const colorsPalet = [
  'blue',
  'red',
  'purple',
  'green',
  'black',
  'brown',
  'lightblue',
  'darkgreen',
  'darkblue',
  'pink',
  'yellow',
  'orange',
];
const players = (obj) => Object.keys(obj).filter((k) => k !== 'year');
const sum = (obj) =>
  players(obj).reduce(
    (accumulator, currentValue) => accumulator + parseInt(obj[currentValue]),
    0
  );
const avg_players = (obj) => (sum(obj) / players(obj).length).toFixed(0) || 0;

const EvolutionCarbon = () => {
  // Compute data
  const rounds = useSelector((state) => state.workshop.entities.rounds);
  const carbonFootprints = useSelector(
    (state) => state.workshop.entities.carbonFootprints
  );

  const evolutionData = computeEvolutionGraph(rounds, carbonFootprints);
  //  Add average players
  for (var i = 0; i < evolutionData.length; i++) {
    evolutionData[i].avg_players = avg_players(evolutionData[i]);
  }

  const dataKeysArray = players(evolutionData[0]);
  const initialState = Object.fromEntries(dataKeysArray.map((key) => [key, 1]));
  const curveColors = Object.fromEntries(
    dataKeysArray.map((key, i) => [key, colorsPalet[i]])
  );
  console.log('evolutionData : ', evolutionData);
  const [opacity, setOpacity] = useState(initialState);
  const [dataKeys, setDataKeys] = useState(
    Object.fromEntries(dataKeysArray.map((key) => [key, key]))
  );
  const [colors, setColors] = useState(curveColors);

  const [width, setWidth] = useState(initialState);

  const handleMouseOver = (o) => {
    const { dataKey } = o;
    var w = width[dataKey];
    setWidth({ ...width, [dataKey]: w + 3 });
    setOpacity({ ...opacity, [dataKey]: 1 });
  };
  const handleMouseOut = (o) => {
    // console.log("Mouse Out", o);
    // const { dataKey } = o;
    // var w = width[dataKey];
    // setWidth({ ...width, [dataKey]: w - 2 });
    // console.log(width);
    setWidth(initialState);

    // setOpacity({ ...opacity, [dataKey]: 1 });
  };

  const handleClick = (o) => {
    const disabled = '#d3d3d3';
    const { dataKey, color } = o;
    // console.log("curve color", curveColors[dataKey.trim()]);
    // console.log(dataKey);
    // console.log(dataKeys[dataKey.trim()].trim());
    if (dataKeys[dataKey] === dataKey) {
      setOpacity({ ...opacity, [dataKey]: 0.5 });
      setColors({ ...colors, [dataKey]: disabled });
      setDataKeys({ ...dataKeys, [dataKey]: dataKeys[dataKey] + ' ' });
    } else {
      setOpacity({ ...opacity, [dataKey.trim()]: 1 });
      setColors({ ...colors, [dataKey.trim()]: curveColors[dataKey.trim()] });

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
        data={evolutionData}
        margin={{
          top: 5,
          right: 10,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" type="number" domain={['dataMin', 'dataMax']} />
        <YAxis />
        <Tooltip />
        <Legend
          align="left"
          verticalAlign="middle"
          layout="vertical"
          // formatter={colorOnClick}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
        {dataKeysArray.map((player, i) => {
          if (player.startsWith('avg')) {
            return (
              <Line
                type="monotone"
                dataKey={dataKeys[player]}
                strokeOpacity={opacity[player]}
                stroke={colors[player]}
                activeDot={{ r: 5 }}
                // isAnimationActive={false}
                strokeWidth={width[player] + 4}
                // onMouseEnter={}
              />
            );
          } else {
            return (
              <Line
                type="monotone"
                dataKey={dataKeys[player]}
                strokeOpacity={opacity[player]}
                strokeWidth={width[player]}
                stroke={colors[player]}
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
