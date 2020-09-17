import Papa from 'papaparse';
import React, { Component, PropTypes, useState } from 'react';
import {
  Canvas,
  Document,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { Card, Col, Container, Form } from 'react-bootstrap';
import { getPngData } from 'recharts-to-png';

import { Link } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ActionCardItem from '../../components/ActionCardItem';
import { useWorkshop } from '../../hooks/workshop';

import Loading from '../../components/Loading';
import {
  ParticipantCarbonGraph,
  ParticipantImageGraph,
} from './components/ParticipantCarbonGraph';
import {
  actionCardBatches,
  selectCarbonFootprintsEntity,
  selectCheckedCollectiveActionCardsBatchIdsFromRounds,
  selectCheckedIndividualActionCardsBatchIdsFromRounds,
  selectCurrentWorkshopInfo,
  selectInitialGlobalCarbonVariables,
  selectIsCurrentWorkshopSynchronized,
  selectIsWorkshopReadyForInitialization,
  selectParticipantsEntity,
  selectPersonaEntity,
} from '../../selectors/workshopSelector';
import {
  footprintDataToGraph,
  normaliseEmissionValue,
} from '../../selectors/footprintSelectors';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const personas = useSelector(selectPersonaEntity);
  const {
    name: workshopTitle,
    status: workshopStatus,
    startYear,
    model,
  } = useSelector(selectCurrentWorkshopInfo);
  console.log('participants : ', participants);
  const participantCarbonGraphs = [];

  participants &&
    Object.keys(participants).forEach((id) => {
      if (participants[id].status == 'ready') {
        participantCarbonGraphs.push(
          <ParticipantImageGraph
            id={id}
            participants={participants}
            model={model}
            personas={personas}
            carbonFootprints={carbonFootprints}
            globalCarbonVariables={globalCarbonVariables}
            startYear={startYear}
            t={t}
          />
        );
      }
    });

  //   const [chart, setChart] = React.useState();

  //   const handleDownload = React.useCallback(async () => {
  //     if (chart !== undefined) {
  //       // Send the chart to getPngData
  //       const pngData = await getPngData(chart);
  //       // Use FileSaver to download the PNG
  //       saveAs(pngData, 'test.png');
  //     }
  //   }, [chart]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text className="workshop-title">{workshopTitle} </Text>
          {participantCarbonGraphs}
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};
// ideally
// 1. carbon variables should be pre-computed for each persona
// 2. add higher-level function where
// valueOnAllLevels & computeFootprint are put together and
// input variables are simplified, e.g. could be given as `model`

export default ParticipantsFootprintFile;

/* <Form.Row> 
            {!isLoading &&
              actionCardsBatchIdsFromRounds.map((actionCardBatchId) => {
                const {
                  name: actionCardBatchName,
                  actionCardIds,
                } = actionCardBatchesEntity[actionCardBatchId];
                return (
                  <Form.Group as={Col} sm={5} key={actionCardBatchId}>
                    {actionCardIds.map((actionCardId) => {
                      const {
                        name: actionCardName,
                        cardNumber,
                        sector,
                      } = actionCardsEntity[actionCardId];
                      return (
                        <ActionCardItem
                          key={actionCardId}
                          id={cardNumber}
                          cardNumber={cardNumber}
                          text={actionCardName}
                          sector={sector}
                          category={actionCardsEntity[actionCardId].subCategory}
                          active
                          checked={false}
                          // previousChoices={numberOfPreviousChoices(actionCardId)}
                          cost={actionCardsEntity[actionCardId].cost}
                          // handleChange={() =>
                          //   handleCardActionSelectionChange(actionCardId)
                          // }
                        />
                      );
                    })}
                  </Form.Group>
                );
              })}
            </Form.Row> */
// const actionCardBatchesEntity = useSelector(actionCardBatches);
//   const actionCardsEntity = useSelector(
//     (state) => state.workshop.entities && state.workshop.entities.actionCards
//   );
//   function compareName(a, b) {
//     if (actionCardBatchesEntity[a].name < actionCardBatchesEntity[b].name) {
//       return -1;
//     }
//     if (actionCardBatchesEntity[a].name > actionCardBatchesEntity[b].name) {
//       return 1;
//     }
//     return 0;
//   }
//   const actionCardsBatchIdsFromRounds = useSelector((state) =>
//     selectCheckedIndividualActionCardsBatchIdsFromRounds(state.workshop).sort(
//       compareName
//     )
//   );
//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }
