import Papa from 'papaparse';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getPngData} from "recharts-to-png"
import { useTranslation } from 'react-i18next';
import { saveAs } from 'file-saver';

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
// import { loadHeatingNetworksData } from '../../Participants/index';
import {
  selectCarbonFootprintsEntity,
  selectCurrentWorkshopInfo,
  selectInitialGlobalCarbonVariables,
  selectIsCurrentWorkshopSynchronized,
  selectIsWorkshopReadyForInitialization,
  selectParticipantsEntity,
  selectPersonaEntity,
} from '../../../selectors/workshopSelector';
import { Button } from 'react-bootstrap';

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
  participants,
  model,
  personas,
  globalCarbonVariables,
  carbonFootprints,
  startYear,
  t,
  width,
  height,
  ref,
}) => {
  // const handleShowBC = (id) => {
  // ideally
  // 1. carbon variables should be pre-computed for each persona
  // 2. add higher-level function where
  // valueOnAllLevels & computeFootprint are put together and
  // input variables are simplified, e.g. could be given as `model`
  const [footprintParticipant, setFootprintParticipant] = useState({});
  const [showGraph, setShowGraph] = useState(false);
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
    setShowGraph(true);
  });
  // 3. footprintDataToGraph should be part of FootprintGraph
  return (
    showGraph && (
      <>
        <h5>
          {t('manageParticipants.totalBC')} {footprintParticipant.total}{' '}
          {t('manageParticipants.unitBC')}
        </h5>
        <FootprintGraph
          footprint={footprintParticipant.footprint}
          width={width}
          height={height}
          ref={ref}
        />
      </>
    )
  );

  // setFootprintToShow({
  //   id,
  //   total: normaliseEmissionValue(footprint.value),
  //   footprint: footprintShaped,
  // });
};
const ParticipantImageGraph = ({
  id,
  participants,
  model,
  personas,
  globalCarbonVariables,
  carbonFootprints,
  startYear,
  t,
}) => {
  // A Recharts component is rendered as a div that contains namely an SVG
  // which holds the chart. We can access this SVG by calling upon the first child/

  // Output image size
  const WIDTH = 300;
  const HEIGHT = 150;

  // const convertChart = async (ref) => {
  //   if (ref && ref.container) {
  //     const svg = ref.container.children[0];
  //     const pngData = await svgToPng(svg, WIDTH, HEIGHT);
  //     console.log('Do what you need with PNG', pngData);
  //   }
  // };
  const [chart, setChart] = React.useState();
  console.log("chart", chart)
  const handleDownload = React.useCallback(async () => {
    if (chart !== undefined) {
      // Send the chart to getPngData
      const pngData = await getPngData(chart);
      // Use FileSaver to download the PNG
      saveAs(pngData, `test_${id}.png`);
    }
  }, [chart]);
  
  return (
    <Container>

    <ParticipantCarbonGraph
      id={id}
      participants={participants}
      model={model}
      personas={personas}
      carbonFootprints={carbonFootprints}
      globalCarbonVariables={globalCarbonVariables}
      startYear={startYear}
      t={t}
      width={WIDTH}
      height={HEIGHT}
      ref={(ref): void => setChart(ref)} 
        />  
         <div>

        <Button style={{position: "relative"}} onClick={handleDownload}> Download
        </Button>
      </div>
      </Container>
      );


  // Render chart component into helper div
  // const helperDiv = document.createElement(`tmp_${id}`);
  // ReactDOM.render(chart, helperDiv);
};

export { ParticipantCarbonGraph, ParticipantImageGraph };

// export const svgToPng = (svg, width, height) => {
//   return new Promise((resolve, reject) => {
//     const canvas = document.createElement('canvas');
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext('2d');

//     // Set background to white
//     ctx.fillStyle = '#ffffff';
//     ctx.fillRect(0, 0, width, height);

//     const xml = new XMLSerializer().serializeToString(svg);
//     const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(xml)}`;
//     const img = new Image(width, height);

//     img.onload = () => {
//       ctx.drawImage(img, 0, 0);
//       const imageData = canvas.toDataURL('image/png', 1.0);
//       resolve(imageData);
//     };

//     img.onerror = () => reject();

//     img.src = dataUrl;
//   });
// };
