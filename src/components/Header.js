import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Avatar from './Avatar';
// import Button from './Button';
import { COLORS } from '../vars';

const Header = ({ name, date, avatarUrl, avatarName, firstName, role }) => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <StyledHeader>
      <StyledTop>
        <StyledTitle>
          <p>{t('common.caplc')}</p>
        </StyledTitle>
        <StyledWorkshop>
          <p>{name}</p>
          <p>{date}</p>
        </StyledWorkshop>
        <StyledRightMenu>
          <StyledNavDropDown
            title={
              <div style={{ display: 'inline-block' }}>
                <Avatar src={avatarUrl} name={avatarName}></Avatar>
              </div>
            }
            id='basic-nav-dropdown'
          >
            <NavDropdown.Header>{t('common.admins')}</NavDropdown.Header>
            <NavDropdown.Item href='/coaches'>
              {t('common.coaches')}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey={3.2}>Another action</NavDropdown.Item>
          </StyledNavDropDown>
          <StyledWelcome>
            <p>
              {t('common.welcome')} {firstName}
            </p>
            <p>{role}</p>
          </StyledWelcome>
        </StyledRightMenu>
      </StyledTop>
      <StyledLeftMenu>
        <Link to='/home'>
          <Button active={location.pathname === '/home'}>
            {t('common.home')}
          </Button>
        </Link>
        <Link to='/coaches'>
          <Button active={location.pathname === '/coaches'}>
            {t('common.coachesManagement')}
          </Button>
        </Link>
        {/* <Link to='/results'>
          <Button active={location.pathname === '/results'}>
            {t('common.results')}
          </Button>
        </Link> */}
      </StyledLeftMenu>
    </StyledHeader>
  );
};

const StyledNavDropDown = styled(NavDropdown)`
  .dropdown-toggle::after {
    content: none;
  }
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    margin: 0.5rem 2rem;
  }
  background: ${COLORS.BROWN.STANDARD};
`;

const StyledWorkshop = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  width: 50%;
  text-align: center;
  & > p {
    margin: 0;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 25%;
  & > p {
    margin: 0;
  }
`;

const StyledWelcome = styled.div`
  text-align: center;
  & > p {
    margin: 0;
  }
`;

const StyledLeftMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  button {
    margin-right: 0.5rem;
  }
`;

const StyledRightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 25%;
  margin: 0;
  button {
    margin-right: 0.5rem;
  }
`;
export default Header;
