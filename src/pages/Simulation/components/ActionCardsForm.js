import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ActionCardItem from '../../../components/ActionCardItem';

import {
  selectCheckedCollectiveActionCardsBatchIdsFromRounds,
  selectCheckedIndividualActionCardsBatchIdsFromRounds,
} from '../../../selectors/workshopSelector';

const ActionCardsForm = ({
  // handleSubmit,
  handleCardActionSelectionChange,
  isCheckedActionCard,
  numberOfPreviousChoices,
  actionCardType,
}) => {
  const { t } = useTranslation();
  const actionCardBatchesEntity = useSelector(
    (state) => state.workshop.entities.actionCardBatches
  );
  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
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
  const actionCardsBatchIdsFromRounds = useSelector((state) =>
    (actionCardType === 'individual'
      ? selectCheckedIndividualActionCardsBatchIdsFromRounds(state.workshop)
      : selectCheckedCollectiveActionCardsBatchIdsFromRounds(state.workshop)
    ).sort(compareName)
  );
  // initial active == expanded lot is the last lot of the current round
  const [activeBatch, setActiveBatch] = useState(
    actionCardsBatchIdsFromRounds.slice(-1)[0]
  );

  return (
    <Form.Row>
      {actionCardsBatchIdsFromRounds.map((actionCardBatchId) => {
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
                  checked={isCheckedActionCard(actionCardId)}
                  previousChoices={numberOfPreviousChoices(actionCardId)}
                  cost={actionCardsEntity[actionCardId].cost}
                  handleChange={() =>
                    handleCardActionSelectionChange(actionCardId)
                  }
                />
              );
            })}
          </Form.Group>
        );
      })}
    </Form.Row>
  );
};

const BatchBadge = ({ id, text, active, handleClick }) => {
  return (
    <Button
      name={id}
      className="mb-3 p-1 btn-block text-center"
      variant="outline-primary"
      active={active}
      onClick={() => {
        handleClick();
      }}
    >
      {text}
    </Button>
  );
};

// const StyledBatch = styled.div`
// cursor: pointer;
// color: ${(props) => (props.active ? 'white' : 'black')};
// font-weight: ${(props) => (props.active ? 'bolder' : '')};

// /* font-size: 0.7rem; */
// /* border: ${(props) =>
//   props.selected ? '3pt solid palegreen' : '3pt solid white'}; */
// background: ${(props) =>
//   props.active ? COLORS.PRIMARY : COLORS.GRAY.STANDARD};
// `;

export default ActionCardsForm;
