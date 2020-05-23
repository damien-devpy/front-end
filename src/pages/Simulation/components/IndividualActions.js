import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import {
  initRoundAndProcessModel,
  setIndividualActionsForAllParticipants,
} from '../../../actions/workshop';
import IndividualActionsForm from './IndividualActionsForm';
import ParticipantsTable from './ParticipantsTable';

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
  const entityParticipants = useSelector(
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
    dispatch(initRoundAndProcessModel(currentRound, nextRound));
    handleClose();
  };
  return (
    <Container className="row-full">
      <Row style={{ height: '100vh' }}>
        <Col sm={12} md={4}>
          <Container>
            <h4>{t('common.participants')}</h4>
            <ParticipantsTable
              entityParticipants={entityParticipants}
              workshopParticipants={workshopParticipants}
              selectedParticipantId={selectedParticipantId}
              handleSelect={handleParticipantSelect}
            />
          </Container>
        </Col>
        <Col sm={12} md={8}>
          <Container>
            <h4>{t('common.batches')}</h4>
            <IndividualActionsForm
              currentRound={currentRound}
              participantId={selectedParticipantId}
              handleSubmit={handleSubmitEntryOfIndividualActions}
            />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default IndividualActions;
