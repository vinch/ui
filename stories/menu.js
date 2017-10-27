import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import { withInfo } from '@storybook/addon-info';
import styles from '@sambego/storybook-styles';
import { IconAddSmallOutline, IconMeetingSmallOutline, IconClockSmallOutline } from '@teamleader/ui-icons';
import { IconMenu, Menu, MenuItem, MenuDivider } from '../components';
import { baseStyles, centerStyles } from '../.storybook/styles';

storiesOf('Menus', module)
  .addDecorator((story, context) => withInfo('common info')(story)(context))
  .addDecorator(checkA11y)
  .addDecorator(styles({ ...baseStyles, ...centerStyles }))
  .add('Menu', () => (
    <Menu onSelect={action('select')} selectable={false}>
      <MenuItem value="foo" caption="Caption" />
      <MenuItem onClick={action('click')} value="bar" caption="Caption & Shortcut" shortcut="Ctrl + P" />
      <MenuItem caption="Disabled ..." disabled shortcut="Ctrl + P" />
      <MenuDivider />
      <MenuItem caption="Caption & Icon" icon={<IconAddSmallOutline/>} />
      <MenuItem caption="Caption, Icon & Shortcut" icon={<IconMeetingSmallOutline/>} shortcut="Ctrl + P" />
      <MenuItem caption="Disabled ..." icon={<IconClockSmallOutline/>} shortcut="Ctrl + P" disabled />
    </Menu>
  ))
  .add('IconMenu', () => (
    <IconMenu onSelect={action('select')} position="top-left">
      <MenuItem value="foo" caption="Caption" />
      <MenuItem onClick={action('click')} value="bar" caption="Caption & Shortcut" shortcut="Ctrl + P" />
      <MenuItem caption="Disabled ..." disabled shortcut="Ctrl + P" />
    </IconMenu>
  ));