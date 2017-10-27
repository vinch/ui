import { configure, addDecorator } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';
import backgroundColor from 'react-storybook-decorator-background';

// addon-info
setDefaults({
  header: false,
  inline: false,
  source: true,
  propTablesExclude: [],
  styles: stylesheet => {
    stylesheet.link.topRight.zIndex = 99999999;
    return stylesheet;
  }
});

setOptions({
  name: `Version ${process.env.__VERSION__}`,
  url: 'https://teamleader.design'
});

addDecorator(backgroundColor(['#ffffff', '#e6f2ff', '#ffeecc', '#d3f3f3', '#ffe3d9', '#e1edfa', '#f1f0ff', '#344b63']));

const req = require.context('../stories', true, /\.js$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);