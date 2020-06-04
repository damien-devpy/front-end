import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useWorkshop } from '../../hooks/workshop';
import NavbarWorkshop from '../../components/NavbarWorkshop';
import FootprintGraphType from './components/FootprintGraphType';
import EvolutionCarbon from './components/EvolutionCarbon';
import CommonModal from '../../components/CommonModal';
import { startRound } from '../../actions/workshop';
import NewRoundModalForm from './components/NewRoundModalForm';
import ActionCardsEntry from './components/ActionCardsEntry';
import styled from 'styled-components';
import './components/simulationPage.css';
import { COLORS } from '../../vars';
const Simulation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entities, result, isLoading, loadError } = useWorkshop(1);
  console.log('entities', entities);
  console.log('result', result);
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
    <React.Fragment>
      <NavbarWorkshop
        avatarUrl="https://img.icons8.com/doodle/48/000000/user.png"
        firstName="Xavier"
        role="Animateur"
      />
      <h4 class="workshop_title">{workshopTitle}</h4>
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
            <StyledButton
              className="primaryButton"
              variant="secondary"
              onClick={handleShowNewRoundModal}
            >
              {t('common.nextRound')}
            </StyledButton>
          </Row>
          {loadError && <p>{t('common.loadError')}</p>}
          {isLoading && (
            <Spinner animation="border" className="pt-3 mx-auto mt-5" />
          )}
          {!isLoading && (
            <Row style={{ height: '100vh' }}>
              <Col sm={12} md={7} className="graph-col">
                <Container className="graph-card">
                  <h4>
                    {t('simulation.co2_evolution')}
                    <span style={{ fontSize: '14px' }}>2</span>{' '}
                    {t('simulation.per_person')}
                  </h4>
                  <EvolutionCarbon />
                </Container>
              </Col>
              <Col sm={12} md={5} className="graph-col">
                <Container className="graph-card">
                  <h4> {t('simulation.global_average')} </h4>
                  <FootprintGraphType type="globalAverage" />
                </Container>
                <Container className="graph-card">
                  <h4> {t('simulation.the_participants')} </h4>
                  <FootprintGraphType type="participantsAverage" />
                </Container>
              </Col>
            </Row>
          )}
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
const StyledButton = styled(Button)`
  background-color: ${COLORS.BROWN.STANDARD};
  border-color: ${COLORS.BROWN.STANDARD};
  transition: 0.3s;
  :hover {
    color: ${COLORS.BROWN.STANDARD};
    background-color: white;
    border-color: ${COLORS.BROWN.STANDARD};
  }
`;

const players = (obj) => Object.keys(obj).filter((k) => k !== 'year');
const sum = (obj) =>
  players(obj).reduce(
    (accumulator, currentValue) => accumulator + obj[currentValue],
    0
  );
const avg_players = (obj) => (sum(obj) / players(obj).length).toFixed(0) || 0;

export default Simulation;
