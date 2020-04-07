import React from 'react';

import classnames from 'classnames';
import styled from 'styled-components';

const ButtonsGroup = ({ children, className, ...rest }) => {
  const props = {
    className: classnames(className, 'ButtonsGroup'),
    ...rest,
  };

  return <StyledButtonsGroup {...props}>{children}</StyledButtonsGroup>;
};

const StyledButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  margin-top: -1rem;

  & > .Button {
    margin-top: 1rem;
    margin-right: 1rem;
  }
`;

/* @component */
export default ButtonsGroup;
