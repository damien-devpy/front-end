import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <p>{t('common.copyright')}</p>
    </StyledFooter>
  );
};
const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem; /* Footer height */
  background: #ffb45b;
  & > p {
    margin-left: 2rem;
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
`;

export default Footer;
