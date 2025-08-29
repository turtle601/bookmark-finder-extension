import { color } from '@/v3/shared/styles/color';
import { SerializedStyles, css } from '@emotion/react';

export const globalStyle: SerializedStyles = css({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },

  'ul, ol, li': {
    listStyle: 'none',
  },

  'html, body': {
    width: '100%',
    height: '100%',
    fontFamily: `'Inter', sans-serif`,
    color: color.slate[900],
  },

  a: {
    textDecoration: 'none',
    color: 'inherit',
  },

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
  },

  input: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: '0',
  },

  'input[type="number"]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: '0',
  },

  'input[type="number"]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: '0',
  },
});
