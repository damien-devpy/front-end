import React from 'react';
import styled from 'styled-components';
import cardIcons from '../../../components/cardIcons';
import { COLORS } from '../../../vars';
export const ActionCardItem = ({
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
      className="m-1 mb-2 pr-1 pl-1 btn-block rounded-lg d-flex shadow-sm"
      sector={sector}
      onClick={() => {
        handleChange();
      }}
    >
      {active ? (
        <div className="row align-items-center">
          <div className="col-1 mr-1">
            <span className="emoji">{cardIcons[cardNumber]}</span>
          </div>
          <div className="col card_label">
            {text.toLowerCase()}
            <span
              className="badge float-right badge-light"
              style={{ fontSize: 10 }}
            >
              {cost}
            </span>
          </div>
        </div>
      ) : (
        <div className="col-1 pl-1 mr-1">
          <span className="emoji">{cardIcons[cardNumber]}</span>
        </div>
      )}

      {checked ? (
        <span className="text-success float-right ml-auto">&#x25cf;</span>
      ) : (
        <span className="text-white float-right ml-auto">&#x25cf;</span>
      )}
    </StyledItem>
  );
};

// used in NewRound modal
// when/if we allow to choose not ony lots but also cards in each lot,
// we won't need this and can just use ActionItem
export const ActionCardItemSimple = ({
  id,
  cardNumber,
  text,
  category,
  sector,
  cost,
}) => {
  console.log('sector', sector);
  console.log('cardNumber', cardNumber);

  return (
    <StyledItemSimple
      name={id}
      className="m-1 btn-block rounded-lg d-flex shadow-sm row align-items-center"
      category={category}
      sector={sector}
    >
      <div className="col-1 pl-1 mr-1">
        <span className="emoji">{cardIcons[cardNumber]}</span>
      </div>
      <div className="col">{text.toLowerCase()}</div>
      <span
        className="badge badge-light float-right ml-auto mr-1"
        style={{ fontSize: 10 }}
      >
        {cost}
      </span>
    </StyledItemSimple>
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

const sectorColors = {
  transport: COLORS.FIGMA_BROWN_RED, // "#C80000",
  housing: COLORS.FIGMA_BLUE_LIGHT, // "#20388C",
  household: COLORS.FIGMA_GREEN, // "#388223", // "#C89600"
  food: COLORS.GOLD, // '#C89600'
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

const StyledItemSimple = styled.div`
  color: white;
  font-size: 0.7rem;
  background: ${(props) => sectorColors[props.sector]};
`;
