import React from 'react';
import moment from 'moment';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { useWorkshop } from '../../../hooks/workshop';
import DeleteIcon from '../../../assets/DeleteIcon';
import EnterIcon from '../../../assets/EnterIcon';

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
          workshops.map(({ id, date, name, status, coachName, action }) => {
            return (
              <tr key={id}>
                <td>{moment(date).format('L')}</td>
                <td>{name}</td>
                <td>{status}</td>
                <td>{coachName}</td>
                <td>
                  <Link to="/participants">
                    <Button variant="light mr-1">
                      <EnterIcon height={20} width={20} />
                    </Button>
                  </Link>

                  <Button variant="light" onClick={() => handleDelete(id)}>
                    <DeleteIcon height={20} width={20} />
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default WorkshopTable;
