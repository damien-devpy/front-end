import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { COLORS, FONT } from '../../vars';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useParticipants } from '../../hooks/participants'
import { usePersonas } from '../../hooks/personas'

import { setParticipantNameEmail, addParticipant } from '../../actions/participants';

import { ParticipantItemForm, ParticipantsHeader } from './components/ParticipantItemForm'

const ManageParticipants = () => {
    const { participants, isLoading, loadError } = useParticipants();
    const { personas, isLoadingPersonas, loadErrorPersonas } = usePersonas();
    const dispatch = useDispatch();
    
    // keep track of actived rows globally 
    const [active, setActive] = useState({});

    const initActive = (participants) => {
        // by default only rows that are missing required info are active
        return participants && Object.assign({}, ...participants.allIds.map(
            id_ => ({ [id_]: !participants.byId[id_].isValid })))
    }

    useEffect(() => {
        participants && setActive(initActive(participants));
    }, [participants])

    const onClick = (id) => {
        // if previously another row was activated because it was clicked, it will not be now
        // unless it misses required info
        let active_ = Object.assign({}, ...participants.allIds.map(
            id_ => ({ [id_]: !participants.byId[id_].isValid })));
        active_[id] = true;
        setActive(active_);
    }

    const participantItems = [];
    // console.log("ManageParticipants", participants, personas)

    participants && personas && participants.allIds.forEach((id) => {
        let p = participants.byId[id];
        participantItems.push(<ParticipantItemForm
            id={id}
            firstName={p.firstName}
            lastName={p.lastName}
            initEmail={p.email}
            status={p.status}
            key={id}
            updateParticipant={(id, name, email, persona, valid) => {
                dispatch(setParticipantNameEmail(id, name, email, persona, valid))
            }}
            isActive={active[id]}
            isValid={p.isValid}
            onClick={onClick}
            personas={personas}
            currentPersonaId={p.personaId}
        />);
    });

    return <div className="container">
                {loadError && <p>Error</p>}
        {isLoading && <Spinner animation="border"></Spinner>}
            <ParticipantsHeader />
            {participantItems}
        <AddParticipant onAddNew={() => {
            dispatch(addParticipant())}} />
    </div>;
};

const StyledParticipants = styled.div`
  margin: 10px 0;
`;

const AddParticipant = ({ onAddNew }) => {
    const { t } = useTranslation();
    
    return <StyledAdd onClick={(e) => {
        onAddNew() }}>
        &#x2295; {t('manageParticipants.addNew')}
    </StyledAdd>
}

export const StyledAdd = styled.div`
  background-color: ${COLORS.WHITE};
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  padding-left: 10px;
  border:2px dashed ${COLORS.GRAY.LIGHT};
`;

export default ManageParticipants;

