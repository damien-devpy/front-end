import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

import { toggleArrayItem } from '../../../utils/helpers';
import IndividualActionsForm from './IndividualActionsForm';
import ParticipantsTable from './ParticipantsTable';
import {
  setIndividualActionsForAllParticipants,
  applyIndividualActions,
  computeFootprints,
} from '../../../actions/workshop';

const IndividualActions = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentRound = useSelector(
    (state) => state.workshop.result.currentYear
  );
  const nextRound = useSelector((state) => {
    const config =
      state.workshop.entities.roundsConfig[state.workshop.result.currentYear];
    return config ? config.targetedYear : null;
  });
  const workshopParticipants = useSelector(
    (state) => state.workshop.result.participants
  );
  const [selectedParticipantId, setSelectedParticipantId] = useState(
    workshopParticipants ? workshopParticipants[0] : -1
  );
  const participantsEntity = useSelector(
    (state) => state.workshop.entities.participants
  );
  const handleParticipantSelect = (id) => {
    console.log('handleParticipantSelect', id);
    setSelectedParticipantId(id);
  };
  const handleSubmitEntryOfIndividualActions = (values) => {
    console.log('handleSubmitEntryOfIndividualActions', values);
    dispatch(
      setIndividualActionsForAllParticipants(
        currentRound,
        values.individualActionCards
      )
    );
    dispatch(applyIndividualActions(currentRound));
    dispatch(computeFootprints(nextRound));
    handleClose();
  };
  const individualActionCardsEntity = useSelector(
    (state) => state.workshop.entities.individualActionCards
  );

  const toggleIndividualActionCardsIdsInMap = (
    individualActionCardsMap,
    round,
    participantId,
    actionCardId
  ) => {
    const individualActionCardsId = `${round}-${participantId}`;
    const actionCardIds =
      individualActionCardsMap[individualActionCardsId] &&
      individualActionCardsMap[individualActionCardsId].actionCardIds;
    const result = {
      ...individualActionCardsMap,
      [individualActionCardsId]: {
        participantId: participantId,
        actionCardIds: toggleArrayItem(actionCardIds, actionCardId),
      },
    };
    return result;
  };

  return (
    <Formik
      onSubmit={handleSubmitEntryOfIndividualActions}
      initialValues={{
        individualActionCards: { ...individualActionCardsEntity },
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => {
        console.log('IndividualActionsForm values', values);
        const handleCardActionSelectionChange = (
          currentRound,
          participantId,
          actionCardId
        ) => {
          setFieldValue(
            'individualActionCards',
            toggleIndividualActionCardsIdsInMap(
              values['individualActionCards'],
              currentRound,
              participantId,
              actionCardId
            )
          );
        };
        return (
          <Container className="row-full">
            <Row style={{ height: '100vh' }}>
              <Col sm={12} md={4}>
                <Container>
                  <h4>{t('common.participants')}</h4>
                  <ParticipantsTable
                    round={currentRound}
                    workshopParticipants={workshopParticipants}
                    participantsEntity={participantsEntity}
                    individualActionCards={values['individualActionCards']}
                    selectedParticipantId={selectedParticipantId}
                    handleSelect={handleParticipantSelect}
                  ></ParticipantsTable>
                </Container>
              </Col>
              <Col sm={12} md={8}>
                <Container>
                  <h4>{t('common.batches')}</h4>
                  <IndividualActionsForm
                    currentRound={currentRound}
                    participantId={selectedParticipantId}
                    handleSubmit={handleSubmit}
                    handleCardActionSelectionChange={
                      handleCardActionSelectionChange
                    }
                    individualActionCards={values['individualActionCards']}
                  ></IndividualActionsForm>
                </Container>
              </Col>
            </Row>
          </Container>
        );
      }}
    </Formik>
  );
};

export default IndividualActions;
