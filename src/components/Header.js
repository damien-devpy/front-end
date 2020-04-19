import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Avatar from './Avatar';
import Button from './Button';
import { COLORS } from '../vars';

const Header = ({ name, date, avatarUrl, avatarName }) => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <StyledHeader>
      <StyledTop>
        <StyledWorkshop>
          <p>{name}</p>
          <p>{date}</p>
        </StyledWorkshop>
        <StyledTitle>
          <p>{t('common.caplc')}</p>
        </StyledTitle>
        <StyledLogo></StyledLogo>
      </StyledTop>
      <StyledBottom>
        <StyledLeftMenu>
          <Link to='/home'>
            <Button active={location.pathname === '/home'}>
              {t('common.home')}
            </Button>
          </Link>
          <Link to='/simulation'>
            <Button active={location.pathname === '/simulation'}>
              {t('common.simulation')}
            </Button>
          </Link>
          <Link to='/results'>
            <Button active={location.pathname === '/results'}>
              {t('common.results')}
            </Button>
          </Link>
          <Link to='/manage_participants'>
            <Button active={location.pathname === '/manage_participants'}>
              {t('common.manage')}
            </Button>
          </Link>
        </StyledLeftMenu>
        <StyledRightMenu>
          <Avatar src={avatarUrl} name={avatarName}></Avatar>
        </StyledRightMenu>
      </StyledBottom>
    </StyledHeader>
  );
};
const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: ${COLORS.BROWN.STANDARD};
`;

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 2rem;
`;

const StyledWorkshop = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 25%;
  & > p {
    margin: 0;
  }
`;

const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  width: 50%;
  text-align: center;
  & > p {
    margin: 0;
  }
`;

const StyledLogo = styled.div`
  width: 25%;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0rem 2rem 0.5rem 2rem;
`;

const StyledLeftMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  button {
    margin-right: 0.5rem;
  }
`;

const StyledRightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  button {
    margin-right: 0.5rem;
  }
`;
export default Header;
