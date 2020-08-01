import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CommonModal from '../../../components/CommonModal';
import DeleteIcon from '../../../assets/DeleteIcon';
import EnterIcon from '../../../assets/EnterIcon';

const WorkshopTable = ({ workshops, coaches, t, handleDelete }) => {
  const [workshopToDelete, setWorkshopToDelete] = useState({
    id: null,
    name: null,
  });
  const handleDeleteModal = (workshop) => {
    setWorkshopToDelete(workshop);
  };
  const handleCloseModal = () => setWorkshopToDelete({ id: null, name: null });
  const handleDeleteConfirmation = () => {
    handleDelete(workshopToDelete.id);
    handleCloseModal();
  };

  return (
    <>
      <Table borderless>
        <thead>
          <tr>
            <th>{t('common.date')}</th>
            <th>{t('common.workshopName')}</th>
            <th>{t('common.workshopCity')}</th>
            <th>{t('common.coach')}</th>
            <th>{t('common.workshopStatus')}</th>
            <th>{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {workshops &&
            coaches &&
            workshops.map(({ id, startAt, name, city, status, coachId }) => {
              const coachEmail = coaches.find((coach) => coach.id === coachId)
                .email;
              const link =
                status === 'created'
                  ? `workshop/${id}/participants`
                  : `workshop/${id}/simulation`;
              return (
                <StyledRow status={status} key={id}>
                  <td>{moment(startAt).format('DD/MM/YYYY')}</td>
                  <td>{name}</td>
                  <td>{city}</td>
                  <td>{coachEmail}</td>
                  <td>{t(`workshop.status.${status}`)}</td>
                  <td>
                    <Link to={link}>
                      <Button variant="light mr-1">
                        <EnterIcon height={20} width={20} />
                      </Button>
                    </Link>

                    <Button
                      variant="light"
                      onClick={() => handleDeleteModal({ id, name })}
                    >
                      <DeleteIcon height={20} width={20} />
                    </Button>
                  </td>
                </StyledRow>
              );
            })}
        </tbody>
      </Table>
      <CommonModal
        t={t}
        title={t('common.deleteWorkshop')}
        show={workshopToDelete.id !== null}
        handleAcknowledge={handleDeleteConfirmation}
        handleClose={handleCloseModal}
      >
        <p>
          {t('common.deleteWorkshopConfirmation', {
            workshopName: workshopToDelete.name,
          })}
        </p>
      </CommonModal>
    </>
  );
};
const StyledRow = styled.tr`
  font-weight: ${(props) => (props.status === 'En cours' ? 'bolder' : '')};
  background: ${(props) => (props.status === 'En cours' ? '#FAF6F2' : '')};
  vertical-align: middle;
`;
export default WorkshopTable;
