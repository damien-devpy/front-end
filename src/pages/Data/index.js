import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

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
  const workshop = useWorkshop(workshopId);

  const { loadError, isLoading } = workshop;
  const surveyVariablesGrid = useSelector((state) =>
    selectSurveyVariablesGrid(state)
  );
  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <Container>
        <SurveyVariablesDataSheet
          surveyVariablesGrid={surveyVariablesGrid}
          resetOpenNodesOnDataUpdate={false}
          hasSearch={false}
          isOpen={false}
        />
        <SimulationData
          surveyVariablesGrid={surveyVariablesGrid}
          resetOpenNodesOnDataUpdate={false}
          hasSearch={false}
          isOpen={false}
        />
      </Container>
    </Loading>
  );
};
export default Data;
