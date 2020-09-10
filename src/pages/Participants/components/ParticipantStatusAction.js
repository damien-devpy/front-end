import React, { useState } from 'react';
import { Button, ButtonGroup, Dropdown, Toast } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

const ParticipantStatusAction = ({ value, handleShowBC, handleSendForm }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  switch (value) {
    // case 'MISSING_INFO':
    //   return (
    //     <span className="badge alert-danger">
    //       {t('manageParticipants.missingInfo')}
    //     </span>
    //   );

    case 'created':
      return (
        <Button variant="warning" size="sm" onClick={handleSendForm}>
          {t('manageParticipants.sendBCForm')}
        </Button>
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
        <Button variant="warning" size="sm" onClick={handleSendForm}>
        {t('manageParticipants.resendBCForm')}
      </Button>
      );

    case 'data_to_check':
      return(     // onclick go to participant data
      <Button variant="light" size="sm" onClick={}> 
      {t('manageParticipants.data')}
    </Button>)

    case 'ready':
      return (
        <Button variant="light" size="sm" onClick={handleShowBC}> 
            &#x1f50d;
        </Button>
      );

    default:
      return <span className="badge alert-danger">{t('manageParticipants.missing_status')}</span>;
  }
};

export default ParticipantStatusAction;
