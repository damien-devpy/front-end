import React from 'react';
import styled, { css } from 'styled-components';

const STYLE = {
  SIZE: {
    XL: {
      WIDTH: '6.25rem',
      HEIGHT: '6.25rem',
      FONT_SIZE: '2.5rem',
    },
    L: {
      WIDTH: '3.5rem',
      HEIGHT: '3.5rem',
      FONT_SIZE: '1.5rem',
    },
    M: {
      WIDTH: '2.25rem',
      HEIGHT: '2.25rem',
      FONT_SIZE: '1rem',
    },
    S: {
      WIDTH: '1.5rem',
      HEIGHT: '1.5rem',
      FONT_SIZE: '0.75rem',
    },
  },
};

const dimensions = ({ size = 'large' }) => {
  const sizeChart = {
    small: 'S',
    medium: 'M',
    large: 'L',
    extraLarge: 'XL',
  };
  return css`
    width: ${STYLE.SIZE[sizeChart[size]].WIDTH};
    height: ${STYLE.SIZE[sizeChart[size]].HEIGHT};
    font-size: ${STYLE.SIZE[sizeChart[size]].FONT_SIZE};
  `;
};

const initials = (name, maxInitials) =>
  name
    .split(' ')
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

const displayAvatar = (src, name, maxInitials) => {
  if (src) {
    return <img src={src} alt={name} />;
  }
  return <p>{name ? initials(name, maxInitials) : '?'}</p>;
};

const Avatar = ({ src, name, maxInitials = 2, ...rest }) => (
  <StyledAvatar {...rest}>{displayAvatar(src, name, maxInitials)}</StyledAvatar>
);

const StyledAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${dimensions}
  border-radius: 50%;
  & > img {
    border-radius: 50%;
    ${dimensions}
    object-fit: cover;
  }
  & > p {
    margin: 0;
  }
  background: white;
  box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.5);
`;

export default Avatar;
