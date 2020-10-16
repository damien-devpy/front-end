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

const categories = (footprint) =>
  footprint.reduce(
    (accumulator, sectorData) => ({
      ...accumulator,
      [sectorData.name]: Object.keys(sectorData)
        .filter((key) => key !== 'name')
        // sorted so that vertical top element = first alphabetically
        .sort()
        .reverse(),
    }),
    {}
  );

const footprintDataBar = (footprint, t) => {
  const graphBars = [];
  Object.keys(categories(footprint)).forEach((sector) =>
    categories(footprint)[sector].forEach((categ, c) => {
      graphBars.push(
        <Bar
          key={`${sector}.${categ}`}
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
  const { payload, footprint, t, content, ...rest } = props;
  return (
    <div className="legend no-gutters row">
      {footprint.map((sectorData) => {
        const newPayload = payload
          .filter((entry) => Object.keys(sectorData).includes(entry.dataKey))
          .reverse();
        return (
          <div
            key={sectorData.name}
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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <DefaultLegendContent {...rest} payload={newPayload} />
          </div>
        );
      })}
    </div>
  );
};

const FootprintGraph = ({
  footprint,
  legend = true,
  width = '100%',
  aspect = 1,
}) => {
  const { t } = useTranslation();
  const dataMax = 5;

  return (
    // <div style={{ width: 500, height: 300 }}>
    <div>
      <ResponsiveContainer width={width} minHeight={100} aspect={aspect}>
        <BarChart
          // width={500}
          // height={200}
          data={footprint}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 5,
          }}
          barCategoryGap="10"
        >
          <CartesianGrid strokeDasharray="3" />
          <XAxis
            dataKey="name"
            // tickFormatter={(label) => t(`common.${label}`)}
            tickFormatter={() => ''}
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
          {legend && (
            <Legend
              layout="vertical"
              footprint={footprint}
              content={renderLegend}
              t={t}
            />
          )}
          {footprintDataBar(footprint, t)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FootprintGraph;
