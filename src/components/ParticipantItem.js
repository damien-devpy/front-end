import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { COLORS, FONT } from '../vars';

const ParticipantItem = ({
  firstName,
  lastName,
  email,
  persona,
  status,
  isActive,
  onClick,
}) => {
  const { t } = useTranslation();
  const handleItemClick = (e) => {
    e.stopPropagation();
    onClick && onClick();
  };
  return (
    <StyledParticipant isActive={isActive} onClick={handleItemClick}>
      <StyledName>
        {firstName} {lastName}
      </StyledName>
      <StyledEmail>{email}</StyledEmail>
      <StyledPersona>{persona}</StyledPersona>
      <StyledStatus>{status}</StyledStatus>
    </StyledParticipant>
  );
};
const StyledParticipant = styled.li`
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.isActive ? COLORS.AQUA.STANDARD : COLORS.WHITE};
  box-shadow: 0 0 0 1px rgba(170, 170, 170, 0.5);
  position: relative;
`;

const StyledName = styled.p`
  margin-left: 0.5rem;
`;
const StyledEmail = styled.p`
  margin-left: 0.5rem;
`;
const StyledPersona = styled.p`
  margin-left: 0.5rem;
`;
const StyledStatus = styled.p`
  margin-left: 0.5rem;
`;

export default ParticipantItem;
