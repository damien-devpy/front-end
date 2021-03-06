import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import SurveyVariablesDataSheet from './components/SurveyVariablesDataSheet';
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

  return (
    <Loading loadError={loadError} isLoading={isLoading}>
      <SurveyVariablesDataSheet
        surveyVariablesGrid={surveyVariablesGrid}
        participantsGrid={participantsGrid}
        handleSave={handleSave(workshopId)}
        handleValidate={handleValidate(workshopId)}
      />
    </Loading>
  );
};
export default Data;
