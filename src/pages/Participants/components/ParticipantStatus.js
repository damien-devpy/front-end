import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, ButtonGroup, Toast } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const ParticipantStatus = ({ value }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  switch (value) {
    case 'MISSING_INFO':
      return (
        <span className="badge alert-danger">
          {t('manageParticipants.missingInfo')}
        </span>
      );

    case 'MUST_SEND_EMAIL':
      return (
        <Dropdown as={ButtonGroup}>
          <Button variant="warning" size="sm">
            {t('manageParticipants.sendBCForm')}
          </Button>
          <Dropdown.Toggle
            split
            variant="warning btn-sm"
            id="dropdown-split-basic"
            size="sm"
          />
          <Toast
            style={{
              position: 'absolute',
              top: 0,
              right: -80,
            }}
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            animation={true}
            autohide
          >
            <Toast.Body className="badge">
              {show ? t('manageParticipants.copied') : ''}
            </Toast.Body>
          </Toast>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              {t('manageParticipants.sendByEmail')}
            </Dropdown.Item>
            <CopyToClipboard text={value} onCopy={() => setShow(true)}>
              <Dropdown.Item href="#/action-2">
                {t('manageParticipants.sendByLink')}
              </Dropdown.Item>
            </CopyToClipboard>
          </Dropdown.Menu>
        </Dropdown>
      );

    case 'EMAIL_SENT':
      return (
        <span className="badge alert-warning">
          {t('manageParticipants.emailSent')}
        </span>
      );

    case 'BILAN_RECEIVED':
      return (
        <div>
          <span className="badge alert-success" role="alert">
            {t('manageParticipants.ready')}
          </span>{' '}
          <a href="" title={t('manageParticipants.seeBC')} className="badge">
            &#x1f50d;
          </a>
        </div>
      );

    default:
      return (<span className="badge alert-danger">
      missing status
    </span>)
  }
};
