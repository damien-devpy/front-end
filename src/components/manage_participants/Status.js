
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, ButtonGroup, Toast } from 'react-bootstrap'

export const ParticipantStatus = ({
    value,
}) => {
    const { t } = useTranslation();

    const [show, setShow] = useState(false);

    const copyToClipboard = (e) => {
        var dummyContent = "this is to be copied to clipboard";
        // var dummy = $('<input>').val(dummyContent).appendTo('body').select()
        document.execCommand('copy')
        setShow(true)
    }

    switch (value) {

        case 'MISSING_INFO':
            return (<span className="badge alert-danger">
                {t('manageParticipants.missingInfo')}
            </span>);

        case 'MUST_SEND_EMAIL':
            return (

                <Dropdown as={ButtonGroup}>
                    <Button variant="warning" size="sm">{t('manageParticipants.sendBCForm')}</Button>
                    <Dropdown.Toggle split variant="warning btn-sm" id="dropdown-split-basic" size="sm" />
                    <Toast style={{
                        position: 'absolute',
                        top: 0,
                        right: -80,
                    }} onClose={() => setShow(false)} show={show} delay={3000} animation={true} autohide><Toast.Body className="badge">Copied!</Toast.Body></Toast>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">{t('manageParticipants.sendByEmail')}</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={copyToClipboard}>{t('manageParticipants.sendByLink')}</Dropdown.Item>
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
                    </span> <a href="" title={t('manageParticipants.seeBC')} className="badge">&#x1f50d;</a>
                </div>
            );
    }
}