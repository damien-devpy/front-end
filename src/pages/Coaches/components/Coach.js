import React from 'react';
import styled, { css } from 'styled-components';

const Coach = ({
  userId,
  name,
  lastWorkshopDate,
  email,
  role,
  numberOfWorkshops,
  ...props
}) => {
  return (
    <div className='row' key={userId}>
      <StyledCol {...props} className='col-3'>
        {name}
      </StyledCol>
      <StyledCol {...props} className='d-none d-md-block col-3'>
        {lastWorkshopDate}
      </StyledCol>
      <StyledCol {...props} className='col-4'>
        {email}
      </StyledCol>
      <StyledCol {...props} className='col'>
        {role}
      </StyledCol>
      <StyledCol {...props} className='d-none d-md-block col'>
        {numberOfWorkshops}
      </StyledCol>
    </div>
  );
};

const StyledCol = styled.div`
  border-bottom: 1px solid;
  ${(props) =>
    props.header &&
    css`
      font-weight: bold;
    `}
`;

export default Coach;
