/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';
import cardIcons from './cardIcons';
import { COLORS } from '../vars';
// import svgTag from '../assets/1293960051.js';
// import CheckIcon from '../assets/1293960051.svg';

// const logo = require('../assets/1293960051.svg');

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
      // className="mb-2 btn-block rounded-lg shadow-sm"
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
                // <CheckIcon />
                // <img src={require('./1293960051.svg')} width="15" height="15"></img>
                <img
                  src={require('./Green round button.svg')}
                  width="14"
                  height="14"
                />
              ) : (
                // <img src={CheckIcon}/>
                // <div dangerouslySetInnerHTML={{__html: svgTag}} />
                // <span className="text-white">&#x25cf;</span>
                <img src={require('./mybutton.svg')} width="13" height="13" />
              )}
            </div>
            <div className="mt-auto">
              {/* <span className="badge badge-danger">{cost}</span> */}
              <b>{cost}</b>
            </div>
          </div>
        </div>
      ) : (
        <div className="row align-items-center">
          <div className="col-6 p-1">
            <span className="emoji">{cardIcons[cardNumber]}</span>
          </div>
          {/* <div className="col-auto"></div> */}
          <div className="col-6 pl-0 pr-1 d-flex align-items-end align-self-stretch flex-column">
            <div>
              {checked ? (
                // <CheckIcon />
                // <img src={require('./1293960051.svg')} width="15" height="15"></img>
                <img
                  src={require('./Green round button.svg')}
                  width="14"
                  height="14"
                />
              ) : (
                // <img src={CheckIcon}/>
                // <div dangerouslySetInnerHTML={{__html: svgTag}} />
                // <span className="text-white">&#x25cf;</span>
                <img src={require('./mybutton.svg')} width="13" height="13" />
              )}
            </div>
            <div className="mt-auto">
              {/* <span className="badge badge-danger">{cost}</span> */}
              <b>{cost}</b>
            </div>
          </div>
        </div>
      )}
    </StyledItem>
  );
};

// const batchColors = {
//   1: COLORS.FIGMA_BROWN_RED,
//   2: COLORS.FIGMA_BLUE_LIGHT,
//   3: COLORS.FIGMA_YELLOW,
//   4: COLORS.FIGMA_GREEN,
//   5: COLORS.FIGMA_VIOLET,
//   6: COLORS.FIGMA_BLUE_DARK,
// };

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
/* border: ${(props) =>
  props.checked ? '3pt solid palegreen' : '3pt solid white'}; */
background: ${(props) => sectorColors[props.sector]};
`;

export default ActionCardItem;
