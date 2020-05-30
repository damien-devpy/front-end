import React from 'react';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import EnterIcon from '../../../assets/EnterIcon';
import DeleteIcon from '../../../assets/DeleteIcon';
// import { useWorkshop } from '../../../hooks/workshop';
import { Link } from 'react-router-dom';

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
          workshops.map(
            (
              { date, workshopName, status, coachName, action },
              workshopKey
            ) => {
              return (
                <tr key={workshopKey}>
                  <td>{moment(date).format('L')}</td>
                  <td>{workshopName}</td>
                  <td>{status}</td>
                  <td>{coachName}</td>
                  <td>
                    <Link to="/participants">
                      <Button variant="light mr-1">
                        <EnterIcon height={20} width={20} />
                      </Button>
                    </Link>

                    <Button
                      variant="light"
                      onClick={() => handleDelete(workshopKey)}
                    >
                      <DeleteIcon height={20} width={20} />
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
      </tbody>
    </Table>
  );
};

export default WorkshopTable;
