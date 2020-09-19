import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import SurveyVariablesDataSheet from './components/SurveyVariablesDataSheet';
import {
  selectModifiedSurveyVariables,
  selectSurveyVariablesGrid,
} from '../../selectors/surveyVariablesSelector';
import { updateSurveyVariables } from '../../actions/workshop';
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
  const dispatch = useDispatch();

  const handleSave = (workshopIdentifier) => (modifiedSurveyVariablesGrid) => {
    const participantsModifiedSurveyVariables = selectModifiedSurveyVariables(
      modifiedSurveyVariablesGrid
    );
    console.log(
      'participantsModifiedSurveyVariables',
      participantsModifiedSurveyVariables
    );
    dispatch(
      updateSurveyVariables(
        workshopIdentifier,
        participantsModifiedSurveyVariables
      )
    );
  };

  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <SurveyVariablesDataSheet
        surveyVariablesGrid={surveyVariablesGrid}
        handleSave={handleSave(workshopId)}
      />
    </Loading>
  );
};
export default Data;
