import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import NavbarHome from '../components/NavbarHome';

const Results = () => {
  const { t } = useTranslation();

  return (
    <>
      <NavbarHome />
      <StyledResults>{t('common.results')}</StyledResults>
    </>
  );
};
const StyledResults = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;

export default Results;
