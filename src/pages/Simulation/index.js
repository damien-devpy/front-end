import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import './components/simulationPage.css';
import NavbarWorkshop from '../../components/NavbarWorkshop';
import FootprintGraph from './components/FootprintGraph';
import EvolutionCarbon from './components/EvolutionCarbon';
import CommonModal from '../../components/CommonModal';
import { startRound } from '../../actions/workshop';
import NewRoundModalForm from './components/NewRoundModalForm';
import ActionCardsEntry from './components/ActionCardsEntry';
const Simulation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentRound = useSelector(
    (state) =>
      state.workshop &&
      state.workshop.result &&
      state.workshop.result.currentYear
  );
  const roundActionCardType = useSelector(
    (state) =>
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
    <React.Fragment>
      <NavbarWorkshop
        avatarUrl="https://img.icons8.com/doodle/48/000000/user.png"
        firstName="Xavier"
        role="Animateur"
      />
      <StyledSimulation>
        <Container className="row-full">
          <Row className="d-flex justify-content-end mr-1">
            <Button variant="secondary" onClick={handleShowNewRoundModal}>
              {t('common.nextRound')}
            </Button>
          </Row>
          <Row style={{ height: '100vh' }}>
            <Col sm={12} md={8} className="graph-col">
              <Container className="graph-card">
                <h4>
                  Evolution du CO<span style={{ fontSize: '14px' }}>2</span> par
                  personne
                </h4>
                <EvolutionCarbon data={evolutionData} />
              </Container>
            </Col>
            <Col sm={12} md={4} className="graph-col">
              <Container className="graph-card">
                <h4> La population </h4>
                <FootprintGraph footprint={footprintShaped} />
              </Container>
              <Container className="graph-card">
                <h4> Les participants </h4>
                <FootprintGraph footprint={footprintShaped} />
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
    </React.Fragment>
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

for (var i = 0; i < evolutionData.length; i++) {
  evolutionData[i].avg_players = avg_players(evolutionData[i]);
}

// const footprintInitial = {
//   transport: {
//     plane: 750,
//     train: {
//       urbanTrain: 39,
//       mainlineTrain: 20,
//     },
//     bus: {
//       urbanBus: 93.6,
//       coach: {
//         coach_commute: 6.4,
//         coach_travel: 40,
//       },
//     },
//     car: {
//       dailyCommutes: 53.25201203029334,
//       exceptionalCommutes: 583.5836934826667,
//     },
//   },
//   housing: {
//     housingEquipment: {
//       appliances: {
//         smallAppliances: 46.666666666666664,
//         bigApplicances: 54.36666666666667,
//       },
//       furnitures: {
//         furnituresPerSurface: 79,
//         furnituresMin: 73.4044444,
//       },
//     },
//     constructionAndMaintenance: {
//       construction: {
//         houseConstruction: 283.34,
//         flatConstruction: 0,
//       },
//       maintenance: 13.88,
//     },
//     energies: {
//       water: 9.07536,
//       electricity: {
//         elecHeating: 1.3,
//         elecCooking: 1.3,
//         elecWaterHeating: 1.3,
//         elecLightning: 1.3,
//       },
//       gas: {
//         gasHeating: 22.7,
//         gasCooking: 22.7,
//         gasWaterHeating: 22.7,
//       },
//       fuel: {
//         fuelHeating: 32.300000000000004,
//         fuelCooking: 32.300000000000004,
//         fuelWaterHeating: 32.300000000000004,
//       },
//       wood: {
//         woodHeating: 3,
//         woodCooking: 3,
//         woodWaterHeating: 3,
//       },
//     },
//   },
//   food: {
//     drinks: {
//       alcohol: 228.85499999999996,
//       hotDrinks: 112.42000000000002,
//       juicesAndSoda: 214.61999999999998,
//     },
//     meatAndFish: 352.86375,
//     eggsAndDairies: 71.66775,
//     others: {
//       fruitsAndVegetables: {
//         localFruitsAndVegeteables: 38.57007142857143,
//         importedFruitsAndVegeteables: 332.29600000000005,
//       },
//       transformedProducts: 202.176,
//       groceriesAndStarches: 240.65753571428573,
//     },
//   },
//   others: {
//     clothing: 671.4,
//     digital: {
//       devices: {
//         smallDevices: 25,
//         bigDevices: 143.39999999999998,
//       },
//       internetUsage: {
//         intrnetStreaming: 32.5,
//         intrnetOthers: 48.66,
//       },
//     },
//     others: {
//       activities: {
//         activitiesElectricity: 23.76,
//         activitiesGas: 26.64,
//         activitiesWithoutEnergy: 1.98,
//       },
//       goods_and_services: {
//         servicesElectricity: 62.88,
//         servicesGas: 70.19,
//         servicesWithoutEnergy: 211.92,
//       },
//     },
//   },
//   publicServices: 1000,
// };

export default Simulation;
