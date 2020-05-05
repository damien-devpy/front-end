import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector  } from 'react-redux';
import { useWorkshop } from '../../../hooks/workshop';
import { computeCarbonVariables } from '../../../actions/workshop.js'

const WorkshopPreparation = (workshopId) => {
  const { t } = useTranslation();
  useWorkshop(workshopId)
  const participantId = 1 
  const surveyVariables = useSelector((state) => {if (state.workshop.participants) { return state.workshop.participants.byId[participantId].surveyVariables}})
  const carbonVariables = useSelector((state) => {if (state.workshop.participants) { return state.workshop.participants.byId[participantId].carbonVariables}})
  const dispatch = useDispatch()

  return <div>
      <h1>{t('common.simulation')}</h1>
      <h2> Variables Carbone </h2>
      <div>{JSON.stringify(surveyVariables, null, 4)}</div>
      <button onClick={() => dispatch(computeCarbonVariables(participantId))}> Calculer les variables carbones </button>
      <h2> Variables Questionnaire </h2>
      <div>{JSON.stringify(carbonVariables, null, 4)}</div>
    </div>;
};

export default WorkshopPreparation;
