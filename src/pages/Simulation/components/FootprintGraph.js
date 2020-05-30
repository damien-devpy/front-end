import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import { hierarchy } from 'd3-hierarchy';
import DefaultLegendContent from 'recharts/lib/component/DefaultLegendContent';
const colors = {
  transports: ['#FF0000', '#C00001', '#700001', '#FF5A5C', '#FFCCFF'],
  housing: ['#1E4E79', '#2E75B6', '#7BD7EE'],
  food: ['#7F6001', '#B58D0D', '#DEC268', '#FFCF34'],
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
  var categs = footprint.reduce((obj, sectorData) => {
    obj[sectorData.name] = Object.keys(sectorData)
      .filter((key) => key != 'name')
      .sort();
    return obj;
  }, {});
  return categs;
};

const footprintDataBar = (footprint, t) => {
  console.log('categories(footprint)', categories(footprint));
  var graphBars = [];
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

  var newProps = props;
  newProps.layout = 'vertical';
  return (
    <div className="legend" style={{ display: 'table-row', width: '100%' }}>
      {footprint.map((sectorData) => {
        newProps.payload = payload.filter((entry) =>
          Object.keys(sectorData).includes(entry.dataKey)
        );
        return (
          <div
            className="legend-sector"
            style={{
              display: 'table-cell',
              paddingRight: '20px',
              width: 'auto',
              fontSize: 12,
            }}
          >
            <h6> {t(`common.${sectorData.name}`)} </h6>
            <DefaultLegendContent {...newProps} />
          </div>
        );
      })}
    </div>
  );
};

const FootprintGraph = ({ footprint }) => {
  const { t } = useTranslation();

  // const footprint = useSelector((state) =>
  //   footprintDataToGraph(
  //     state.workshop.entities.carbonFootprints['2020-1'].footprint
  //   )
  // );
  console.log('footprint graph :', footprint);

  return (
    <ResponsiveContainer
      width="100%"
      height="50%"
      minHeight={100}
      aspect={4.0 / 3.0}
    >
      <BarChart
        // width={730}
        // height={250}
        data={footprint}
        margin={{
          top: 20,
          right: 10,
          left: 10,
          bottom: 5,
        }}
        barCategoryGap="10"
      >
        <CartesianGrid strokeDasharray="3" />
        <XAxis
          dataKey="name"
          tickFormatter={(label) => t(`common.${label}`)}
          // type="number"
        />
        <YAxis
          dataKey=""
          label={{ value: 'kCO2', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip labelFormatter={(label) => t(`common.${label}`)} />
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
