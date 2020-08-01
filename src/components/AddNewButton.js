import React from 'react';

import AddIcon from '../assets/AddIcon';
import PrimaryButton from './PrimaryButton';

const AddNewButton = ({ onClick, disabled, children }) => {
  return (
    <PrimaryButton onClick={onClick} disabled={disabled}>
      <AddIcon
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

export default AddNewButton;
