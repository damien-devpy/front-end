import React, { useState } from 'react';
import { Card, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddNewButton from '../../components/AddNewButton';
import CardHeader from '../../components/CardHeader';
import CommonModal from '../../components/CommonModal';
import WorkshopModalForm from './components/WorkshopModalForm';
import WorkshopTable from './components/WorkshopTable';
import { addWorkshop, deleteWorkshop } from '../../actions/workshops';
import { createWorkshopApi, deleteWorkshopApi } from '../../utils/api';
import { selectCoachWorkshops } from '../../selectors/workshopsSelector';
import { selectUser } from '../../selectors/currentUser';
import { selectWorkshopById } from '../../selectors/workshopSelector';
import { throwError } from '../../actions/errors';
import { useCoaches } from '../../hooks/coaches';
import { useWorkshops } from '../../hooks/workshops';

const Workshops = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => selectUser(state.currentUser));
  // Display all workshops for admin
  const modifiedUserId =
    currentUser.role === 'admin' ? undefined : currentUser.id;
  const workshopsTitleId =
    currentUser.role === 'admin'
      ? t('common.workshops')
      : t('common.myWorkshops');
  const { workshops, isLoading, loadError } = useWorkshops();
  const filteredWorkshops = useSelector((state) =>
    selectCoachWorkshops(state.workshops, modifiedUserId)
  );
  const { coaches } = useCoaches();
  // Coaches can only create a workshop for themselves
  // Admins can create aworkshop for any coach or admin
  const authorizedCoaches =
    currentUser && currentUser.role === 'admin' ? coaches : [currentUser];
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const createAsyncWorkshop = (workshop) => (dispatchThunk) => {
    createWorkshopApi({ data: workshop })
      .then((data) => dispatchThunk(addWorkshop(data)))
      .catch(() => {
        dispatchThunk(
          throwError(
            t('errors.createWorkshop', {
              workshopName: workshop.name,
            })
          )
        );
      });
  };
  const handleSubmit = (values) => {
    dispatch(createAsyncWorkshop(values));
    setShow(false);
  };
  const deleteAsyncWorkshop = (workshopId) => (dispatchThunk) => {
    deleteWorkshopApi({ workshopId })
      .then(() => {
        dispatchThunk(deleteWorkshop(workshopId));
      })
      .catch(() => {
        dispatchThunk(
          throwError(
            t('errors.deleteWorkshop', {
              workshopName: selectWorkshopById(workshops, workshopId).name,
            })
          )
        );
      });
  };
  const handleDelete = (workshopId) => {
    dispatch(deleteAsyncWorkshop(workshopId));
  };

  return (
    <Container>
      <Card className="p-5 border-light shadow-sm" style={{ borderRadius: 10 }}>
        <CardHeader>
          <h2>{t(workshopsTitleId)}</h2>
          {!isLoading && (
            <AddNewButton onClick={handleShow}>
              {t('common.newWorkshop')}
            </AddNewButton>
          )}
        </CardHeader>
        <hr/>

        {loadError && <p>{t('common.loadError')}</p>}
        {isLoading && (
          <Spinner animation="border" className="pt-3 mx-auto mt-5" />
        )}

        {workshops && (
          <WorkshopTable
            t={t}
            workshops={filteredWorkshops}
            coaches={coaches}
            handleDelete={handleDelete}
          />
        )}
        <CommonModal
          title={t('common.newWorkshop')}
          show={show}
          handleClose={handleClose}
        >
          <WorkshopModalForm
            t={t}
            coaches={authorizedCoaches}
            handleSubmit={handleSubmit}
          />
        </CommonModal>
      </Card>
    </Container>
  );
};

export default Workshops;
