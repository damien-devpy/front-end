import React, { useState } from 'react';
import styled from 'styled-components';
import { useWorkshops } from '../../hooks/workshops';
import { addWorkshop, deleteWorkshop } from '../../actions/workshops';
import AddIcon from '../../assets/AddIcon';
import { useDispatch } from 'react-redux';
import WorkshopTable from './components/WorkshopTable';
import WorkshopModal from './components/WorkshopModal';
import { COLORS } from '../../vars';
import { useTranslation } from 'react-i18next';
import { Button, Spinner, Container, Card } from 'react-bootstrap';
import NavbarHome from '../../components/NavbarHome';
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
    <>
      <NavbarHome></NavbarHome>
      <Container>
        <Card
          className="p-5 border-light shadow-sm"
          style={{ borderRadius: 10 }}
        >
          <StyledHeader>
            <h2>{t('common.workshops')}</h2>
            {!isLoading && (
              <StyledButton variant="secondary" onClick={handleShow}>
                <AddIcon height={20} width={20} fill={'white'} />
                {'   '}
                {t('common.newWorkshop')}
              </StyledButton>
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
    </>
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
