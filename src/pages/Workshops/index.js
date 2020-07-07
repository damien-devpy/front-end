import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Container, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddIcon from '../../assets/AddIcon';
import CommonModal from '../../components/CommonModal';
import PrimaryButton from '../../components/PrimaryButton';
import WorkshopModalForm from './components/WorkshopModalForm';
import WorkshopTable from './components/WorkshopTable';
import { COLORS } from '../../vars';
import { addWorkshop, deleteWorkshop } from '../../actions/workshops';
import { createWorkshopApi, deleteWorkshopApi } from '../../utils/api';
import { selectWorkshopById } from '../../selectors/workshopSelector';
import { throwError } from '../../actions/errors';
import { useCoaches } from '../../hooks/coaches';
import { useWorkshops } from '../../hooks/workshops';

const Workshops = () => {
  const { t } = useTranslation();
  const { workshops, isLoading, loadError } = useWorkshops();
  const { coaches } = useCoaches();
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
        <StyledHeader>
          <h2>{t('common.workshops')}</h2>
          {!isLoading && (
            <PrimaryButton variant="secondary" onClick={handleShow}>
              <AddIcon height={20} width={20} fill="inherit" />
              {'     '}
              {t('common.newWorkshop')}
            </PrimaryButton>
          )}
        </StyledHeader>
        <hr style={{ margin: 0 }} />

        {loadError && <p>{t('common.loadError')}</p>}
        {isLoading && (
          <Spinner animation="border" className="pt-3 mx-auto mt-5" />
        )}

        {workshops && (
          <WorkshopTable
            t={t}
            workshops={workshops}
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
            coaches={coaches}
            handleSubmit={handleSubmit}
          />
        </CommonModal>
      </Card>
    </Container>
  );
};

export default Workshops;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const StyledButton = styled(Button)`
  background-color: ${COLORS.BROWN.STANDARD};
  border-color: ${COLORS.BROWN.STANDARD};
`;
