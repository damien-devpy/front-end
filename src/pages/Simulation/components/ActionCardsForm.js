import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ActionCardItem } from './ActionCardItem';
import { COLORS } from '../../../vars';

import PrimaryButton from '../../../components/PrimaryButton';
import {
  selectCheckedCollectiveActionCardsBatchIdsFromRounds,
  selectCheckedIndividualActionCardsBatchIdsFromRounds,
} from '../../../selectors/workshopSelector';

const ActionCardsForm = ({
  handleSubmit,
  handleCardActionSelectionChange,
  handleCheckedActionCard,
  actionCardType,
}) => {
  const { t } = useTranslation();
  const actionCardBatchesEntity = useSelector(
    (state) => state.workshop.entities.actionCardBatches
  );
  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
  );
  const roundConfigEntity = useSelector(
    (state) => state.workshop.entities.roundConfig
  );
  const actionCardsBatchIdsFromRounds = useSelector((state) =>
    actionCardType === 'individual'
      ? selectCheckedIndividualActionCardsBatchIdsFromRounds(state.workshop)
      : selectCheckedCollectiveActionCardsBatchIdsFromRounds(state.workshop)
  );
  // initial active == expanded lot is the last lot of the current round
  const [activeBatch, setActiveBatch] = useState(
    roundConfigEntity[
      Object.keys(roundConfigEntity).slice(-1)[0]
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
        {
          actionCardsBatchIdsFromRounds
            .sort(compareName)
            .map((actionCardBatchId) => {
              if (!actionCardBatchesEntity[actionCardBatchId]) {
                return <></>;
              }
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
          // )
        }
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
color: ${(props) => (props.active ? 'white' : 'black')};
font-weight: ${(props) => (props.active ? 'bolder' : '')};

/* font-size: 0.7rem; */
/* border: ${(props) =>
  props.selected ? '3pt solid palegreen' : '3pt solid white'}; */
background: ${(props) =>
  props.active ? COLORS.PRIMARY : COLORS.GRAY.STANDARD};
`;

export default ActionCardsForm;
