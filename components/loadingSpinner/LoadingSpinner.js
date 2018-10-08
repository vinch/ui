import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Box from '../box';
import cx from 'classnames';
import theme from './theme.css';
import InjectColor from '../hoc/injectColor';
import InjectSize from '../hoc/injectSize';
import InjectTint from '../hoc/injectTint';

class LoadingSpinner extends PureComponent {
  render() {
    const { className, size, colorClassName, tintClassName, sizeClassName, ...others } = this.props;

    const classNames = cx(
      theme['loading-spinner'],
      theme[colorClassName],
      theme[tintClassName],
      theme[sizeClassName],
      className,
    );

    return <Box data-teamleader-ui="loading-spinner" className={classNames} {...others} />;
  }
}

LoadingSpinner.propTypes = {
  className: PropTypes.string,
};

export default InjectSize(InjectTint(InjectColor(LoadingSpinner)));
