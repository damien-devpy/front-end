import React from 'react';

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

const FootprintDistribution = ({ population, t }) => (
  <ResponsiveContainer width="100%" height="200%" minHeight={100} aspect={0.7}>
    <BarChart
      data={population}
      margin={{
        top: 10,
        right: 10,
        left: 10,
        bottom: 5,
      }}
      barCategoryGap="10"
    >
      <CartesianGrid strokeDasharray="3" />
      <XAxis dataKey="year" />
      <YAxis dataKey="">
        <Label style={{ fontSize: '0.8rem', textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip itemStyle={{ fontSize: '0.8rem' }} />
      <Legend layout="vertical" />
      <Bar
        name={t('results.avgTotal')}
        dataKey="avgTotal"
        stackId="a"
        fill="#ED7D31"
      />
      <Bar
        name={t('results.avgIndividualReduction')}
        dataKey="avgIndividualReduction"
        stackId="a"
        fill="#B7D6A3"
      />
      <Bar
        name={t('results.avgCollectiveReduction')}
        dataKey="avgCollectiveReduction"
        stackId="a"
        fill="#CCCCCC"
      />
    </BarChart>
  </ResponsiveContainer>
);

export default FootprintDistribution;
