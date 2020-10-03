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

import ActionCardItem from '../../components/ActionCardItem';
import DownloadIcon from '../../assets/DownloadIcon';
import Loading from '../../components/Loading';
import PrimaryButton from '../../components/PrimaryButton';
import computeCarbonVariables from '../../reducers/utils/bufferCarbonVariables';
import logo2T from '../../assets/logo.png';
import { ParticipantCarbonGraph } from './components/ParticipantCarbonGraph';
import { computeFootprint, valueOnAllLevels } from '../../reducers/utils/model';
import {
  footprintDataToGraph,
  normaliseEmissionValue,
} from '../../selectors/footprintSelectors';
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
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flex: 1,
  },
  titleBar: {
    backgroundColor: '#25433B',
    width: '100%',
    height: '50px',
    margin: 10,
    padding: 10,
    color: 'white',
    float: 'left',
  },
  logo: {
    height: '40px',
    width: '30px',
    float: 'left',
  },
  bodyView: {
    margin: 10,
    padding: 10,
    height: '80%',
    width: '80%',
  },
  graph: {
    margin: 20,
    height: 400,
    width: 400,
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
  const [downloadedIds, setDonwloadedIds] = useState([]);
  const personas = useSelector(selectPersonaEntity);
  const {
    name: workshopTitle,
    status: workshopStatus,
    startYear,
    model,
  } = useSelector(selectCurrentWorkshopInfo);
  const participants = useSelector(selectParticipantsEntity);
  const carbonVariables = useSelector(selectInitialGlobalCarbonVariables);
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
    // if (!downloadedIds.includes(id)) {
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

      // Use FileSaver to download the PNG
      // saveAs(pngData);
      // /////////
      // setImages([...images, pngData]);
      console.log(' png converted...', id);
      // console.log('images length', images.length);
      // setDonwloadedIds([...downloadedIds, id]);
      // console.log('downlaodedIds added', downloadedIds);
      const imageOutput = {};
      imageOutput.id = id;
      imageOutput.image = pngData;
      imageOutput.total = total;
      console.log('imageOutput', imageOutput);
      return imageOutput;
    }
  };
  // const id = 'b558accd02534dae958ffec7bded6a62';
  // useEffect(() => {
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
      }, 2000);

      // setImages(images2);
    }, 4000);
    console.log('images length', images.length);
    console.log('images value', images);

    console.log('downlaodedIds', downloadedIds);
  }

  // }, []);

  // console.log('last image 2', images[images.length - 1]);

  //   const [chart, setChart] = React.useState();

  //   const handleDownload = React.useCallback(async () => {
  //     if (chart !== undefined) {
  //       // Send the chart to getPngData
  //       const pngData = await getPngData(chart);
  //       // Use FileSaver to download the PNG
  //       saveAs(pngData, 'test.png');
  //     }
  //   }, [chart]);
  console.log('images', images);
  return (
    // <Document>
    //   <Page size="A4" style={styles.page}>
    //     <View style={styles.section}>
    //       <Text className="workshop-title">{workshopTitle} </Text>
    <Loading error={error} isLoading={isLoading}>
      <Container>
        {!isLoading && <Container>{participantCarbonGraphs}</Container>}
        <Container>
          {!isLoading && participantsReadyIds.length === images.length && (
            <PrimaryButton className="badge badge-info float-right text-decoration-none">
              <DownloadIcon />{' '}
              <PDFDownloadLink
                document={
                  <PDFFile
                    workshopId={workshopId}
                    workshopTitle={workshopTitle}
                    t={t}
                    participants={participants}
                    images={images}
                  />
                }
                fileName="movielist.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download Pdf'
                }
              </PDFDownloadLink>
            </PrimaryButton>
          )}
        </Container>
      </Container>
    </Loading>
  );
};

const PDFFile = ({ workshopTitle, t, images }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleBar}>
          <Image src={logo2T} style={styles.logo} />
        </View>
        <View style={styles.bodyView}>
          <Text>{t('manageParticipants.participantsFile')}</Text>
          <Text className="workshop-title">{workshopTitle}</Text>
        </View>
      </Page>
      {images.map((imageObject) => (
        <Page size="A4" style={styles.page} key={imageObject.id}>
          <View style={styles.titleBar}>
            <Image src={logo2T} style={styles.logo} />
            <Text
              style={{ color: 'orange', position: 'relative', float: 'left' }}
            >
              {t('participantsFootprintFile.personalFootprint')}{' '}
              {imageObject.total}
            </Text>
          </View>
          <View style={styles.bodyView}>
            <Image src={imageObject.image} style={styles.graph} />
          </View>
          {/* <View style={styles.bodyView}>
            <Text>Should be there {imageObject.id}</Text>
            <Image src={imageObject.image} style={styles.graph} />
          </View> */}
        </Page>
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
