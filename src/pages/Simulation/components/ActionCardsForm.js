import { Button, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import styled from 'styled-components';

import { ActionCardItem } from './ActionCardItem';
import { COLORS } from '../../../vars';

const ActionCardsForm = ({
  handleSubmit,
  handleCardActionSelectionChange,
  handleCheckedActionCard,
  roundIds,
}) => {
  console.log('roundIds', roundIds);
  const { t } = useTranslation();
  const actionCardBatchesEntity = useSelector(
    (state) => state.workshop.entities.actionCardBatches
  );
  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
  );
  const roundsConfigEntity = useSelector(
    (state) => state.workshop.entities.roundsConfig
  );
  // initial active == expanded lot is the last lot of the current round
  const [activeBatch, setActiveBatch] = useState(
    roundsConfigEntity[
      Object.keys(roundsConfigEntity).slice(-1)[0]
    ].actionCardBatchIds.slice(-1)[0]
  );
  function compareName(a, b) {
    if (actionCardBatchesEntity[a].name < actionCardBatchesEntity[b].name) {
      return -1;
    }
    if (actionCardBatchesEntity[a].name > actionCardBatchesEntity[b].name) {
      return 1;
    }
    return 0;
  }
  return (
    <Form noValidate>
      <Form.Row>
        {roundIds.map((roundConfigId) =>
          roundsConfigEntity[roundConfigId].actionCardBatchIds
            .sort(compareName)
            .map((actionCardBatchId) => {
              const {
                name: actionCardBatchName,
                actionCardIds,
              } = actionCardBatchesEntity[actionCardBatchId];
              return (
                <Form.Group
                  as={Col}
                  sm={actionCardBatchId === activeBatch ? '5' : '2'}
                  key={actionCardBatchId}
                >
                  <BatchBadge
                    text={actionCardBatchName}
                    active={actionCardBatchId === activeBatch}
                    handleClick={() => setActiveBatch(actionCardBatchId)}
                  />
                  {actionCardIds.map((actionCardId) => {
                    const {
                      name: actionCardName,
                      cardNumber,
                      sector,
                    } = actionCardsEntity[actionCardId];
                    return (
                      <ActionCardItem
                        key={actionCardId}
                        id={cardNumber}
                        cardNumber={cardNumber}
                        text={actionCardName}
                        sector={sector}
                        category={actionCardsEntity[actionCardId].subCategory}
                        active={actionCardBatchId === activeBatch}
                        checked={handleCheckedActionCard(actionCardId)}
                        cost={actionCardsEntity[actionCardId].cost}
                        handleChange={() =>
                          handleCardActionSelectionChange(actionCardId)
                        }
                      />
                    );
                  })}
                </Form.Group>
              );
            })
        )}
      </Form.Row>
      <Form.Row className="d-flex justify-content-end">
        <PrimaryButton onClick={handleSubmit}>
          {t('common.validate')}
        </PrimaryButton>
      </Form.Row>
    </Form>
  );
};

const BatchBadge = ({ id, text, active, handleClick }) => {
  return (
    <StyledBatch
      name={id}
      className="m-1 mb-3 p-1 btn-block text-center btn"
      active={active}
      onClick={() => {
        handleClick();
      }}
    >
      {text}
    </StyledBatch>
  );
};

const StyledBatch = styled.div`
cursor: pointer;
color: black;
/* font-size: 0.7rem; */
/* border: ${(props) =>
  props.selected ? '3pt solid palegreen' : '3pt solid white'}; */
background: ${(props) =>
  props.active ? COLORS.PRIMARY : COLORS.GRAY.STANDARD};
`;

const PrimaryButton = styled(Button)`
  background-color: ${COLORS.BROWN.STANDARD};
  border-color: ${COLORS.BROWN.STANDARD};
  transition: 0.3s;
  :hover {
    color: ${COLORS.BROWN.STANDARD};
    background-color: white;
    border-color: ${COLORS.BROWN.STANDARD};
  }
`;
export default ActionCardsForm;
