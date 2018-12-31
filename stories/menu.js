import React from 'react';
import { storiesOf } from '@storybook/react';
import { Store, State } from '@sambego/storybook-state';
import {
  IconAddSmallOutline,
  IconUserSmallFilled,
  IconClockSmallOutline,
  IconMoreMediumOutline,
} from '@teamleader/ui-icons';
import { Box, IconButton, IconMenu, Menu, MenuItem, MenuDivider, Popover } from '../src';
import RevisedIconMenu from '../src/components/menu/RevisedIconMenu';
import RevisedMenu from '../src/components/menu/RevisedMenu';

const store = new Store({
  active: false,
});

const handleOnButtonClick = event => {
  store.set({ anchorEl: event.currentTarget, active: true });
};

const close = () => {
  store.set({ active: false });
};

const handleOnOverlayClick = () => {
  close();
};

const handleOnSelect = value => {
  store.set({ selected: value });
  close();
};

storiesOf('Menus', module)
  .add('Menu', () => (
    <Menu selectable={false}>
      <MenuItem value="foo" caption="Caption" />
      <MenuItem value="bar" caption="Caption & Shortcut" shortcut="Ctrl + P" />
      <MenuItem caption="Disabled ..." disabled shortcut="Ctrl + P" />
      <MenuDivider />
      <MenuItem caption="Caption & Icon" icon={<IconAddSmallOutline />} />
      <MenuItem caption="Caption, Icon & Shortcut" icon={<IconUserSmallFilled />} shortcut="Ctrl + P" />
      <MenuItem caption="Disabled ..." icon={<IconClockSmallOutline />} shortcut="Ctrl + P" disabled />
    </Menu>
  ))
  .add('IconMenu', () => (
    <IconMenu position="top-left" onSelect={handleOnSelect}>
      <MenuItem value="foo" caption="Caption" />
      <MenuItem value="bar" caption="Caption & Shortcut" shortcut="Ctrl + P" />
      <MenuItem caption="Disabled ..." disabled shortcut="Ctrl + P" />
    </IconMenu>
  ))
  .add('RevisedIconMenu', () => (
    <RevisedIconMenu display="flex" justifyContent="center" backdrop="transperant" onSelect={handleOnSelect}>
      <MenuItem value="foo" caption="Caption" />
      <MenuItem value="bar" caption="Caption & Shortcut" shortcut="Ctrl + P" />
      <MenuItem caption="Disabled ..." disabled shortcut="Ctrl + P" />
    </RevisedIconMenu>
  ))
  .add('IconButton with RevisedMenu', () => (
    <Box display="flex" justifyContent="center">
      <IconButton onClick={handleOnButtonClick} icon={<IconMoreMediumOutline />} />
      <State store={store}>
        <RevisedMenu
          backdrop="transperant"
          lockScroll={false}
          onOverlayClick={handleOnOverlayClick}
          onSelect={handleOnSelect}
        >
          <MenuItem value="foo" caption="Caption" />
          <MenuItem value="bar" caption="Caption & Shortcut" shortcut="Ctrl + P" />
          <MenuItem caption="Disabled ..." disabled shortcut="Ctrl + P" />
        </RevisedMenu>
      </State>
    </Box>
  ));
