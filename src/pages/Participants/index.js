/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Spinner, Card, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../vars';
import { useParticipants } from '../../hooks/participants';
import { usePersonas } from '../../hooks/personas';
import NavbarWorkshop from '../../components/NavbarWorkshop';
import AddIcon from '../../assets/AddIcon';
import {
  setParticipantNameEmail,
  addParticipant,
  deleteParticipant,
} from '../../actions/participants';

import {
  ParticipantItemForm,
  ParticipantsHeader,
} from './components/ParticipantItemForm';

const ManageParticipants = () => {
  const workshopTitle = useSelector(
    (state) => state.workshop.result && state.workshop.result.title
  );
  const { t } = useTranslation();
  const { participants, isLoading, loadError } = useParticipants();
  const { personas } = usePersonas();
  const dispatch = useDispatch();

  // keep track of actived rows globally
  const [active, setActive] = useState({});

  // by default only rows that are missing required info are active
  const initActive = () =>
    Object.assign(
      {},
      ...participants.allIds.map((i) => ({
        [i]: !participants.byId[i].isValid,
      }))
    );

  // update all rows only when the participants are added or deleted
  useEffect(() => {
    console.log('Use effect CONTAINER');
    participants && setActive(initActive(participants));
  }, [participants && participants.allIds]);

  const handleClick = (id) => {
    // if previously another row was activated because it was clicked, it will not be now
    // unless it misses required info
    console.log('On CLICK row', id);
    const newActive = Object.assign(
      {},
      ...participants.allIds.map((i) => ({
        [i]: !participants.byId[i].isValid,
      }))
    );
    id && (newActive[id] = true);
    setActive(newActive);
  };

  const participantItems = [];

  participants &&
    personas &&
    participants.allIds.forEach((id) => {
      const p = participants.byId[id];
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
        />
      );
    });

  // outer container to be able to handle clicks outside the rows, i.e. "lose focus" type of events
  return (
    <div
      className="container-fluid h-100 pb-5"
      onClick={(e) => handleClick(null)}
    >
      <NavbarWorkshop />
      <Container>
        <Card
          className="p-5 border-light shadow-sm"
          style={{ borderRadius: 10 }}
        >
          <h4 class="workshop_title">{workshopTitle}</h4>

          <StyledHeader>
            <h4>{t('common.participants_list')}</h4>
          </StyledHeader>

          <div className="container">
            {loadError && <p>Error</p>}
            {isLoading && <Spinner animation="border" />}
            <ParticipantsHeader />
            {participantItems}
            <AddParticipant
              dispatchAddEvent={() => {
                dispatch(addParticipant());
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <Link to="/simulation">
                <StyledButton>{t('common.launch_simulation')}</StyledButton>
              </Link>
            </div>
          </div>
        </Card>
      </Container>
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

const StyledButton = styled(Button)`
  background-color: ${COLORS.BROWN.STANDARD};
  border-color: ${COLORS.BROWN.STANDARD};
  transition: 0.3s
  :hover {
    color: ${COLORS.BROWN.STANDARD};
    background-color: white;
  }
`;
export default ManageParticipants;
