import React from 'react';

import AddIcon from '../assets/AddIcon';
import PrimaryButton from './PrimaryButton';

const AddNewButton = ({ onClick, children }) => {
  return (
    <PrimaryButton onClick={onClick}>
      <AddIcon
        height={20}
        width={20}
        style={{ position: 'relative', transform: 'translateY(-5%)' }}
        class="fill-current-color"
      />
      {'  '}
      {children}
    </PrimaryButton>
  );
};

export default AddNewButton;
