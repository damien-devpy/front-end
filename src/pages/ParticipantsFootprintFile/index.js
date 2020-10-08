import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  Document,
  Image,
  PDFDownloadLink,
  // PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { getPngData } from 'recharts-to-png';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useWorkshop } from '../../hooks/workshop';

import DownloadButton from '../../components/DownloadButton';
import Loading from '../../components/Loading';
import ParticipantCarbonGraph from './components/ParticipantCarbonGraph';
import imageVerso from '../../assets/participantsFootprintFile_verso.jpg';
import logo2T from '../../assets/logo.png';
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
    fontWeight: 'bold',
  },
  titleBar: {
    backgroundColor: '#25433B',
    width: '100%',
    maxHeight: '45px',
    float: 'left',
    textAlign: 'center',
    verticalAlign: 'top',
    flexDirection: 'row',
    marginBottom: 10,
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
    maxHeight: '50%',
    // border: '1px solid #25433B',
    textAlign: 'center',
    margin: 0,
    padding: 0,
    verticalAlign: 'top',
  },
  graph: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
  },
  imgGraph: {
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%',
    maxHeight: 400,
    maxWidth: 400,
  },
  textName0: {
    marginTop: 20,
    marginRight: 60,
    position: 'absolute',
    textAlign: 'right',
    color: '#FFD9BA',
    verticalAlign: '95%',
  },
  textName1: {
    marginTop: '73%',
    marginRight: 60,
    position: 'absolute',
    color: '#FFD9BA',
    textAlign: 'right',
  },
  fixImage: {
    // position: 'absolute',
    verticalAlign: 'top',
    // display: 'block',
  },
});

const ParticipantsFootprintFile = ({
  match: {
    params: { workshopId },
  },
}) => {
  const { error, isLoading } = useWorkshop(workshopId);
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const personas = useSelector(selectPersonaEntity);
  const { name: workshopTitle, startYear, model } = useSelector(
    selectCurrentWorkshopInfo
  );
  const participants = useSelector(selectParticipantsEntity);
  const globalCarbonVariables = useSelector(selectInitialGlobalCarbonVariables);
  const carbonFootprints = useSelector(selectCarbonFootprintsEntity);
  const participantsReadyIds = Object.keys(participants).filter(
    (id) => participants[id].status === 'ready'
  );

  // Calculate footprints

  const fullNames =
    participants &&
    participantsReadyIds.map(
      (id) => `${participants[id].firstName} ${participants[id].lastName}`
    );
  const participantCarbonGraphs =
    participants &&
    participantsReadyIds &&
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
    const chart =
      document.getElementById(`node-to-convert_${id}`) &&
      document.getElementById(`node-to-convert_${id}`).children[0] &&
      document.getElementById(`node-to-convert_${id}`).children[0].children[0];
    const total = document
      .getElementById(`node-to-convert_${id}`)
      .getAttribute('data-total');
    const imageOutput = {};

    if (chart !== undefined) {
      // Send the chart to getPngData
      const pngData = await getPngData(chart);
      // console.log('images length', images.length);
      imageOutput.id = id;
      imageOutput.image = pngData;
      imageOutput.total = total;
    }
    return imageOutput;
  };

  if (participantsReadyIds.length !== images.length) {
    // downloadPng()
    setTimeout(() => {
      const convertGraphs = participantsReadyIds.map((id) => downloadPng(id));
      Promise.all(convertGraphs).then((values) => {
        setImages(values);
      });
    }, 3000);
  }
  const downloadGraphs = () =>
    images.map(
      (image, i) =>
        image.image && saveAs(image.image, `${fullNames[i]}_initial_graph.png`)
    );

  useEffect(() => {
    setIsReady(true);
  }, []);
  return (
    <Loading error={error} isLoading={isLoading}>
      <Container style={{ margin: 30, color: '#FFF', textAlign: 'center' }}>
        {!isLoading &&
          isReady &&
          images &&
          participants &&
          participantsReadyIds &&
          fullNames && (
            <>
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
                      fullNames={fullNames}
                    />
                  }
                  fileName={`Fiche participants - ${workshopTitle}.pdf`}
                >
                  {({ loading }) =>
                    participantsReadyIds.length !== images.length || loading
                      ? t('common.loadingDoc')
                      : t('common.downloadPdf')
                  }
                </PDFDownloadLink>
              </DownloadButton>
              <DownloadButton
                style={{ marginLeft: 20 }}
                colorIcon="#FFF"
                disabled={participantsReadyIds.length !== images.length}
                onClick={downloadGraphs}
              >
                {t('common.downloadGraphs')}
              </DownloadButton>
            </>
          )}
      </Container>

      <Container>
        {!isLoading && isReady && (
          <Container>{participantCarbonGraphs}</Container>
        )}
      </Container>
      {/* <Container style={{ width: 'auto', margin: 'auto' }}>
        <PDFViewer style={{ height: '30cm', width: '21cm' }}>
          {participants && images && (
            <PDFFile
              workshopId={workshopId}
              workshopTitle={workshopTitle}
              t={t}
              participants={participants}
              images={images}
              fullNames={fullNames}
            />
          )}
        </PDFViewer>
      </Container> */}
    </Loading>
  );
};

const GraphElement = ({ graph, t }) => {
  if (!graph) return <></>;
  return (
    <>
      <View style={styles.halfPageView}>
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
        {graph.image && (
          <View style={styles.graph}>
            <Image src={graph.image} style={styles.imgGraph} />
          </View>
        )}
      </View>
    </>
  );
};
const PDFFile = ({ t, images, fullNames }) => {
  const pairImages = images.reduce((result, value, index, array) => {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
  return (
    <Document>
      {pairImages.map((pairImage, index) => (
        <>
          <Page size="A4" style={styles.page} key={pairImage[0].id}>
            <GraphElement graph={pairImage[0]} t={t} />
            <GraphElement graph={pairImage[1]} t={t} />
          </Page>
          <Page size="A4" style={styles.page} key={`verso_${pairImage[0].id}`}>
            <Image src={imageVerso} style={styles.fixImage} />
            <Text style={styles.textName0}> {fullNames[index * 2 + 0]} </Text>
            <Text style={styles.textName1}>
              {fullNames[index * 2 + 1] ? fullNames[index * 2 + 1] : ''}
            </Text>
          </Page>
        </>
      ))}
    </Document>
  );
};

export { ParticipantsFootprintFile, PDFFile };
