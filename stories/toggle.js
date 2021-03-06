import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs/react';
import { Toggle } from '../src';

const sizes = ['small', 'medium', 'large'];

storiesOf('Form elements/Toggle', module)
  .add('Basic', () => (
    <Toggle
      checked={boolean('Checked', false)}
      disabled={boolean('Disabled', false)}
      size={select('Size', sizes, 'medium')}
    />
  ))
  .add('With labels', () => (
    <Toggle
      checked={boolean('Checked', false)}
      disabled={boolean('Disabled', false)}
      label={`I'm a toggle`}
      size={select('Size', sizes, 'medium')}
    />
  ));
