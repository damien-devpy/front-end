import React, { useState } from 'react';
import { Card, Container, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddNewButton from '../../components/AddNewButton';
import CardHeader from '../../components/CardHeader';
import CoachModalForm from './components/CoachModalForm';
import CoachTable from './components/CoachTable';
import CommonModal from '../../components/CommonModal';
import { addCoach } from '../../actions/coaches';
import { createCoachApi, deleteCoachApi } from '../../utils/api';
import { resetError, throwError } from '../../actions/errors';
import { useCoaches } from '../../hooks/coaches';

const Coaches = () => {
  const { t } = useTranslation();
  const { coaches, isLoading, loadError } = useCoaches();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    dispatch(resetError());
  };

  const createAsyncCoach = (coach) => (dispatchThunk) => {
    createCoachApi({ data: coach })
      .then((data) => dispatchThunk(addCoach(data)))
      .catch((e) => {
        dispatchThunk(
          throwError(
            `${t('errors.createCoach', {
              coachName: coach.name,
            })} : ${e}`
          )
        );
      });
  };

  const handleSubmit = (values) => {
    // dispatch(addCoach(values));
    values.confirmPassword = undefined;
    dispatch(createAsyncCoach(values));
    setShow(false);
  };
  return (
    <Container>
      <Card className="p-5 border-light shadow-sm" style={{ borderRadius: 10 }}>
        <CardHeader>
          <h2>{t('common.coaches')}</h2>
          {!isLoading && (
            <AddNewButton onClick={handleShow}>
              {t('common.addACoach')}
            </AddNewButton>
          )}
        </CardHeader>
        <hr />

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

export default Coaches;
