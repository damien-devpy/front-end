import React from 'react';
import { useTranslation } from 'react-i18next';

import DefaultLegendContent from 'recharts/lib/component/DefaultLegendContent';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const colors = {
  transports: ['#FF0000', '#C00001', '#700001', '#FF5A5C', '#FFCCFF'],
  housing: ['#1E4E79', '#2E75B6', '#7BD7EE'],
  food: ['#7F6001', '#B58D0D', '#DEC268', '#E0AC00', '#FFCF34'],
  others: ['#385723', '#70AD47', '#A9D18E'],
  publicServices: ['#B37850', '#ED7D31', '#FCAC76'],
};

// console.log("layout.sum", layout.sum());

// const reduceFootprint = (footprintData) => {
//   footprintData.map(sectorData => {
//     if (sectorData.children.length > 1) {
//       sectorData.value = sectorData.children.reduce((acc, element)=> acc + element[value])
//     }
//     else return sectorData.value = sectorData.children.value
//   }
// };
const categories = (footprint) => {
  const categs = footprint.reduce((obj, sectorData) => {
    obj[sectorData.name] = Object.keys(sectorData)
      .filter((key) => key !== 'name')
      // sorted so that vertical top element = first alphabetically
      .sort()
      .reverse();
    return obj;
  }, {});
  return categs;
};

const footprintDataBar = (footprint, t) => {
  const graphBars = [];
  Object.keys(categories(footprint)).forEach((sector, s) =>
    categories(footprint)[sector].forEach((categ, c) => {
      graphBars.push(
        <Bar
          name={t(`${sector}.${categ}`)}
          dataKey={categ}
          stackId="a"
          fill={colors[sector][c]}
        />
      );
    })
  );
  return graphBars;
};

const renderLegend = (props) => {
  const { payload, footprint, t } = props;
  // console.log('payload', payload);
  // console.log('footprint', footprint);

  const newProps = props;
  newProps.layout = 'vertical';
  return (
    <div className="legend no-gutters row">
      {/* style={{ display: 'table-row', width: '100%' }}> */}
      {footprint.map((sectorData) => {
        newProps.payload = payload
          .filter((entry) => Object.keys(sectorData).includes(entry.dataKey))
          .reverse();
        return (
          <div
            className="legend-sector col"
            style={{
              display: 'table-cell',
              // paddingRight: '20px',
              width: 'auto',
              // fontSize: 12,
              fontSize: '0.7vw',
            }}
          >
            {/* <h6> {t(`common.${sectorData.name}`)} </h6> */}
            <span style={{ fontSize: '0.9vw', fontWeight: '500' }}>
              {t(`common.${sectorData.name}`)}
            </span>
            <DefaultLegendContent {...newProps} />
          </div>
        );
      })}
    </div>
  );
};

const FootprintGraph = ({ footprint, width = '100%', height = '50%', ref }) => {
  const { t } = useTranslation();
  const dataMax = 5;

  return (
    <ResponsiveContainer
      width={width}
      height={height}
      minHeight={100}
      aspect={3.0 / 2.5}
    >
      <BarChart
        data={footprint}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 5,
        }}
        barCategoryGap="10"
        ref={ref}
      >
        <CartesianGrid strokeDasharray="3" />
        <XAxis
          dataKey="name"
          // tickFormatter={(label) => t(`common.${label}`)}
          tickFormatter={(label) => ''}
          // type="number"
        />
        <YAxis dataKey="" domain={[0, dataMax]}>
          <Label
            value={t('simulation.yAxisLabel')}
            style={{ fontSize: '0.8rem', textAnchor: 'middle' }}
            angle={-90}
            offset={20}
            position="insideLeft"
          />
        </YAxis>

        <Tooltip
          labelFormatter={(label) => t(`common.${label}`)}
          itemSorter={(item) =>
            Object.keys(item.payload).sort().indexOf(item.dataKey)
          }
        />
        <Legend
          layout="vertical"
          footprint={footprint}
          content={renderLegend}
          t={t}
        />
        {footprintDataBar(footprint, t)}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FootprintGraph;
