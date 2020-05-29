import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../vars';

export const ActionCardItem = ({
  id,
  text,
  category,
  active,
  checked,
  cost,
  handleChange,
}) => {
  return (
    <StyledItem
      name={id}
      className="m-1 mb-2 pr-1 pl-1 btn-block rounded-lg d-flex shadow-sm"
      category={category}
      onClick={() => {
        handleChange();
      }}
    >
      {active ? (
        <div className="row align-items-center">
          <div className="col-1 mr-1">
            <span className="emoji">{cardIcons[id]}</span>
          </div>
          <div className="col">
            {text.toLowerCase()}
            {/* <span className="badge badge-danger">{cost}</span> */}
          </div>
        </div>
      ) : (
        <div className="col-1 pl-1 mr-1">
          <span className="emoji">{cardIcons[id]}</span>
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
export const ActionCardItemSimple = ({ id, text, category, cost }) => {
  return (
    <StyledItemSimple
      name={id}
      className="m-1 btn-block rounded-lg d-flex shadow-sm row align-items-center"
      category={category}
    >
      <div className="col-1 pl-1 mr-1">
        <span className="emoji">{cardIcons[id]}</span>
      </div>
      <div className="col">{text.toLowerCase()}</div>      
      <span className="badge badge-danger float-right ml-auto mr-1">{cost}</span>
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

const categoryColors = {
  TRANSPORT: COLORS.FIGMA_BROWN_RED, // "#C80000",
  LOGEMENT: COLORS.FIGMA_BLUE_DARK, // "#20388C",
  CONSO: COLORS.FIGMA_GREEN, // "#388223", // "#C89600"
  'BIENS DE CONSO': COLORS.FIGMA_YELLOW, // '#C89600'
};

// just for test at the moment
const cardIcons = {
  1: '🚲',
  2: '🚇',
  3: '🚗',
  4: '💻',
  5: '🛵',
  6: '✈',
  7: '🌡',
  8: '🛁',
  9: '🔌',
  10: '🔋',
  11: '🏘',
  12: '🖨',
  23: '👫',
  24: '📚',

  // 🚙
};

const StyledItem = styled.div`
cursor: pointer;
color: black;
font-size: 0.8rem;
/* border: ${(props) =>
  props.selected ? '3pt solid palegreen' : '3pt solid white'}; */
background: ${(props) => categoryColors[props.category]};
`;

const StyledItemSimple = styled.div`
  color: black;
  font-size: 0.7rem;
  background: ${(props) => categoryColors[props.category]};
`;
