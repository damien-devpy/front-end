import React from 'react';
import { useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import SurveyVariablesDataSheet from './SurveyVariablesDataSheet';
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
    selectSurveyVariablesGrid(state, '118acffecdf04230a69cb4f8ad7c65f5')
  );

  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <SurveyVariablesDataSheet surveyVariablesGrid={surveyVariablesGrid} />
    </Loading>
  );
};
export default Data;
