import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './components/simulationPage.css';
import ActionCardsEntry from './components/ActionCardsEntry';
import CommonModal from '../../components/CommonModal';
import EvolutionCarbon from './components/EvolutionCarbon';
import FootprintGraphType from './components/FootprintGraphType';
import NewRoundModalForm from './components/NewRoundModalForm';
import PrimaryButton from '../../components/PrimaryButton';
import { startRound } from '../../actions/workshop';

const Simulation = () => {
  const { loadError, isLoading } = useSelector((state) => state.workshop);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentRound = useSelector(
    (state) =>
      state.workshop &&
      state.workshop.result &&
      state.workshop.result.currentYear
  );
  const workshopTitle = useSelector(
    (state) => state.workshop.result && state.workshop.result.name
  );
  const roundActionCardType = useSelector(
    (state) =>
      currentRound &&
      state.workshop &&
      state.workshop.entities &&
      state.workshop.entities.roundConfig &&
      state.workshop.entities.roundConfig[currentRound] &&
      state.workshop.entities.roundConfig[currentRound].actionCardType
  );
  // NewRoundModal
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const handleCloseNewRoundModal = () => setShowNewRoundModal(false);
  const [showEntryOfActionCards, setShowEntryOfActionCards] = useState(false);
  const handleSubmitNewRoundModal = (values) => {
    dispatch(startRound(values));
    setShowNewRoundModal(false);
    setShowEntryOfActionCards(true);
  };
  const handleShowNewRoundModal = () => setShowNewRoundModal(true);
  // EntryOfActionCards
  const handleCloseEntryOfActionCards = () => setShowEntryOfActionCards(false);
  return (
    <>
      {!currentRound && (
        <>
          <h4 className="workshop_title">{t('common.noCurrentWorkshop')}</h4>
          <h4 className="workshop_title">{t('common.selectAWorkshop')}</h4>
        </>
      )}
      {currentRound && (
        <>
          <h4
            style={{ marginBottom: 10, marginTop: 0 }}
            className="workshop_title"
          >
            {workshopTitle}
          </h4>
          <h5 style={{ margin: 5 }}>
            {t('common.we_are_in')}
            {'  '}
            <span style={{ fontSize: 25, fontWeight: 'bold' }}>
              {' '}
              {currentRound}
            </span>
          </h5>

          <StyledSimulation>
            <Container className="row-full">
              <Row className="d-flex justify-content-end mr-1">
                <PrimaryButton
                  className="primaryButton"
                  size="lg"
                  variant="secondary"
                  onClick={handleShowNewRoundModal}
                >
                  {t('common.nextRound')}
                </PrimaryButton>
              </Row>
              {loadError && <p>{t('common.loadError')}</p>}
              {isLoading && (
                <Spinner animation="border" className="pt-3 mx-auto mt-5" />
              )}
              {!isLoading && (
                <Row style={{ height: '100vh' }}>
                  <Col sm={12} md={8} className="graph-col">
                    <Container className="graph-card">
                      <h4>{t('simulation.carbon_footprint_evolution')}</h4>
                      <EvolutionCarbon />
                    </Container>
                  </Col>
                  <Col sm={12} md={4} className="graph-col">
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
        </>
      )}
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

export default Simulation;
