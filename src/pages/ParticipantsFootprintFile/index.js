import Papa from 'papaparse';
import React, { Component, PropTypes, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, Col, Container, Form } from 'react-bootstrap';
import {
  Canvas,
  Document,
  Image,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { Link } from 'react-router-dom';

import { getPngData } from 'recharts-to-png';
import ActionCardItem from '../../components/ActionCardItem';
import DownloadIcon from '../../assets/DownloadIcon';
import Loading from '../../components/Loading';
import img from '../../assets/graph1.png';
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
import { pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useWorkshop } from '../../hooks/workshop';

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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const personas = useSelector(selectPersonaEntity);
  const {
    name: workshopTitle,
    status: workshopStatus,
    startYear,
    model,
  } = useSelector(selectCurrentWorkshopInfo);
  const participantCarbonGraphs = [];
  const participants = useSelector(selectParticipantsEntity);
  const carbonVariables = useSelector(selectInitialGlobalCarbonVariables);
  const globalCarbonVariables = useSelector(selectInitialGlobalCarbonVariables);
  const carbonFootprints = useSelector(selectCarbonFootprintsEntity);

  participants &&
    Object.keys(participants).forEach((id) => {
      if (participants[id].status == 'ready') {
        participantCarbonGraphs.push(
          <ParticipantCarbonGraph
            carbonVariables={carbonVariables}
            globalCarbonVariables={globalCarbonVariables}
            personas={personas}
            id={id}
            participants={participants}
            model={model}
            startYear={startYear}
            carbonFootprints={carbonFootprints}
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
    // <Document>
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}>
    //       <Text className="workshop-title">{workshopTitle} </Text>
    <Loading error={error} isLoading={isLoading}>
      <Container>
        {!isLoading && <Container>{participantCarbonGraphs}</Container>}
        <Container>
          {!isLoading && (
            <Button className="badge badge-info float-right text-decoration-none">
              <DownloadIcon />{' '}
              <PDFDownloadLink
                document={
                  <PDFFile
                    workshopId={workshopId}
                    workshopTitle={workshopTitle}
                    t={t}
                    participants={participants}
                  />
                }
                fileName="movielist.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download Pdf'
                }
              </PDFDownloadLink>
            </Button>
          )}
        </Container>
      </Container>
    </Loading>
  );
};

const PDFFile = ({ workshopTitle, t, participants }) => {
  //   const [chart, setChart] = React.useState();
  // const downloadPng = React.useCallback(async (id) => {
  //   setTimeout(async () => {
  //     const chartos =
  //       document.getElementById(`node-to-convert_${id}`) &&
  //       document.getElementById(`node-to-convert_${id}`).children[0];
  //     if (chartos !== undefined) {
  //       // Send the chart to getPngData
  //       const pngData = await getPngData(chartos);
  //       // Use FileSaver to download the PNG
  //       return pngData;
  //     }
  //   }, 2000);
  // }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text className="workshop-title">
            {t('manageParticipants.participantsFile')}
          </Text>
          <Text className="workshop-title">{workshopTitle}</Text>
          {/* {participantCarbonGraphs} */}
        </View>
        <View style={styles.section}>
          {/* {participants &&
            Object.keys(participants).map((id) => (
              <Image src={downloadPng(id)} />
            ))} */}
          <Image src={img} />

          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export { ParticipantsFootprintFile, PDFFile };

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
