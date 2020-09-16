import React from 'react';

import EnvelopeIcon from '../assets/EnvelopeIcon';
import { Button } from 'react-bootstrap';

const SendMailButton = ({ onClick, disabled, children, color, variant, size, style }) => {
  return (
    <Button onClick={onClick} disabled={disabled} size={size} variant={variant} style={style}>
      <EnvelopeIcon
        width={20}
        height={20}
        style={{ position: 'relative', transform: 'translateY(-5%)', fill: color }}
        color={color}
        className="fill-current-color"
      />
      {'  '}
      {children}
    </Button>

  );
};

export default SendMailButton;
