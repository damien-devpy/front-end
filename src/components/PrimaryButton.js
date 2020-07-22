import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { COLORS } from '../vars';

const PrimaryButton = styled(Button)`
  background-color: ${COLORS.BROWN.STANDARD};
  border-color: ${COLORS.BROWN.STANDARD};
  font-weight: 500;
  transition: 0.3s;
  box-shadow: 0px 0px 0px 0px ${COLORS.BROWN.STANDARD};
  :focus,
  :hover, &.active, .active:focus {
    // color: ${COLORS.BROWN.STANDARD} !important;
    // font-weight: bolder !important;
    // background-color: white !important;
    box-shadow: 0px 0px 0px 0px;
    color: ${COLORS.WHITE} !important;
    background-color: ${COLORS.BROWN.DARK} !important;
    border-color: ${COLORS.BROWN.DARK} !important;
  };
  :disabled {
    color: ${COLORS.WHITE} !important;
    background-color: ${COLORS.BROWN.DARK} !important;
    border-color: ${COLORS.BROWN.DARK} !important;
    opacity: 0.5
  }
  :disabled {
    color: ${COLORS.GRAY.STANDARD};
    font-weight: bolder;
    background-color: white;
    border-color: ${COLORS.GRAY.STANDARD};
  }
`;

export default PrimaryButton;
