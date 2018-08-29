import styled, { css } from 'styled-components';

const BORDER_RADIUS = '4px';

const colors = {
  neutral: {
    lightest: '#ffffff',
    light: '#f7f7fa',
    normal: '#e4e4e6',
    dark: '#c0c0c4',
    darkest: '#82828c',
  },
  mint: {
    lightest: '#d3f2f2',
    light: '#57d3d2',
    normal: '#00b2b2',
    dark: '#008a8c',
    darkest: '#004b4d',
  },
  ruby: {
    lightest: '#ffe2d9',
    light: '#ffbca6',
    normal: '#ff7040',
    dark: '#e84b17',
    darkest: '#992600',
  },
  teal: {
    lightest: '#e1ecfa',
    light: '#c1cede',
    normal: '#64788f',
    dark: '#344b63',
    darkest: '#2a3b4d',
  },
};

const hex2Rgba = (hex, alpha) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const resetStyles = css`
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-size-adjust: 100%;
`;

const buttonBaseStyles = css`
  ${resetStyles} align-items: center;
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  letter-spacing: 0;
  margin: 0;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition-property: background-color, border-color, color, opacity;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  white-space: nowrap;
  vertical-align: middle;

  font-family: 'Inter-UI-Medium';
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const destructiveButtonStyles = css`
  background-color: ${colors.ruby.normal};
  border: 1px solid ${colors.ruby.dark};
  color: ${props => (props.processing ? colors.ruby.normal : colors.neutral.lightest)};
  opacity: ${props => (props.disabled ? 0.24 : 1)};
  &:hover {
    background-color: ${colors.ruby.dark};
    border-color: ${colors.ruby.darkest};
  }
  &:focus {
    background-color: ${colors.ruby.normal};
    border-color: ${colors.ruby.darkest};
    box-shadow: 0 0 0 1px ${colors.ruby.darkest};
  }
  &:active {
    background-color: ${colors.ruby.dark};
    border: 1px solid ${colors.ruby.darkest};
  }
`;

const outlineButtonStyles = css`
  background-color: transparent;
  border: 1px solid ${hex2Rgba(colors.teal.darkest, 0.72)};
  color: ${props => (props.processing ? 'transparent' : colors.teal.darkest)};
  &:hover {
    background-color: ${hex2Rgba(colors.teal.darkest, 0.06)};
    border-color: ${colors.teal.darkest};
  }
  &:focus {
    border-color: ${colors.teal.darkest};
    box-shadow: 0 0 0 1px ${colors.teal.darkest};
  }
`;

const outlineInverseButtonStyles = css`
  background-color: transparent;
  border: 1px solid ${hex2Rgba(colors.neutral.lightest, 0.72)};
  color: ${props => (props.processing ? 'transparent' : colors.neutral.lightest)};
  &:hover {
    background-color: ${hex2Rgba(colors.neutral.lightest, 0.12)};
    border-color: ${colors.neutral.lightest};
  }
  &:focus {
    border-color: ${colors.neutral.lightest};
    box-shadow: 0 0 0 1px ${colors.neutral.lightest};
  }
`;

const primaryButtonStyles = css`
  background-color: ${colors.mint.normal};
  border: 1px solid ${colors.mint.dark};
  color: ${props => (props.processing ? colors.mint.normal : colors.neutral.lightest)};
  &:hover {
    background-color: ${colors.mint.dark};
    border-color: ${colors.mint.darkest};
  }
  &:focus {
    background-color: ${colors.mint.normal};
    border-color: ${colors.mint.dark};
    box-shadow: 0 0 0 1px ${colors.mint.dark};
  }
  &:active {
    background-color: ${colors.mint.dark};
    border: 1px solid ${colors.mint.darkest};
  }
`;

const secondaryButtonStyles = css`
  background-color: ${colors.neutral.light};
  border: 1px solid ${colors.neutral.dark};
  color: ${props => (props.processing ? colors.neutral.light : colors.teal.darkest)};
  &:hover {
    background-color: ${colors.neutral.normal};
    border-color: ${colors.neutral.darkest};
  }
  &:focus {
    background-color: ${colors.neutral.light};
    border-color: ${colors.neutral.darkest};
    box-shadow: 0 0 0 1px ${colors.neutral.darkest};
  }
  &:active {
    background-color: ${colors.neutral.normal};
  }
`;

const smallButtonStyes = css`
  font-size: 14px;
  height: 36px;
  line-height: 34px;
  min-width: 36px;
  padding: 0 12px;
`;

const mediumButtonStyes = css`
  font-size: 14px;
  height: 36px;
  line-height: 34px;
  min-width: 36px;
  padding: 0 12px;
`;

const largeButtonStyes = css`
  font-size: 16px;
  height: 48px;
  line-height: 46px;
  min-width: 48px;
  padding: 0 18px;
`;

export {
  buttonBaseStyles,
  destructiveButtonStyles,
  outlineButtonStyles,
  outlineInverseButtonStyles,
  primaryButtonStyles,
  resetStyles,
  secondaryButtonStyles,
  smallButtonStyes,
  mediumButtonStyes,
  largeButtonStyes,
};
