import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DeleteIcon from '../../../assets/DeleteIcon';
import EnterIcon from '../../../assets/EnterIcon';
// import { useWorkshop } from '../../../hooks/workshop';
import '../../../index.css';

const WorkshopTable = ({ workshops, t, handleDelete }) => {
  return (
    <Table borderless>
      <thead>
        <tr>
          <th>{t('common.date')}</th>
          <th>{t('common.workshopName')}</th>
          <th>{t('common.workshopStatus')}</th>
          <th>{t('common.coach')}</th>
          <th>{t('common.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {workshops &&
          workshops.map(({ id, date, name, status, coachName }) => {
            return (
              <StyledRow status={status} key={id}>
                <td>{moment(date).format('L')}</td>
                <td>{name}</td>
                <td>{status}</td>
                <td>{coachName}</td>
                <td>
                  <Link to={`workshop/${id}/participants`}>
                    <Button variant="light mr-1">
                      <EnterIcon height={20} width={20} />
                    </Button>
                  </Link>

                  <Button variant="light" onClick={() => handleDelete(id)}>
                    <DeleteIcon height={20} width={20} />
                  </Button>
                </td>
              </StyledRow>
            );
          })}
      </tbody>
    </Table>
  );
};
const StyledRow = styled.tr`
  font-weight: ${(props) => (props.status === 'En cours' ? 'bolder' : '')};
  background: ${(props) => (props.status === 'En cours' ? '#FAF6F2' : '')};
  vertical-align: middle;
`;
export default WorkshopTable;
