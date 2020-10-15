import React from 'react';
import { Form } from 'react-bootstrap';

const ParticipantDropdown = ({
  selectedParticipantId,
  participants,
  setParticipantId,
}) => {
  const participantOptions = [];
  Object.keys(participants).forEach((participantId) => {
    const oneParticipant = participants[participantId];
    participantOptions.push(
      <option
        key={oneParticipant.id}
        id={oneParticipant.id}
        value={oneParticipant.id}
      >
        {`${oneParticipant.firstName} ${oneParticipant.lastName}`}
      </option>
    );
  });

  return (
    <Form.Control
      custom
      as="select"
      size="sm"
      id="dropdown"
      name="participant"
      value={selectedParticipantId || null}
      onChange={(e) => setParticipantId(e.target.value)}
    >
      <option key="intial value">Sélectionner le participant</option>
      {participantOptions}
    </Form.Control>
  );
};
export default ParticipantDropdown;
