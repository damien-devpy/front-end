import Papa from 'papaparse';
import React, { Component, PropTypes, useEffect, useState } from 'react';
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
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useWorkshop } from '../../hooks/workshop';

import DownloadButton from '../../components/DownloadButton';
import DownloadIcon from '../../assets/DownloadIcon';
import Loading from '../../components/Loading';
import PrimaryButton from '../../components/PrimaryButton';
import imageVerso from '../../assets/participantsFootprintFile_verso.jpg';
import logo2T from '../../assets/logo.png';
import { ParticipantCarbonGraph } from './components/ParticipantCarbonGraph';
import {
  selectCarbonFootprintsEntity,
  selectCurrentWorkshopInfo,
  selectInitialGlobalCarbonVariables,
  selectParticipantsEntity,
  selectPersonaEntity,
} from '../../selectors/workshopSelector';

const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  firstPage: {
    marginTop: 200,
    textAlign: 'center',
    fontSize: 22,
    color: '#25433B',
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flex: 1,
  },
  titleBar: {
    backgroundColor: '#25433B',
    width: '100%',
    maxHeight: '40px',
    color: 'white',
    float: 'left',
    textAlign: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    flex: 1,
  },
  logo: {
    height: '45px',
    width: '45px',
    float: 'left',
  },
  halfPageView: {
    width: '100%',
    height: '50%',
    border: '1px solid #25433B',
    textAlign: 'center',
    justifyContent: 'center',
  },
  graph: {
    margin: 'auto',
    textAlign: 'center',
    width: '70%',
  },
});

export const loadHeatingNetworksData = async () => {
  const response = await fetch('/data/heat_networks.csv');
  const text = await response.text();
  const heatingNetworksData = Papa.parse(text, { header: true });
  return heatingNetworksData.data;
};

const ParticipantsFootprintFile = ({
  match: {
    params: { workshopId },
  },
}) => {
  const { error, isLoading } = useWorkshop(workshopId);
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const personas = useSelector(selectPersonaEntity);
  const {
    name: workshopTitle,
    status: workshopStatus,
    startYear,
    model,
  } = useSelector(selectCurrentWorkshopInfo);
  const participants = useSelector(selectParticipantsEntity);
  const globalCarbonVariables = useSelector(selectInitialGlobalCarbonVariables);
  const carbonFootprints = useSelector(selectCarbonFootprintsEntity);

  const participantsReadyIds = Object.keys(participants).filter(
    (id) => participants[id].status === 'ready'
  );

  // Calculate footprints

  console.log('participantsReady', participantsReadyIds);

  const participantCarbonGraphs =
    participants &&
    participantsReadyIds.map((id) => {
      return (
        <ParticipantCarbonGraph
          id={id}
          model={model}
          participants={participants}
          startYear={startYear}
          personas={personas}
          carbonFootprints={carbonFootprints}
          globalCarbonVariables={globalCarbonVariables}
        />
      );
    });

  const downloadPng = async (id) => {
    console.log('converting png ...', id);
    const chart =
      document.getElementById(`node-to-convert_${id}`) &&
      document.getElementById(`node-to-convert_${id}`).children[0] &&
      document.getElementById(`node-to-convert_${id}`).children[0].children[0]
        .children[0];
    console.log('finding chart : ', chart);
    const total = document
      .getElementById(`node-to-convert_${id}`)
      .getAttribute('data-total');

    console.log('finding total : ', total);

    if (chart !== undefined) {
      // Send the chart to getPngData
      const pngData = await getPngData(chart);
      console.log(' png converted...', id);
      // console.log('images length', images.length);
      const imageOutput = {};
      imageOutput.id = id;
      imageOutput.image = pngData;
      imageOutput.total = total;
      console.log('imageOutput', imageOutput);
      return imageOutput;
    }
  };

  if (participantsReadyIds.length !== images.length) {
    console.log('use effect');
    // downloadPng()
    setTimeout(() => {
      const images2 = participantsReadyIds.map((id) => downloadPng(id));
      setTimeout(() => {
        Promise.all(images2).then((values) => {
          console.log('set image :', values);
          setImages(values);
        });
      }, 1000);
    }, 2000);
  }

  console.log('images', images);
  const pairImages = images.reduce((result, value, index, array) => {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
  console.log('pairImages', pairImages);
  return (
    <Loading error={error} isLoading={isLoading}>
      <Container style={{ margin: 30, color: '#FFF', textAlign: 'center' }}>
        {!isLoading && (
          <DownloadButton
            colorIcon="#FFF"
            disabled={participantsReadyIds.length !== images.length}
          >
            <PDFDownloadLink
              style={{ color: '#FFF' }}
              document={
                <PDFFile
                  workshopId={workshopId}
                  workshopTitle={workshopTitle}
                  t={t}
                  participants={participants}
                  images={images}
                />
              }
              fileName={`Fiche participants - ${workshopTitle}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                participantsReadyIds.length !== images.length || loading
                  ? t('common.loadingDoc')
                  : t('common.downloadPdf')
              }
            </PDFDownloadLink>
          </DownloadButton>
        )}
      </Container>
      <Container>
        {!isLoading && <Container>{participantCarbonGraphs}</Container>}
      </Container>
    </Loading>
  );
};

const GraphElement = ({ graph, t }) => {
  if (!graph) return <></>;
  return (
    <>
      <View style={styles.titleBar}>
        <Image src={logo2T} style={styles.logo} />
        <Text
          style={{
            marginTop: 10,
            color: '#FFD9BA',
            position: 'relative',
            float: 'left',
            fontWeight: 'bolder',
          }}
        >
          {t('participantsFootprintFile.personalFootprint')} {graph.total}{' '}
          {t('participantsFootprintFile.personalFootprintUnit')}
        </Text>
      </View>
      <View style={styles.halfPageView}>
        <Image src={graph.image} style={styles.graph} />
      </View>
    </>
  );
};
const PDFFile = ({ workshopTitle, t, images }) => {
  const pairImages = images.reduce((result, value, index, array) => {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.firstPage}>
          <Text style={{ color: '', fontWeight: 'bold', margin: 20 }}>
            {t('manageParticipants.participantsFile')}
          </Text>
          <Text style={{ color: '#25433B', fontWeight: 'bold', margin: 20 }}>
            {workshopTitle}
          </Text>
        </View>
      </Page>
      {pairImages.map((pairImage) => (
        <>
          <Page size="A4" style={styles.page} key={pairImage[0].id}>
            <GraphElement graph={pairImage[0]} t={t} />
            <GraphElement graph={pairImage[1]} t={t} />
          </Page>
          <Page size="A4" style={styles.page}>
            <Image src={imageVerso} />
          </Page>
        </>
      ))}
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
