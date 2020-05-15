import React from 'react';
import { Table } from 'react-bootstrap';

const ParticipantsTable = ({
  workshopParticipants,
  entityParticipants,
  selectedParticipantId,
  handleSelect,
  t,
}) => {
  return (
    <Table borderless striped hover>
      <tbody>
        {workshopParticipants &&
          entityParticipants &&
          workshopParticipants.map((participantId) => {
            const { email, firstName, lastName } = entityParticipants[
              participantId
            ];
            const style =
              selectedParticipantId === participantId
                ? {
                    backgroundColor: 'gray',
                  }
                : {};
            return (
              <tr
                key={email}
                onClick={() => handleSelect(participantId)}
                style={style}
              >
                <td>{firstName}</td>
                <td>{lastName}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
export default ParticipantsTable;
