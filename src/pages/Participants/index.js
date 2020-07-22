/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import Papa from 'papaparse';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Container, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddIcon from '../../assets/AddIcon';
import AddParticipantModalForm from './components/AddParticipantModalForm';
import FootprintGraph from '../Simulation/components/FootprintGraph';
import PrimaryButton from '../../components/PrimaryButton';
import computeCarbonVariables from '../../reducers/utils/bufferCarbonVariables';
import { COLORS } from '../../vars';
import {
  ParticipantItemForm,
  ParticipantsHeader,
} from './components/NewParticipantItem';
import {
  addParticipant,
  deleteParticipant,
  setParticipantPersona,
} from '../../actions/participants';
import {
  changeParticipantApi,
  createParticipantApi,
  deleteParticipantApi,
  sendFormApi,
} from '../../utils/api';
import { computeFootprint, valueOnAllLevels } from '../../reducers/utils/model';
import { footprintDataToGraph } from '../../selectors/footprintSelectors';
import { startWorkshop } from '../../actions/workshop';
import { throwError } from '../../actions/errors';
import { useWorkshop } from '../../hooks/workshop';

export const loadHeatingNetworksData = async () => {
  const response = await fetch('/data/heating_networks.csv');
  const text = await response.text();
  const heatingNetworksData = Papa.parse(text);
  return heatingNetworksData.data;
};

const ManageParticipants = ({
  match: {
    params: { workshopId },
  },
}) => {
  useWorkshop(workshopId);

  const [showBC, setShowBC] = useState(false);
  const [showAddParticipantModal, setShowAddParticipantModal] = useState(false);
  const [footprintToShow, setFootprintToShow] = useState({});

  const isSynchronized = useSelector(
    (state) => state.workshop && state.workshop.isSynchronized
  );

  const workshopTitle = useSelector(
    (state) => state.workshop.result && state.workshop.result.name
  );
  const workshopStatus = useSelector(
    (state) => state.workshop.result && state.workshop.result.status
  );
  const startYear = useSelector(
    (state) => state.workshop.result && state.workshop.result.startYear
  );
  const { t } = useTranslation();
  const participants = useSelector(
    (state) => state.workshop.entities && state.workshop.entities.participants
  );
  const carbonFootprints = useSelector(
    (state) => state.workshop.result && state.workshop.entities.carbonFootprints
  );
  const globalCarbonVariables = useSelector(
    (state) =>
      state.workshop.result && state.workshop.result.model.globalCarbonVariables
  );
  const model = useSelector(
    (state) => state.workshop.result && state.workshop.result.model
  );

  const personas = useSelector(
    (state) => state.workshop.entities && state.workshop.entities.personas
  );

  const dispatch = useDispatch();

  const createAsyncParticipant = (values) => (dispatchThunk) => {
    createParticipantApi({ workshopId, data: values })
      .then((data) => dispatchThunk(addParticipant(data)))
      .catch(() => {
        dispatchThunk(
          throwError(
            t('errors.createParticipant', {
              participantName: '',
            })
          )
        );
      });
  };
  const handleAddParticipant = (values) => {
    dispatch(createAsyncParticipant(values));
    // triggers rerendering
    setShowAddParticipantModal(false);
  };

  const sendFormAsync = (participantId) => (dispatchThunk) => {
    sendFormApi({ workshopId, participantId }).catch(() => {
      dispatchThunk(
        throwError(
          t('errors.sendForm', {
            participantId,
          })
        )
      );
    });
  };
  const handleSendForm = (participantId) => {
    console.log('Send form participant', participantId);
    dispatch(sendFormAsync(participantId));
  };

  const deleteAsyncParticipant = (participantId) => (dispatchThunk) => {
    deleteParticipantApi({ workshopId, participantId })
      .then(() => {
        dispatchThunk(deleteParticipant(participantId));
      })
      .catch(() => {
        dispatchThunk(
          throwError(
            t('errors.deleteParticipant', {
              // workshopName: selectWorkshopById(workshops, workshopId).name,
            })
          )
        );
      });
  };
  const handleDelete = (participantId) => {
    dispatch(deleteAsyncParticipant(participantId));
  };

  const changeAsyncParticipant = (participantId, personaId) => (
    dispatchThunk
  ) => {
    changeParticipantApi({ data: { workshopId, participantId, personaId } })
      .then((data) =>
        dispatchThunk(
          setParticipantPersona(
            data.id,
            data.personaId,
            data.status,
            data.surveyVariables
          )
        )
      )
      .catch(() => {
        dispatchThunk(
          throwError(
            t('errors.changeParticipant', {
              participantName: '',
            })
          )
        );
      });
  };
  const handleChangePersona = (participantId, personaId) => {
    dispatch(changeAsyncParticipant(participantId, personaId));
  };

  const handleShowBC = (id) => {
    // ideally
    // 1. carbon variables should be pre-computed for each persona
    // 2. add higher-level function where
    // valueOnAllLevels & computeFootprint are put together and
    // input variables are simplified, e.g. could be given as `model`
    loadHeatingNetworksData().then((heatingNetworksData) => {
      const { footprintStructure, variableFormulas } = model;
      const footprint = participants[id].personaId
        ? valueOnAllLevels(
            computeFootprint(
              footprintStructure,
              variableFormulas,
              computeCarbonVariables(
                personas[participants[id].personaId].surveyVariables,
                globalCarbonVariables,
                heatingNetworksData
                // todo add heating networks data
              ),
              globalCarbonVariables
            )
          )
        : carbonFootprints[`${startYear}-${id}`].footprint;

      // 3. footprintDataToGraph should be part of FootprintGraph
      const footprintShaped = footprintDataToGraph(footprint);
      setFootprintToShow(footprintShaped);
      setShowBC(true);
    });
  };

  const participantItems = [];

  participants &&
    personas &&
    Object.keys(participants).forEach((id) => {
      const p = participants[id];
      console.log('Rerender participants', p);
      participantItems.push(
        <ParticipantItemForm
          key={id}
          id={id}
          firstName={p.firstName}
          lastName={p.lastName}
          email={p.email}
          status={p.status}
          updateParticipant={(persona) => {
            handleChangePersona(id, persona);
          }}
          deleteParticipant={() => handleDelete(id)}
          personas={personas}
          currentPersonaId={p.personaId}
          handleShowBC={handleShowBC}
          handleSendForm={handleSendForm}
        />
      );
    });

  return (
    <Container>
      {isSynchronized && workshopStatus === 'ongoing' && (
        <Redirect to={`/workshop/${workshopId}/simulation`} />
      )}
      <Card className="p-5 border-light shadow-sm" style={{ borderRadius: 10 }}>
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
            onClick={() => {
              setShowAddParticipantModal(true);
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <PrimaryButton onClick={() => dispatch(startWorkshop(2020))}>
              {t('common.launch_simulation')}
            </PrimaryButton>
          </div>
        </div>
      </Card>
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
      <Modal
        size="md"
        centered
        show={showAddParticipantModal}
        onHide={() => {
          setShowAddParticipantModal(false);
        }}
      >
        <Modal.Body>
          <AddParticipantModalForm t={t} handleSubmit={handleAddParticipant} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

const AddParticipant = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <StyledAdd onClick={onClick}>
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
