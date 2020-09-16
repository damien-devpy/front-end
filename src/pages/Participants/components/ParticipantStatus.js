import React from 'react';
import { useTranslation } from 'react-i18next';

const ParticipantStatus = ({ value }) => {
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
        <span className="badge alert-secondary">
          {t('manageParticipants.toSendBCForm')}
        </span>
        // <Dropdown as={ButtonGroup}>
        //   <Button variant="warning" size="sm" onClick={handleSendForm}>
        //     {t('manageParticipants.sendBCForm')}
        //   </Button>
        //   <Dropdown.Toggle
        //     split
        //     variant="warning btn-sm"
        //     id="dropdown-split-basic"
        //     size="sm"
        //   />
        //   <Toast
        //     style={{
        //       position: 'absolute',
        //       top: 0,
        //       right: -80,
        //     }}
        //     onClose={() => setShow(false)}
        //     show={show}
        //     delay={2000}
        //     animation
        //     autohide
        //   >
        //     <Toast.Body className="badge">
        //       {show ? t('manageParticipants.copied') : ''}
        //     </Toast.Body>
        //   </Toast>
        //   <Dropdown.Menu>
        //     <Dropdown.Item href="#/action-1">
        //       {t('manageParticipants.sendByEmail')}
        //     </Dropdown.Item>
        //     <CopyToClipboard text={value} onCopy={() => setShow(true)}>
        //       <Dropdown.Item href="#/action-2">
        //         {t('manageParticipants.sendByLink')}
        //       </Dropdown.Item>
        //     </CopyToClipboard>
        //   </Dropdown.Menu>
        // </Dropdown>
      );
    // not handled yet in backend
    case 'form_sent':
      return (
        <span className="badge alert-warning">
          {t('manageParticipants.emailSent')}
        </span>
      );

    case 'data_to_check':
      return (
        <span className="badge alert-info">
          {t('manageParticipants.checkData')}
        </span>
      );

    case 'ready':
      return (
        <div>
          <span className="badge alert-success" role="alert">
            {t('manageParticipants.ready')}
          </span>{' '}
          {/* <a
            href="#"
            title={t('manageParticipants.seeBC')}
            className="badge"
            onClick={handleShowBC}
          >
            &#x1f50d;
          </a> */}
        </div>
      );

    default:
      return (
        <span className="badge alert-danger">
          {t('manageParticipants.missing_status')}
        </span>
      );
  }
};

export default ParticipantStatus;
