import React from 'react';

import DownloadIcon from '../assets/DownloadIcon';
import PrimaryButton from './PrimaryButton';

const DownloadButton = ({ onClick, children }) => {
  return (
    <PrimaryButton onClick={onClick}>
      <DownloadIcon
        width={20}
        height={20}
        style={{ position: 'relative', transform: 'translateY(-5%)' }}
        className="fill-current-color"
      />
      {'  '}
      {children}
    </PrimaryButton>
  );
};

export default DownloadButton;
