import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Resources = () => {
  const { t } = useTranslation();

  return (
    <>
      <StyledResources>{t('common.resources')}</StyledResources>;)
    </>
  );
};
const StyledResources = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;

export default Resources;
