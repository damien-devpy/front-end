/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';

import cardIcons from './cardIcons';
import { COLORS } from '../vars';

const ActionCardItem = ({
  id,
  cardNumber,
  text,
  sector,
  active,
  checked,
  cost,
  handleChange,
}) => {
  return (
    <StyledItem
      name={id}
      checked={checked}
      cardNumber={cardNumber}
      className="container rounded-lg shadow-sm mb-2 btn-block"
      sector={sector}
      onClick={() => {
        handleChange();
      }}
    >
      {active ? (
        <div className="row align-items-center">
          <div className="col-2 p-1">
            <span className="emoji">{cardIcons[cardNumber]}</span>
          </div>
          <div className="col-9 p-1">{text.toLowerCase()}</div>
          <div className="col-1 pl-0 pr-1 d-flex align-items-end align-self-stretch flex-column">
            <div>
              {checked ? (
                <img
                  src={require('../assets/GreenIndicator.svg')}
                  width="14"
                  height="14"
                />
              ) : (
                <img
                  src={require('../assets/WhiteIndicator.svg')}
                  width="13"
                  height="13"
                />
              )}
            </div>
            <div className="mt-auto">
              <b>{cost}</b>
            </div>
          </div>
        </div>
      ) : (
        <div className="row align-items-center">
          <div className="col-6 p-1">
            <span className="emoji">{cardIcons[cardNumber]}</span>
          </div>
          <div className="col-6 pl-0 pr-1 d-flex align-items-end align-self-stretch flex-column">
            <div>
              {checked ? (
                <img
                  src={require('../assets/GreenIndicator.svg')}
                  width="14"
                  height="14"
                />
              ) : (
                <img
                  src={require('../assets/WhiteIndicator.svg')}
                  width="13"
                  height="13"
                />
              )}
            </div>
            <div className="mt-auto">
              <b>{cost}</b>
            </div>
          </div>
        </div>
      )}
    </StyledItem>
  );
};

export const sectorColors = {
  transport: COLORS.FIGMA_BROWN_RED, // "#C80000",
  housing: COLORS.FIGMA_BLUE_LIGHT, // "#20388C",
  household: COLORS.FIGMA_GREEN, // "#388223", // "#C89600"
  food: COLORS.YELLOW.GOLD, // '#C89600'
  awareness: COLORS.PURPLE.LIGHT,
  activism: COLORS.PURPLE.STANDARD,
  lobby: COLORS.PURPLE.STANDARD,
  services: COLORS.ORANGE.DARK,
  professional: COLORS.PURPLE.DARK,
  education: COLORS.PURPLE.MILD,
  energy: COLORS.FIGMA_BLUE_DARK,
};

const StyledItem = styled.div`
  cursor: pointer;
  font-size: 0.8rem;
  color: white;
  background: ${(props) => sectorColors[props.sector]};
`;

export default ActionCardItem;
