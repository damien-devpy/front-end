import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../vars';
import { Button } from 'react-bootstrap';
const PrimaryButton = styled(Button)`
  background-color: ${COLORS.BROWN.STANDARD};
  border-color: ${COLORS.BROWN.STANDARD};
  transition: 0.3s;
  :active,
  :focus,
  :hover {
    color: ${COLORS.BROWN.STANDARD} !important;
    font-weight: bolder !important;
    background-color: white !important;
    border-color: ${COLORS.BROWN.STANDARD} !important;
  }
`;

export default PrimaryButton;
