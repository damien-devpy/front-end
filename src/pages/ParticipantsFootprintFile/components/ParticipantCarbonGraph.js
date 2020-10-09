import Papa from 'papaparse';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import FootprintGraph from '../../Simulation/components/FootprintGraph';
import computeCarbonVariables from '../../../reducers/utils/bufferCarbonVariables';
import {
  computeFootprint,
  valueOnAllLevels,
} from '../../../reducers/utils/model';
import {
  footprintDataToGraph,
  normaliseEmissionValue,
} from '../../../selectors/footprintSelectors';

const loadHeatingNetworksData = async () => {
  const response = await fetch('/data/heat_networks.csv');
  const text = await response.text();
  const heatingNetworksData = Papa.parse(text, { header: true });
  return heatingNetworksData.data;
};

const ParticipantCarbonGraph = ({
  id,
  model,
  participants,
  startYear,
  personas,
  carbonFootprints,
  globalCarbonVariables,
}) => {
  const [footprintParticipant, setFootprintParticipant] = useState({
    total: 0,
    footprint: {},
  });
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

    const footprintShaped = footprintDataToGraph(footprint);

    setFootprintParticipant({
      footprint: footprintShaped,
      total: normaliseEmissionValue(footprint.value),
    });
  });
  return (
    <div
      id={`node-to-convert_${id}`}
      data-total={footprintParticipant.total}
      style={{ maxHeight: '500px', textAlign: 'center' }}
    >
      <Container style={{ margin: 'auto' }}>
        {footprintParticipant.total > 0 && (
          <FootprintGraph
            footprint={footprintParticipant.footprint}
            totalEmissions={footprintParticipant.total}
            aspect={1.5}
            width="90%"
          />
        )}
      </Container>
    </div>
  );
};
export default ParticipantCarbonGraph;
