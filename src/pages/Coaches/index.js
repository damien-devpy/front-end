import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Container, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PrimaryButton from "../../components/PrimaryButton"
import CommonModal from '../../components/CommonModal';
import CoachModalForm from './components/CoachModalForm';
import CoachTable from './components/CoachTable';
import {
  deleteAsyncCoach,
  createAsyncCoach,
} from '../../actions/coaches';
import { COLORS } from '../../vars';
import { addCoach } from '../../actions/coaches';
import { useCoaches } from '../../hooks/coaches';

const Coaches = () => {
  const { t } = useTranslation();
  const { coaches, isLoading, loadError } = useCoaches();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (values) => {
    // dispatch(addCoach(values));
    values.confirmPassword=undefined
    dispatch(createAsyncCoach(values));
    setShow(false);
  };
  return (
    <Container>
      <Card className="p-5 border-light shadow-sm" style={{ borderRadius: 10 }}>
        <StyledHeader>
          <h2>{t('common.coaches')}</h2>
          {!isLoading && (
            <PrimaryButton onClick={handleShow}>
              {t('common.addACoach')}
            </PrimaryButton>
          )}
        </StyledHeader>
        <hr style={{ margin: 0 }} />

        {loadError && <p>{t('common.loadError')}</p>}
        {isLoading && (
          <Spinner animation="border" className="pt-3 mx-auto mt-5" />
        )}

        {coaches && <CoachTable t={t} coaches={coaches} />}

        <CommonModal
          title={t('common.addACoach')}
          show={show}
          handleClose={handleClose}
        >
          <CoachModalForm t={t} handleSubmit={handleSubmit} />
        </CommonModal>
      </Card>
    </Container>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export default Coaches;
