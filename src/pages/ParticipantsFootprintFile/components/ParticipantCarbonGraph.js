import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// import AddNewButton from '../../components/AddNewButton';
// import AddParticipantModalForm from './components/AddParticipantModalForm';
// import CardHeader from '../../components/CardHeader';
// import CommonModal from '../../components/CommonModal';
import FootprintGraph from '../../Simulation/components/FootprintGraph';
// import Loading from '../../components/Loading';
import computeCarbonVariables from '../../../reducers/utils/bufferCarbonVariables';

import {
  computeFootprint,
  valueOnAllLevels,
} from '../../../reducers/utils/model';
import {
  footprintDataToGraph,
  normaliseEmissionValue,
} from '../../../selectors/footprintSelectors';
import { loadHeatingNetworksData } from '../../Participants/index';
import {
  selectCarbonFootprintsEntity,
  selectCurrentWorkshopInfo,
  selectInitialGlobalCarbonVariables,
  selectIsCurrentWorkshopSynchronized,
  selectIsWorkshopReadyForInitialization,
  selectParticipantsEntity,
  selectPersonaEntity,
} from '../../../selectors/workshopSelector';

// const participants = useSelector(selectParticipantsEntity);
// const globalCarbonVariables = useSelector(selectInitialGlobalCarbonVariables);
// const carbonFootprints = useSelector(selectCarbonFootprintsEntity);
// const personas = useSelector(selectPersonaEntity);

// const {
//   name: workshopTitle,
//   status: workshopStatus,
//   startYear,
//   model,
// } = useSelector(selectCurrentWorkshopInfo);

const ParticipantCarbonGraph = ({
  id,
  participants,
  model,
  personas,
  globalCarbonVariables,
  carbonFootprints,
  startYear,
}) => {
  // const handleShowBC = (id) => {
  // ideally
  // 1. carbon variables should be pre-computed for each persona
  // 2. add higher-level function where
  // valueOnAllLevels & computeFootprint are put together and
  // input variables are simplified, e.g. could be given as `model`
  loadHeatingNetworksData().then((heatingNetworksData) => {
    const { footprintStructure, variableFormulas } = model;
    const footprint = participants[id].personaId
      ? valueOnAllLevels(
          computeFootprint(
            footprintStructure,
            variableFormulas,
            computeCarbonVariables(
              personas[participants[id].personaId].surveyVariables,
              globalCarbonVariables,
              heatingNetworksData
            ),
            globalCarbonVariables
          )
        )
      : carbonFootprints[`${startYear}-${id}`].footprint;

    // 3. footprintDataToGraph should be part of FootprintGraph
    const footprintShaped = footprintDataToGraph(footprint);

    return <FootprintGraph footprint={footprintShaped} />;

    // setFootprintToShow({
    //   id,
    //   total: normaliseEmissionValue(footprint.value),
    //   footprint: footprintShaped,
    // });
  });
};

export default ParticipantCarbonGraph;
