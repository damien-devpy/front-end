import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../vars';

export const ActionCardItem = ({
  id,
  text,
  lot,
  active,
  checked,
  handleChange,
}) => {
  return (
    <StyledItem
      name={id}
      className="m-1 mb-2 p-1 btn-block rounded-lg d-flex shadow-sm"
      lot={lot}
      onClick={() => {
        handleChange();
      }}
    >
      <span>{active ? text : `${text.substring(0, 10)}..`}</span>
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
export const ActionCardItemSimple = ({ id, text, lot }) => {
  return (
    <StyledItemSimple
      name={id}
      className="m-1 pl-3 pr-3 p-1 btn-block rounded-lg shadow-sm"
      lot={lot}
    >
      {text}
    </StyledItemSimple>
  );
};

const batchColors = {
  1: COLORS.FIGMA_BROWN_RED,
  2: COLORS.FIGMA_BLUE_LIGHT,
  3: COLORS.FIGMA_YELLOW,
  4: COLORS.FIGMA_GREEN,
  5: COLORS.FIGMA_VIOLET,
  6: COLORS.FIGMA_BLUE_DARK,
};

const StyledItem = styled.div`
cursor: pointer;
color: black;
font-size: 0.7rem;
/* border: ${(props) =>
  props.selected ? '3pt solid palegreen' : '3pt solid white'}; */
background: ${(props) => batchColors[props.lot]};
`;

const StyledItemSimple = styled.div`
  color: black;
  font-size: 0.5rem;
  background: ${(props) => batchColors[props.lot]};
`;
