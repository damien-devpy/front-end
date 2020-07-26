import React from 'react';
import styled from 'styled-components';

import { Emoji, sectorColors } from './ActionCardItem';

// used in NewRound modal
// when/if we allow to choose not ony lots but also cards in each lot,
// we won't need this and can just use ActionItem
const ActionCardItemSimple = ({ id, cardNumber, text, sector, cost }) => {
  return (
    <StyledItemSimple
      name={id}
      className="m-1 btn-block rounded-lg d-flex shadow-sm row align-items-center"
      sector={sector}
    >
      <div className="col-1 pl-1 mr-1">
        <Emoji cardNumber={cardNumber} />
      </div>
      <div className="col">{text.toLowerCase()}</div>
      <span className="badge badge-danger float-right ml-auto mr-1">
        {cost}
      </span>
    </StyledItemSimple>
  );
};

const StyledItemSimple = styled.div`
  color: white;
  font-size: 0.7rem;
  background: ${(props) => sectorColors[props.sector]};
`;

export default ActionCardItemSimple;
