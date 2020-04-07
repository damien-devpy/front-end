import React from 'react';
import classnames from 'classnames';
import styled, { css } from 'styled-components';

import { COLORS, FONT } from '../vars';

const STYLE = {
  DEFAULT: {
    COLOR: COLORS.BLACK,
    BG_COLOR: COLORS.WHITE,
    BORDER_COLOR: COLORS.TRANSPARENT,
    HOVER_COLOR: COLORS.WHITE,
    HOVER_BG_COLOR: COLORS.BROWN.DARK,
    HOVER_BORDER_COLOR: COLORS.TRANSPARENT,
  },
  PRIMARY: {
    COLOR: COLORS.PRIMARY,
    BG_COLOR: COLORS.YELLOW.STANDARD,
    BORDER_COLOR: COLORS.YELLOW.STANDARD,
    HOVER_COLOR: COLORS.PRIMARY,
    HOVER_BG_COLOR: COLORS.YELLOW.DARK,
    HOVER_BORDER_COLOR: COLORS.YELLOW.DARK,
  },
  SECONDARY: {
    COLOR: COLORS.WHITE,
    BG_COLOR: '#949494',
    BORDER_COLOR: COLORS.WHITE,
    HOVER_COLOR: COLORS.WHITE,
    HOVER_BG_COLOR: '#ababab',
    HOVER_BORDER_COLOR: COLORS.WHITE,
  },
  SIZE: {
    L: '1rem',
    M: '0.75rem',
    S: '0.625rem',
  },
};

const Button = ({
  active,
  children,
  className,
  disabled,
  noBorder,
  onClick,
  type,
  ...rest
}) => {
  const props = {
    className: classnames(className, 'Button', { active, noBorder }),
    disabled,
    onClick,
    type,
    ...rest,
  };

  return <StyledButton {...props}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 1em 2em;
  border: none;
  border-radius: 0.25rem;
  outline: 0 !important;
  &:not(.noBorder) {
    box-shadow: inset 0 0 0 1px ${STYLE.DEFAULT.BORDER_COLOR};
  }

  background-color: ${STYLE.DEFAULT.BG_COLOR};
  color: ${STYLE.DEFAULT.COLOR};
  &:enabled:hover,
  &:enabled:active,
  &:enabled.active {
    &:not(.noBorder) {
      box-shadow: inset 0 0 0 1px ${STYLE.DEFAULT.HOVER_BORDER_COLOR};
    }
    background-color: ${STYLE.DEFAULT.HOVER_BG_COLOR};
    color: ${STYLE.DEFAULT.HOVER_COLOR};
  }

  font-family: ${FONT.FAMILY};
  font-weight: ${FONT.WEIGHT.MEDIUM};
  font-size: ${STYLE.SIZE.M};
  line-height: 1.5em;
  text-transform: uppercase;

  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.small &&
    css`
      font-size: ${STYLE.SIZE.S};
    `}

  ${(props) =>
    props.medium &&
    css`
      font-size: ${STYLE.SIZE.M};
    `}

  ${(props) =>
    props.large &&
    css`
      font-size: ${STYLE.SIZE.L};
    `}

  ${(props) =>
    props.primary &&
    css`
      &:not(.noBorder) {
        box-shadow: inset 0 0 0 1px ${STYLE.PRIMARY.BORDER_COLOR};
      }
      background-color: ${STYLE.PRIMARY.BG_COLOR};
      color: ${STYLE.PRIMARY.COLOR};
      &:enabled:hover,
      &:enabled:active,
      &:enabled.active {
        &:not(.noBorder) {
          box-shadow: inset 0 0 0 1px ${STYLE.PRIMARY.HOVER_BORDER_COLOR};
        }
        background-color: ${STYLE.PRIMARY.HOVER_BG_COLOR};
        color: ${STYLE.PRIMARY.HOVER_COLOR};
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      &:not(.noBorder) {
        box-shadow: inset 0 0 0 1px ${STYLE.SECONDARY.BORDER_COLOR};
      }
      background-color: ${STYLE.SECONDARY.BG_COLOR};
      color: ${STYLE.SECONDARY.COLOR};
      &:enabled:hover,
      &:enabled:active,
      &:enabled.active {
        &:not(.noBorder) {
          box-shadow: inset 0 0 0 1px ${STYLE.SECONDARY.HOVER_BORDER_COLOR};
        }
        background-color: ${STYLE.SECONDARY.HOVER_BG_COLOR};
        color: ${STYLE.SECONDARY.HOVER_COLOR};
      }
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

/* @component */
export default Button;
