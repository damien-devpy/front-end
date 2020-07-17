import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './components/simulationPage.css';
import ActionCardsEntry from './components/ActionCardsEntry';
import CardHeader from '../../components/CardHeader';
import CommonModal from '../../components/CommonModal';
import EvolutionCarbon from './components/EvolutionCarbon';
import FootprintGraphType from './components/FootprintGraphType';
import NewRoundModalForm from './components/NewRoundModalForm';
import PrimaryButton from '../../components/PrimaryButton';
import { selectCurrentRound } from '../../selectors/workshopSelector';
import { startRound } from '../../actions/workshop';
import { useWorkshop } from '../../hooks/workshop';

const Simulation = ({
  match: {
    params: { workshopId },
  },
}) => {
  const { loadError, isLoading } = useWorkshop(workshopId);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentRound = useSelector((state) =>
    selectCurrentRound(state.workshop)
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
      {/* {!currentRound && (
        <>
          <h4 className="workshop-title">{t('common.noCurrentWorkshop')}</h4>
          <h4 className="workshop-title">{t('common.selectAWorkshop')}</h4>
        </>
      )} */}
      <div className="d-flex justify-content-center">
        {loadError && <p>{t('common.loadError')}</p>}
        {isLoading && (
          <Spinner animation="border" className="pt-3 mx-auto mt-5" />
        )}
      </div>

      {currentRound && (
        <>
          <h2 className="workshop-title">{workshopTitle}</h2>

          <StyledSimulation>
            <Container className="row-full">
              <CardHeader>
                <h3>
                  <small>{t('common.we_are_in')}</small> {currentRound}
                </h3>
                <PrimaryButton
                  className="pull-right"
                  size="lg"
                  variant="secondary"
                  onClick={handleShowNewRoundModal}
                >
                  {t('common.nextRound')}
                </PrimaryButton>
              </CardHeader>
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
