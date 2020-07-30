import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Loading = ({ isLoading, error, children }) => {
  const t = useTranslation();
  if (error) {
    return (
      <div className="d-flex justify-content-center">
        <p>{t('common.loadError')}</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" className="pt-3 mx-auto mt-5" />
      </div>
    );
  }
  return children;
};

export default Loading;
