import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { getPngData } from 'recharts-to-png';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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

import {
  selectCarbonFootprintsEntity,
  selectCurrentWorkshopInfo,
  selectInitialGlobalCarbonVariables,
  selectIsCurrentWorkshopSynchronized,
  selectIsWorkshopReadyForInitialization,
  selectParticipantsEntity,
  selectPersonaEntity,
} from '../../../selectors/workshopSelector';

export const loadHeatingNetworksData = async () => {
  const response = await fetch('/data/heat_networks.csv');
  const text = await response.text();
  const heatingNetworksData = Papa.parse(text, { header: true });
  return heatingNetworksData.data;
};
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
  model,
  participants,
  startYear,
  personas,
  carbonVariables,
  carbonFootprints,
  globalCarbonVariables,
}) => {
  // const handleShowBC = (id) => {
  // ideally
  // 1. carbon variables should be pre-computed for each persona
  // 2. add higher-level function where
  // valueOnAllLevels & computeFootprint are put together and
  // input variables are simplified, e.g. could be given as `model`

  // useEffect(() => {
  //   console.log('use effect');
  //   // downloadPng();
  //   setTimeout(() => {
  //     downloadPng();
  //   }, 2000);
  // }, []);
  // 3. footprintDataToGraph should be part of FootprintGraph
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
      style={{ maxHeight: '600px', textAlign: 'center' }}
    >
      <Container style={{ margin: 'auto' }}>
        {footprintParticipant.total > 0 && (
          <FootprintGraph
            footprint={footprintParticipant.footprint}
            totalEmissions={footprintParticipant.total}
            width="60%"
            height="40%"
          />
        )}
      </Container>
    </div>
  );
};
// const ParticipantImageGraph = ({
//   id,
//   participants,
//   model,
//   personas,
//   startYear,
//   t,
// }) => {
//   // A Recharts component is rendered as a div that contains namely an SVG
//   // which holds the chart. We can access this SVG by calling upon the first child/

//   // Output image size
//   const WIDTH = '75%';
//   const HEIGHT = '50%';

//   const [chart, setChart] = React.useState();
//   console.log('chart', chart);

//   return (
//     <div id={`node-to-convert_${id}`}>
//       <ParticipantCarbonGraph
//         id={id}
//         participants={participants}
//         model={model}
//         personas={personas}
//         carbonFootprints={carbonFootprints}
//         globalCarbonVariables={globalCarbonVariables}
//         startYear={startYear}
//         t={t}
//         width={WIDTH}
//         height={HEIGHT}
//         sref={(ref) => setChart(ref)}
//       />
//       <div />
//     </div>
//   );
// };

export { ParticipantCarbonGraph };

// const convertChart = async (ref) => {
//   if (ref && ref.container) {
//     const svg = ref.container.children[0];
//     const pngData = await svgToPng(svg, WIDTH, HEIGHT);
//     console.log('Do what you need with PNG', pngData);
//   }
// };
//   const handleDownload = React.useCallback(async () => {
//     if (chart !== undefined) {
//       // Send the chart to getPngData
//       const pngData = await getPngData(chart);
//       // Use FileSaver to download the PNG
//       saveAs(pngData, 'test.png');
//     }
//   }, [chart]);
