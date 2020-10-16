import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Loading from '../../components/Loading';
import SimulationData from './SimulationData';
import SurveyVariablesDataSheet from './SurveyData/SurveyVariablesDataSheet';

import { selectSurveyVariablesGrid } from '../../selectors/surveyVariablesSelector';
import { useWorkshop } from '../../hooks/workshop';

const Data = ({
  match: {
    params: { workshopId },
  },
}) => {
  const { t } = useTranslation();
  const workshop = useWorkshop(workshopId);

  const { loadError, isLoading } = workshop;
  const surveyVariablesGrid = useSelector((state) =>
    selectSurveyVariablesGrid(state)
  );

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
            resetOpenNodesOnDataUpdate={false}
            hasSearch={false}
            isOpen={false}
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
