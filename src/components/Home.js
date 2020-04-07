import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Home = ({ name, date }) => {
  const { t } = useTranslation();

  return <StyledHome>{t('common.home')}</StyledHome>;
};
const StyledHome = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;

export default Home;
