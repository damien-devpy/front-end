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

const colorsPalet = [
  'brown',
  'black',
  '#3869B1',
  '#409852',
  '#DA7E30',
  '#6C4D9B',
  COLORS.GOLD,
  'darkblue',
  'pink',
  'darkgreen',
  'orange',
];
const players = (obj) =>
  (obj && Object.keys(obj) && Object.keys(obj).filter((k) => k !== 'year')) ||
  [];
// const sum = (obj) =>
//   players(obj).reduce(
//     (accumulator, currentValue) =>
//       accumulator + parseInt(obj[currentValue], 10),
//     0
//   );

const EvolutionCarbon = () => {
  // Compute data
  const { t } = useTranslation();
  const participants = useSelector((state) =>
    selectParticipantsEntity(state.workshop)
  );

  const participantName = (participantId) => {
    if (Object.keys(participants).includes(participantId)) {
      return `${participants[participantId].firstName} ${
        participants[participantId].lastName.split('')[0]
      }.`;
    }
    if (
      participantId.toString().startsWith('avg_') ||
      participantId.toString().startsWith('obj')
    ) {
      return t(`common.${participantId}`);
    }
    return participantId;
  };

  const evolutionData = useSelector((state) =>
    computeEvolutionGraph(
      selectRoundsEntity(state.workshop),
      selectCarbonFootprintsEntity(state.workshop),
      selectCitizenCarbonFootprintsEntity(state.workshop),
      selectFootprintStructure(state.workshop)
    )
  );
  for (let i = 0; i < evolutionData.length; i++) {
    evolutionData[i].objective = 2000;
  }
  const dataKeysArray = players(evolutionData[0]);
  const initialState = Object.fromEntries(dataKeysArray.map((key) => [key, 1]));
  const curveColors = Object.fromEntries(
    dataKeysArray.map((key, i) => [key, colorsPalet[i]])
  );
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
        <YAxis className="yaxis" type="number" domain={[0, 15000]}>
          <Label
            value="kgCO2e/an/pers"
            style={{ fontSize: '1rem' }}
            angle={-90}
            offset={0}
            position="insideLeft"
          />
        </YAxis>

        {/* <Tooltip /> */}
        {/* labelFormatter={(player_id) => participantName(player_id)} /> */}
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
          let dotSize = 5;
          let strokeWidth = width[player];
          let dot = true;
          if (player.startsWith('avg')) {
            dotSize = 5;
            strokeWidth = width[player] + 4;
            dot = true;
          } else if (player.startsWith('objective')) {
            dotSize = 0;
            strokeWidth = width[player] - 3;
            dot = false;
          }
          return (
            <Line
              type="monotone"
              dataKey={dataKeys[player]}
              name={participantName(player)}
              strokeOpacity={opacity[player]}
              stroke={colors[player]}
              activeDot={dotSize}
              dot={dot}
              // isAnimationActive={false}
              strokeWidth={strokeWidth}
              // onMouseEnter={}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EvolutionCarbon;
