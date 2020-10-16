import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Loading from '../../components/Loading';
import SimulationData from './SimulationData';
import SurveyVariablesDataSheet from './SurveyData/SurveyVariablesDataSheet';
import {
  selectModifiedSurveyVariables,
  selectParticipantsGrid,
  selectSurveyVariablesGrid,
} from '../../selectors/surveyVariablesSelector';

import {
  updateSurveyVariables,
  validateParticipants,
} from '../../actions/workshop';
import { useWorkshop } from '../../hooks/workshop';

const Data = ({
  match: {
    params: { workshopId },
  },
}) => {
  const { t } = useTranslation();
  const workshop = useWorkshop(workshopId);

  const { loadError, isLoading } = workshop;
  const surveyVariablesGrid = useSelector(selectSurveyVariablesGrid);
  const participantsGrid = useSelector(selectParticipantsGrid);

  const dispatch = useDispatch();

  const handleSave = (workshopIdentifier) => (modifiedSurveyVariablesGrid) => {
    const modifiedSurveyVariables = selectModifiedSurveyVariables(
      modifiedSurveyVariablesGrid
    );
    dispatch(
      updateSurveyVariables(workshopIdentifier, modifiedSurveyVariables)
    );
  };

  const handleValidate = (workshopIdentifier) => (participantIds) => {
    dispatch(validateParticipants(workshopIdentifier, participantIds));
  };

  const [activeComponent, setActiveComponent] = useState('surveyData');

  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <Row>
        <Col className="text-center">
          <ButtonGroup onClick={(e) => setActiveComponent(e.target.id)}>
            <Button
              variant="secondary"
              id="surveyData"
              active={activeComponent === 'surveyData'}
            >
              {t('data.surveyData')}
            </Button>
            <Button
              variant="secondary"
              id="simulationData"
              active={activeComponent === 'simulationData'}
            >
              {t('data.simulationData')}
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Container>
        {activeComponent === 'surveyData' && (
          <SurveyVariablesDataSheet
            surveyVariablesGrid={surveyVariablesGrid}
            participantsGrid={participantsGrid}
            handleSave={handleSave(workshopId)}
            handleValidate={handleValidate(workshopId)}
          />
        )}
        {activeComponent === 'simulationData' && (
          <SimulationData
            surveyVariablesGrid={surveyVariablesGrid}
            resetOpenNodesOnDataUpdate={false}
            hasSearch={false}
            isOpen={false}
          />
        )}
      </Container>
    </Loading>
  );
};
export default Data;
