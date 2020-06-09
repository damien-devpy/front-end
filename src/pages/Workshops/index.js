import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Container, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import '../../index.css';
import AddIcon from '../../assets/AddIcon';
import PrimaryButton from '../../components/PrimaryButton';
import WorkshopModal from './components/WorkshopModal';
import WorkshopTable from './components/WorkshopTable';
import userImg from '../../assets/img_noe.png';
import { COLORS } from '../../vars';
import { addWorkshop, deleteWorkshop } from '../../actions/workshops';
import { useWorkshops } from '../../hooks/workshops';

const Workshops = () => {
  const { t } = useTranslation();
  const { workshops, isLoading, loadError } = useWorkshops();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (values) => {
    dispatch(addWorkshop(values));
    setShow(false);
  };
  const handleDelete = (workshopKey) => {
    dispatch(deleteWorkshop(workshopKey));
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

        <WorkshopModal
          t={t}
          show={show}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
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
