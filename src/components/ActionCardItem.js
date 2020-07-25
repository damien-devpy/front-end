/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';

import cardIcons from './cardIcons';
import { COLORS } from '../vars';

const sizeGreen = 11;
const sizeWhite = 10;

export const Emoji = ({ cardNumber }) => (
  <span className="emoji" style={{ fontSize: '1.5rem' }}>
    {cardIcons[cardNumber]}
  </span>
);

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
      checked={checked}
      className="container rounded-lg shadow-sm mb-2 btn-block"
      sector={sector}
      onClick={() => {
        handleChange();
      }}
    >
      {active ? (
        <div className="row align-items-center">
          <div className="col-2 p-1">
            <Emoji cardNumber={cardNumber} />
          </div>
          <div className="col p-1">{text.toLowerCase()}</div>
          <div className="col-auto pl-0 pr-1 d-flex align-items-end align-self-stretch flex-column">
            <div>
              {checked ? (
                <img
                  src={require('../assets/GreenIndicator.svg')}
                  width={sizeGreen}
                  height={sizeGreen}
                />
              ) : (
                <img
                  src={require('../assets/WhiteIndicator.svg')}
                  width={sizeWhite}
                  height={sizeWhite}
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
          <div className="col-5 p-1">
            <Emoji cardNumber={cardNumber} />
          </div>
          <div className="col-7 pl-0 pr-1 d-flex align-items-end align-self-stretch flex-column">
            <div>
              {checked ? (
                <img
                  src={require('../assets/GreenIndicator.svg')}
                  width={sizeGreen}
                  height={sizeGreen}
                />
              ) : (
                <img
                  src={require('../assets/WhiteIndicator.svg')}
                  width={sizeWhite}
                  height={sizeWhite}
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

// FROM https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
const adjust = (color, amount) => {
  return `#${color
    .replace(/^#/, '')
    .replace(/../g, (color) =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
        16
      )}`.substr(-2)
    )}`;
};

const StyledItem = styled.div`
  cursor: pointer;
  font-size: 0.8rem;
  color: white;
  background: ${(props) =>
    props.checked
      ? adjust(sectorColors[props.sector], -40)
      : sectorColors[props.sector]};
`;

export default ActionCardItem;
