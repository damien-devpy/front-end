import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  Area,
  Bar
} from "recharts";

const Simulation = () => {
  const { t } = useTranslation();

  return <StyledSimulation>{t('common.simulation')}</StyledSimulation>;
};

const StyledSimulation = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;


export default Simulation;
