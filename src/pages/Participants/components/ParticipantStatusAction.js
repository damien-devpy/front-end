import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// import PrimaryButton from '../../../components/PrimaryButton';
import SendMailButton from '../../../components/SendMailButton';

const ParticipantStatusAction = ({ value, handleShowBC, handleSendForm }) => {
  const { t } = useTranslation();

  switch (value) {
    // case 'MISSING_INFO':
    //   return (
    //     <span className="badge alert-danger">
    //       {t('manageParticipants.missingInfo')}
    //     </span>
    //   );

    case 'created':
      return (
        <SendMailButton
          size="sm"
          variant="info"
          onClick={handleSendForm}
          style={{ fontSize: 12 }}
          color="#000"
        >
          {t('manageParticipants.sendBCForm')}
        </SendMailButton>
      );
    // not handled yet in backend
    case 'form_sent':
      return (
        <SendMailButton
          size="sm"
          variant="warning"
          onClick={handleSendForm}
          style={{ fontSize: 12 }}
          color="#000"
        >
          {t('manageParticipants.resendBCForm')}
        </SendMailButton>
      );

    case 'data_to_check':
      return (
        // onclick go to participant data
        <Button variant="light" size="sm" style={{ fontSize: 16 }}>
          &#128065; {'  '}
          {/* {t('manageParticipants.data')} */}
        </Button>
      );

    case 'ready':
      return (
        <Button
          variant="light"
          size="sm"
          onClick={handleShowBC}
          style={{ fontSize: 16 }}
        >
          &#128202;
        </Button>
      );

    default:
      return (
        <span className="badge alert-danger">
          {t('manageParticipants.missing_status')}
        </span>
      );
  }
};

export default ParticipantStatusAction;