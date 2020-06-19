/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddIcon from '../../assets/AddIcon';
import FootprintGraph from '../Simulation/components/FootprintGraph';
import PrimaryButton from '../../components/PrimaryButton';
import computeCarbonVariables from '../../reducers/utils/bufferCarbonVariables';
import { COLORS } from '../../vars';
import {
  ParticipantItemForm,
  ParticipantsHeader,
} from './components/ParticipantItemForm';
import {
  addParticipant,
  deleteParticipant,
  setParticipantNameEmail,
} from '../../actions/participants';
import {
  computeFootprints,
  computeFootprintsForCitizen,
  initWorkshop,
} from '../../actions/workshop';

import { computeFootprint, valueOnAllLevels } from '../../reducers/utils/model';
import { footprintDataToGraph } from '../../selectors/footprintSelectors';
import { useWorkshop } from '../../hooks/workshop';

const ManageParticipants = ({
  match: {
    params: { workshopId },
  },
}) => {
  useWorkshop(workshopId);
  const workshopTitle = useSelector(
    (state) => state.workshop.result && state.workshop.result.name
  );
  const startYear = useSelector(
    (state) => state.workshop.result && state.workshop.result.startYear
  );
  const { t } = useTranslation();
  const participants = useSelector(
    (state) => state.workshop.entities && state.workshop.entities.participants
  );
  console.log('participants', participants);
  const carbonFootprints = useSelector(
    (state) => state.workshop.result && state.workshop.entities.carbonFootprints
  );
  const globalCarbonVariables = useSelector(
    (state) =>
      state.workshop.result &&
      state.workshop.entities.globalCarbonVariables &&
      state.workshop.entities.globalCarbonVariables[startYear]
  );
  const model = useSelector(
    (state) => state.workshop.result && state.workshop.result.model
  );

  const numParticipants = useSelector(
    (state) =>
      state.workshop.result &&
      state.workshop.entities.participants &&
      Object.keys(state.workshop.entities.participants).length
  );
  const personas = useSelector(
    (state) => state.workshop.entities && state.workshop.entities.personas
  );
  console.log('personas', personas);
  const dispatch = useDispatch();

  // keep track of actived rows globally
  const [active, setActive] = useState({});

  // by default only rows that are missing required info are active
  const initActive = () =>
    Object.assign(
      {},
      ...Object.keys(participants).map((id) => ({
        [id]:
          !participants[id].isValid &&
          !(participants[id].status === 'registered'),
      }))
    );

  // update all rows only when the participants are added or deleted
  useEffect(() => {
    console.log('Use effect CONTAINER');
    participants && setActive(initActive(participants));
  }, [numParticipants]);

  const handleClick = (id) => {
    // if previously another row was activated because it was clicked, it will not be now
    // unless it misses required info
    console.log('On CLICK row', id);
    if (active[id]) return;
    const newActive = Object.assign(
      {},
      ...Object.keys(participants).map((i) => ({
        [i]:
          !participants[i].isValid &&
          !(participants[i].status === 'registered'),
      }))
    );
    id && (newActive[id] = true);
    setActive(newActive);
  };

  const [showBC, setShowBC] = useState(false);
  const [footprintToShow, setFootprintToShow] = useState({});

  const handleShowBC = (id) => {
    setShowBC(true);
    // ideally
    // 1. carbon variables should be pre-computed for each persona
    // 2. add higher-level function where
    // valueOnAllLevels & computeFootprint are put together and
    // input variables are simplified, e.g. could be given as `model`
    const { footprintStructure, variableFormulas } = model;
    const footprint = participants[id].personaId
      ? valueOnAllLevels(
          computeFootprint(
            footprintStructure,
            variableFormulas,
            computeCarbonVariables(
              personas[participants[id].personaId].surveyVariables,
              globalCarbonVariables
            ),
            globalCarbonVariables
          )
        )
      : carbonFootprints[`${startYear}-${id}`].footprint;

    // 3. footprintDataToGraph should be part of FootprintGraph
    const footprintShaped = footprintDataToGraph(footprint);
    setFootprintToShow(footprintShaped);
  };

  const participantItems = [];

  participants &&
    personas &&
    Object.keys(participants).forEach((id) => {
      const p = participants[id];
      console.log('Rerender participants', p);
      participantItems.push(
        <ParticipantItemForm
          id={id}
          firstName={p.firstName}
          lastName={p.lastName}
          initEmail={p.email}
          status={p.status}
          key={id}
          updateParticipant={(name, email, persona, valid) => {
            dispatch(setParticipantNameEmail(id, name, email, persona, valid));
          }}
          deleteParticipant={() => {
            dispatch(deleteParticipant(id));
          }}
          isActive={active[id]}
          isValid={p.isValid}
          handleClick={handleClick}
          personas={personas}
          currentPersonaId={p.personaId}
          handleShowBC={handleShowBC}
        />
      );
    });

  // outer container to be able to handle clicks outside the rows, i.e. "lose focus" type of events
  return (
    <div
      className="container-fluid h-100 pb-5"
      onClick={() => handleClick(null)}
    >
      <Container>
        <Card
          className="p-5 border-light shadow-sm"
          style={{ borderRadius: 10 }}
        >
          <h4 className="workshop_title">{workshopTitle}</h4>

          <StyledHeader>
            <h4>{t('common.participants_list')}</h4>
          </StyledHeader>

          <div className="container">
            {/* {loadError && <p>Error</p>} */}
            {/* {isLoading && <Spinner animation="border" />} */}
            <ParticipantsHeader />
            {participantItems}
            <AddParticipant
              dispatchAddEvent={() => {
                dispatch(addParticipant());
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <Link to={`/workshop/${workshopId}/simulation`}>
                <PrimaryButton
                  onClick={() => {
                    dispatch(initWorkshop(startYear));
                    dispatch(computeFootprints(startYear));
                    dispatch(computeFootprintsForCitizen(startYear));
                  }}
                >
                  {t('common.launch_simulation')}
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </Card>
      </Container>
      <Modal
        size="md"
        centered
        show={showBC}
        onHide={() => {
          setShowBC(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Bilan carbone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FootprintGraph footprint={footprintToShow} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

const AddParticipant = ({ dispatchAddEvent }) => {
  const { t } = useTranslation();

  return (
    <StyledAdd onClick={dispatchAddEvent}>
      <AddIcon width={20} height={20} /> {'   '}{' '}
      {t('manageParticipants.addNew')}
    </StyledAdd>
  );
};

export const StyledAdd = styled.div`
  background-color: ${COLORS.WHITE};
  margin: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  padding-left: 10px;
  border: 2px dashed #e2e0e0;
  text-align: center;
  transition: 0.5s;
  :focus,
  :hover {
    background-color: #dedede;
  }
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export default ManageParticipants;
