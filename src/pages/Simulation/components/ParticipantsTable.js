import React from 'react';
import { Table } from 'react-bootstrap';

const ParticipantsTable = ({ workshopParticipants, entityParticipants, t }) => {
  console.log('workshopParticipants', workshopParticipants);
  console.log('participants', entityParticipants);
  return (
    <Table borderless striped hover>
      <tbody>
        {workshopParticipants &&
          entityParticipants &&
          workshopParticipants.map((participantId) => {
            const { email, firstName, lastName } = entityParticipants[
              participantId
            ];
            return (
              <tr key={email}>
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
