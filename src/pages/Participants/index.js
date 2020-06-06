/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../vars';
import {
  addParticipant,
  deleteParticipant,
  setParticipantNameEmail,
} from '../../actions/participants';
import AddIcon from '../../assets/AddIcon';
import NavbarWorkshop from '../../components/NavbarWorkshop';

import {
  ParticipantItemForm,
  ParticipantsHeader,
} from './components/ParticipantItemForm';

const ManageParticipants = () => {
  const workshopTitle = useSelector(
    (state) => state.workshop.result && state.workshop.result.title
  );
  const { t } = useTranslation();
  const participants = useSelector(
    (state) => state.workshop.entities && state.workshop.entities.participants
  );
  console.log('participants', participants);
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

  const participantItems = [];

  participants &&
    personas &&
    Object.keys(participants).forEach((id) => {
      const p = participants[id];
      console.log('participantss', p);
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
      onClick={() => handleClick(null)}
    >
      <NavbarWorkshop />
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
