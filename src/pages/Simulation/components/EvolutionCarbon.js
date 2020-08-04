import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTranslation } from 'react-i18next';

import './simulationPage.css';
import { COLORS } from '../../../vars';
import { computeEvolutionGraph } from '../../../selectors/footprintSelectors';
import {
  selectCarbonFootprintsEntity,
  selectCitizenCarbonFootprintsEntity,
  selectFootprintStructure,
  selectParticipantsEntity,
  selectRoundsEntity,
} from '../../../selectors/workshopSelector';

// 18 individual colors generated using http://phrogz.net/css/distinct-colors.html
const colorsPalette = [
  COLORS.BLUE.STANDARD,
  COLORS.RED.STANDARD,
  COLORS.BROWN.DARK,
  '#ff6d57',
  '#ffcc00',
  '#4ce060',
  '#00eeff',
  '#3754a3',
  '#a31c76',
  '#ff802b',
  '#a38e37',
  '#37a371',
  '#377fa3',
  '#2b48ff',
  '#ff2b80',
  '#a3641c',
  '#d1e000',
  '#00ffcc',
  '#57b0ff',
  '#dd57ff',
  '#c20034',
];

const mainCategories = ['avg_global', 'avg_participants', 'objective'];

const players = (obj) =>
  (obj && Object.keys(obj) && Object.keys(obj).filter((k) => k !== 'year')) ||
  [];

const addObjectiveTrajectory = (evolutionData) => {
  const newEvolutionData = [...evolutionData];
  const global2020 = evolutionData[0].avg_global;
  const objective = 2;
  const initYear = evolutionData[0].year;
  const finalYear = 2050;

  for (let i = 0; i < evolutionData.length; i += 1) {
    const value =
      global2020 -
      ((global2020 - objective) * (evolutionData[i].year - initYear)) /
        (finalYear - initYear);
    newEvolutionData[i].objective = Math.round(value * 100) / 100;
  }
  return [...newEvolutionData, { year: finalYear, objective }];
};

const EvolutionCarbon = () => {
  // Compute data
  const { t } = useTranslation();
  const participants = useSelector(selectParticipantsEntity);

  const participantName = (participantId) => {
    return mainCategories.includes(participantId.toString())
      ? t(`common.${participantId}`)
      : `${participants[participantId].firstName} ${
          participants[participantId].lastName.split('')[0]
        }.`;
  };

  let evolutionData = useSelector((state) =>
    computeEvolutionGraph(
      selectRoundsEntity(state),
      selectCarbonFootprintsEntity(state),
      selectCitizenCarbonFootprintsEntity(state),
      selectFootprintStructure(state)
    )
  );

  evolutionData = addObjectiveTrajectory(evolutionData);

  const dataKeysArray = players(evolutionData[0]);
  const initialState = Object.fromEntries(dataKeysArray.map((key) => [key, 1]));
  const curveColors = Object.fromEntries([
    ...mainCategories.map((key, i) => [key, colorsPalette[i]]),
    ...dataKeysArray
      .filter((key) => !mainCategories.includes(key))
      .map((key, i) => [key, colorsPalette[i + mainCategories.length]]),
  ]);
  const [opacity, setOpacity] = useState(initialState);
  const [dataKeys, setDataKeys] = useState(
    Object.fromEntries(dataKeysArray.map((key) => [key, key]))
  );
  const [colors, setColors] = useState(curveColors);

  const [width, setWidth] = useState(initialState);

  const handleMouseOver = (o) => {
    const { dataKey } = o;
    const w = width[dataKey];
    setWidth({ ...width, [dataKey]: w + 5 });
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
    const { dataKey } = o;
    // console.log("curve color", curveColors[dataKey.trim()]);
    // console.log(dataKey);
    // console.log(dataKeys[dataKey.trim()].trim());
    if (dataKeys[dataKey] === dataKey) {
      setOpacity({ ...opacity, [dataKey]: 0.5 });
      setColors({ ...colors, [dataKey]: disabled });
      setDataKeys({ ...dataKeys, [dataKey]: `${dataKeys[dataKey]} ` });
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
        minHeight={300}
        data={evolutionData}
        margin={{
          top: 5,
          right: 10,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          type="number"
          domain={['dataMin', 2050]}
          ticks={[2030, 2040, 2050]}
        />
        <YAxis className="yaxis" type="number" domain={[0, 15]}>
          <Label
            value={t('simulation.yAxisLabel')}
            style={{ fontSize: '1rem', textAnchor: 'middle' }}
            angle={-90}
            offset={20}
            position="insideLeft"
          />
        </YAxis>

        <Tooltip
          labelFormatter={(labelId) =>
            dataKeysArray.includes(labelId) ? participantName(labelId) : labelId
          }
        />
        <Legend
          align="left"
          verticalAlign="middle"
          layout="vertical"
          // formatter={colorOnClick}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onFocus={handleMouseOver}
          onMouseOut={handleMouseOut}
          onBlur={handleMouseOut}
        />
        {dataKeysArray.map((player) => {
          let strokeWidth = width[player];
          let dot = true;
          let strokeDasharray = '';
          if (player.startsWith('avg')) {
            // dotSize = 5;
            strokeWidth = width[player] + 4;
            // dot = true;
          } else if (player.startsWith('objective')) {
            dot = false;
            strokeDasharray = '5 5';
          }
          return (
            <Line
              key={`line${player}`}
              type="monotone"
              dataKey={dataKeys[player]}
              name={participantName(player)}
              strokeOpacity={opacity[player]}
              stroke={colors[player]}
              activeDot={dot}
              dot={dot}
              // isAnimationActive={false}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EvolutionCarbon;
