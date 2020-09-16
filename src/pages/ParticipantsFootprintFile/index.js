import Papa from 'papaparse';
import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useWorkshop } from '../../hooks/workshop';

import Loading from '../../components/Loading';
import ParticipantCarbonGraph from './components/ParticipantCarbonGraph';
import {
  footprintDataToGraph,
  normaliseEmissionValue,
} from '../../selectors/footprintSelectors';
import {
  selectCarbonFootprintsEntity,
  selectCurrentWorkshopInfo,
  selectInitialGlobalCarbonVariables,
  selectIsCurrentWorkshopSynchronized,
  selectIsWorkshopReadyForInitialization,
  selectParticipantsEntity,
  selectPersonaEntity,
} from '../../selectors/workshopSelector';

const ParticipantsFootprintFile = ({
  match: {
    params: { workshopId },
  },
}) => {
  const { error, isLoading } = useWorkshop(workshopId);
  const { t } = useTranslation();
  const participants = useSelector(selectParticipantsEntity);
  const carbonFootprints = useSelector(selectCarbonFootprintsEntity);
  const globalCarbonVariables = useSelector(selectInitialGlobalCarbonVariables);

  const personas = useSelector(selectPersonaEntity);
  const {
    name: workshopTitle,
    status: workshopStatus,
    startYear,
    model,
  } = useSelector(selectCurrentWorkshopInfo);
  console.log('participants : ', participants);
  return (
    <Loading error={error} isLoading={isLoading}>
      <Container>
        <h2 className="workshop-title">{workshopTitle} </h2>
        {!isLoading &&
          participants &&
          participants.map(
            (id) => 0
            //     <ParticipantCarbonGraph
            //       id={id}
            //       participants={participants}
            //       model={model}
            //       personas={personas}
            //       carbonFootprints={carbonFootprints}
            //       globalCarbonVariables={globalCarbonVariables}
            //       startYear={startYear}
            //     />)
          )}
      </Container>
    </Loading>
  );
};
// ideally
// 1. carbon variables should be pre-computed for each persona
// 2. add higher-level function where
// valueOnAllLevels & computeFootprint are put together and
// input variables are simplified, e.g. could be given as `model`

export default ParticipantsFootprintFile;
