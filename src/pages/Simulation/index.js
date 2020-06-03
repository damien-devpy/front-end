import './components/simulationPage.css';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentRound,
  footprintDataToGraph,
} from '../../selectors/footprintSelectors';
import { startRound } from '../../actions/workshop';
import { useTranslation } from 'react-i18next';
import { useWorkshop } from '../../hooks/workshop';
import ActionCardsEntry from './components/ActionCardsEntry';
import CommonModal from '../../components/CommonModal';
import EvolutionCarbon from './components/EvolutionCarbon';
import FootprintGraphType from './components/FootprintGraphType';
import NavbarWorkshop from '../../components/NavbarWorkshop';
import NewRoundModalForm from './components/NewRoundModalForm';
import React, { useEffect, useState } from 'react';
import footprintData from '../../utils/mocks/footprintData';
import styled from 'styled-components';

const Simulation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const currentRound = useSelector(
    (state) =>
      state.workshop &&
      state.workshop.result &&
      state.workshop.result.currentYear
  );
  const workshopTitle = useSelector(
    (state) => state.workshop.result && state.workshop.result.title
  );
  const roundActionCardType = useSelector(
    (state) =>
      currentRound &&
      state.workshop &&
      state.workshop.entities &&
      state.workshop.entities.roundsConfig[currentRound] &&
      state.workshop.entities.roundsConfig[currentRound].actionCardType
  );
  // NewRoundModal
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const handleCloseNewRoundModal = () => setShowNewRoundModal(false);
  const handleSubmitNewRoundModal = (values) => {
    dispatch(startRound(values));
    setShowNewRoundModal(false);
    setShowEntryOfActionCards(true);
  };
  const handleShowNewRoundModal = () => setShowNewRoundModal(true);
  // EntryOfActionCards
  const [showEntryOfActionCards, setShowEntryOfActionCards] = useState(false);
  const handleCloseEntryOfActionCards = () => setShowEntryOfActionCards(false);
  return (
    <>
      <NavbarWorkshop
        avatarUrl="https://img.icons8.com/doodle/48/000000/user.png"
        firstName="Xavier"
        role="Animateur"
      />
      <h4 className="workshop_title">{workshopTitle}</h4>
      <h5>
        Nous sommes en ...{'  '}
        <span style={{ fontSize: 25, fontWeight: 'bold' }}>
          {' '}
          {currentRound}
        </span>
      </h5>

      <StyledSimulation>
        <Container className="row-full">
          <Row className="d-flex justify-content-end mr-1">
            <Button variant="secondary" onClick={handleShowNewRoundModal}>
              {t('common.nextRound')}
            </Button>
          </Row>
          <Row style={{ height: '100vh' }}>
            <Col sm={12} md={7} className="graph-col">
              <Container className="graph-card">
                <h4>
                  Evolution du CO<span style={{ fontSize: '14px' }}>2</span>{' '}
                  par personne
                </h4>
                <EvolutionCarbon data={evolutionData} />
              </Container>
            </Col>
            <Col sm={12} md={5} className="graph-col">
              <Container className="graph-card">
                <h4> Moyenne nationale </h4>
                <FootprintGraphType type="globalAverage" />
              </Container>
              <Container className="graph-card">
                <h4> Les participants </h4>
                <FootprintGraphType type="participantsAverage" />
              </Container>
            </Col>
          </Row>
        </Container>
      </StyledSimulation>
      <CommonModal
        title={t('common.nextRound')}
        show={showNewRoundModal}
        handleClose={handleCloseNewRoundModal}
      >
        <NewRoundModalForm handleSubmit={handleSubmitNewRoundModal} />
      </CommonModal>
      <CommonModal
        title={
          roundActionCardType === 'individual'
            ? t('common.entryOfIndividualActions')
            : t('common.entryOfCollectiveActions')
        }
        show={showEntryOfActionCards}
        handleClose={handleCloseEntryOfActionCards}
      >
        <ActionCardsEntry
          handleClose={handleCloseEntryOfActionCards}
          currentRound={currentRound}
          roundActionCardType={roundActionCardType}
        />
      </CommonModal>
    </>
  );
};

const StyledSimulation = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const footprintShaped = [
  { sector: 'Transport', plane: 750, train: 59, bus: 150, car: 600 },
  {
    sector: 'Logement',
    housingEquipment: 500,
    constructionAndMaintenance: 300,
    energies: 216,
  },
  {
    sector: 'Alimentation',
    drinks: 700,
    meatAndFish: 352.86375,
    eggsAndDairies: 71.66775,
    others_alim: 600,
  },
  { sector: 'Autres', clothing: 671.4, digital: 250, others_conso: 400 },
  { sector: 'Services Publics', publicServices: 1000 },
];

const players = (obj) => Object.keys(obj).filter((k) => k !== 'year');
const sum = (obj) =>
  players(obj).reduce(
    (accumulator, currentValue) => accumulator + obj[currentValue],
    0
  );
const avg_players = (obj) => (sum(obj) / players(obj).length).toFixed(0) || 0;

var evolutionData = [
  {
    year: 2020,
    player1: 17000,
    player2: 14000,
    player3: 10000,
    player4: 9000,
    player5: 5000,
    player6: 4500,
    player7: 8500,
    player8: 7000,
    player9: 6000,
  },
  {
    year: 2025,
    player1: 14000,
    player2: 12000,
    player3: 10000,
    player4: 7000,
    player5: 5000,
    player6: 4000,
    player7: 7500,
    player8: 4000,
    player9: 4000,
  },
  {
    year: 2030,
    player1: 14000,
    player2: 12000,
    player3: 10000,
    player4: 7000,
    player5: 5000,
    player6: 4000,
    player7: 7500,
    player8: 4000,
    player9: 4000,
  },
  {
    year: 2033,
    player1: 12000,
    player2: 10000,
    player3: 8000,
    player4: 7000,
    player5: 6000,
    player6: 2500,
    player7: 7000,
    player8: 3000,
    player9: 2000,
  },
  {
    year: 2040,
    player1: 8000,
    player2: 7000,
    player3: 5000,
    player4: 4000,
    player5: 5000,
    player6: 2500,
    player7: 7000,
    player8: 3000,
    player9: 2000,
  },
  {
    year: 2050,
    player1: 4000,
    player2: 3000,
    player3: 2000,
    player4: 2000,
    player5: 2000,
    player6: 2500,
    player7: 4000,
    player8: 3000,
    player9: 2000,
  },
];

export default Simulation;
