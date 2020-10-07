import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { pathOr } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ActionCardsForm from './ActionCardsForm';
import EuroIcon from '../../../assets/EuroIcon';
import ParticipantsTable from './ParticipantsTable';
import PrimaryButton from '../../../components/PrimaryButton';
import {
  getAllCollectiveChoices,
  getAllIndividualChoicesForParticipant,
  getCostOfChosenActionCards,
  getCostOfChosenCollectiveCards,
  getInitRoundBudget,
  getNumberOfChosenCollectiveCards,
  selectCollectiveChoicesEntity,
  selectIndividualChoicesEntity,
  selectNextRound,
  selectParticipantsEntity,
  selectRoundConfigEntity,
} from '../../../selectors/workshopSelector';
import {
  initRoundAndProcessModel,
  setCollectiveChoices,
  setIndividualChoicesForAllParticipants,
} from '../../../actions/workshop';
import {
  makeYearParticipantKey,
  toggleArrayItem,
} from '../../../utils/helpers';

const ActionCardsEntry = ({
  currentRound,
  roundActionCardType,
  handleClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const roundConfigEntity = useSelector(selectRoundConfigEntity);
  const nextRound = useSelector(selectNextRound);
  const participantsEntity = useSelector(selectParticipantsEntity);
  const actionCardsEntity = useSelector(
    (state) => state.workshop.entities.actionCards
  );

  const [selectedParticipantId, setSelectedParticipantId] = useState(
    participantsEntity ? Object.keys(participantsEntity)[0] : -1
  );

  const handleParticipantSelect = (id) => {
    setSelectedParticipantId(id);
  };

  // these are choices from prev rounds
  const individualChoicesEntity = useSelector(selectIndividualChoicesEntity);
  const collectiveChoicesEntity = useSelector(selectCollectiveChoicesEntity);

  const budgetPerParticipant = getInitRoundBudget(
    roundConfigEntity,
    individualChoicesEntity,
    Object.keys(participantsEntity),
    actionCardsEntity
  );

  // CollectiveBudget is automatically computed and not modifiable
  const budgetCollective = useSelector((state) =>
    pathOr(
      0,
      ['workshop', 'entities', 'rounds', currentRound, 'collectiveBudget'],
      state
    )
  );

  // these are current choices (for this round)
  const [currentIndividualChoices, setCurrentIndividualChoices] = useState({});
  const [currentCollectiveChoices, setCurrentCollectiveChoices] = useState({});

  const isIndividualActionCardChecked = (actionCardId) =>
    currentIndividualChoices &&
    currentIndividualChoices[
      makeYearParticipantKey(currentRound, selectedParticipantId)
    ] &&
    currentIndividualChoices[
      makeYearParticipantKey(currentRound, selectedParticipantId)
    ].actionCardIds.includes(actionCardId);

  const isCollectiveActionCardChecked = (actionCardId) =>
    currentCollectiveChoices &&
    currentCollectiveChoices[currentRound] &&
    currentCollectiveChoices[currentRound].actionCardIds.includes(actionCardId);

  const numberOfPreviousIndividualChoices = (actionCardId) =>
    getAllIndividualChoicesForParticipant(
      selectedParticipantId,
      roundConfigEntity,
      individualChoicesEntity
    ).filter((id) => id === actionCardId).length;

  const numberOfPreviousCollectiveChoices = (actionCardId) =>
    getAllCollectiveChoices(roundConfigEntity, collectiveChoicesEntity).filter(
      (id) => id === actionCardId
    ).length;

  const handleSubmitIndividualChoices = () => {
    dispatch(
      setIndividualChoicesForAllParticipants(
        currentRound,
        currentIndividualChoices
      )
    );
    dispatch(initRoundAndProcessModel(currentRound, nextRound));
    handleClose();
  };

  const handleSubmitCollectiveChoices = () => {
    dispatch(setCollectiveChoices(currentRound, currentCollectiveChoices));
    dispatch(initRoundAndProcessModel(currentRound, nextRound));
    handleClose();
  };

  const toggleIndividualChoiceInMap = (
    individualChoicesMap,
    round,
    participantId, // should always be selectedParticipant
    actionCardId
  ) => {
    const individualChoicesIds = makeYearParticipantKey(round, participantId);
    const actionCardIds =
      individualChoicesMap &&
      individualChoicesMap[individualChoicesIds] &&
      individualChoicesMap[individualChoicesIds].actionCardIds;
    const updatedChoices = {
      ...individualChoicesMap,
      [individualChoicesIds]: {
        participantId,
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    const validChoice =
      getCostOfChosenActionCards(
        updatedChoices,
        actionCardsEntity,
        round,
        participantId
      ) <= budgetPerParticipant[participantId];
    return validChoice ? updatedChoices : individualChoicesMap;
  };

  const toggleCollectiveChoicesInMap = (
    collectiveChoicesMap,
    round,
    actionCardId
  ) => {
    const collectiveChoicesId = round;
    const actionCardIds =
      collectiveChoicesMap &&
      collectiveChoicesMap[collectiveChoicesId] &&
      collectiveChoicesMap[collectiveChoicesId].actionCardIds;
    const updatedChoices = {
      ...collectiveChoicesMap,
      [collectiveChoicesId]: {
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    const validChoice =
      getCostOfChosenCollectiveCards(
        updatedChoices,
        actionCardsEntity,
        round
      ) <= budgetCollective;
    return validChoice ? updatedChoices : collectiveChoicesMap;
  };

  const handleChoicesChange = (round, participantId) => (actionCardId) =>
    participantId
      ? setCurrentIndividualChoices(
          toggleIndividualChoiceInMap(
            currentIndividualChoices,
            round,
            participantId,
            actionCardId
          )
        )
      : setCurrentCollectiveChoices(
          toggleCollectiveChoicesInMap(
            currentCollectiveChoices,
            round,
            actionCardId
          )
        );

  return (
    <Container>
      <Row>
        {roundActionCardType === 'individual' && (
          <Col sm={4} md={4} className="pl-0 pr-0">
            <h5>{t('common.participants')}</h5>
            <ParticipantsTable
              round={currentRound}
              participantsEntity={participantsEntity}
              individualChoices={currentIndividualChoices}
              selectedParticipantId={selectedParticipantId}
              actionCardsEntity={actionCardsEntity}
              handleSelect={handleParticipantSelect}
              initBudgetPerParticipant={budgetPerParticipant}
            />
          </Col>
        )}
        {roundActionCardType === 'collective' && (
          <Col sm={4} md={4}>
            <Row>
              <h5>
                {t('common.actions')}{' '}
                {getNumberOfChosenCollectiveCards(
                  currentCollectiveChoices,
                  currentRound
                )}{' '}
                &#10003;
              </h5>
            </Row>
            <Row>
              <h5>
                {t('common.budget')}{' '}
                {budgetCollective -
                  getCostOfChosenCollectiveCards(
                    currentCollectiveChoices,
                    actionCardsEntity,
                    currentRound
                  )}{' '}
                <EuroIcon width={18} className="fill-current-color" />
              </h5>
            </Row>
          </Col>
        )}

        <Col>
          {roundActionCardType === 'individual' && (
            <ActionCardsForm
              handleCardActionSelectionChange={handleChoicesChange(
                currentRound,
                selectedParticipantId
              )}
              isCheckedActionCard={isIndividualActionCardChecked}
              numberOfPreviousChoices={numberOfPreviousIndividualChoices}
              actionCardType={roundActionCardType}
            />
          )}
          {roundActionCardType === 'collective' && (
            <ActionCardsForm
              handleCardActionSelectionChange={handleChoicesChange(
                currentRound
              )}
              isCheckedActionCard={isCollectiveActionCardChecked}
              numberOfPreviousChoices={numberOfPreviousCollectiveChoices}
              actionCardType={roundActionCardType}
            />
          )}
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <PrimaryButton
          size="lg"
          onClick={
            roundActionCardType === 'individual'
              ? handleSubmitIndividualChoices
              : handleSubmitCollectiveChoices
          }
        >
          {t('common.endTheRound')}
        </PrimaryButton>
      </Row>
    </Container>
  );
};

export default ActionCardsEntry;
