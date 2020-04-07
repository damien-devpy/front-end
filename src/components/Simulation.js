import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Simulation = ({ name, date }) => {
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
