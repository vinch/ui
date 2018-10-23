import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Box from '../box';
import cx from 'classnames';
import theme from './theme.css';
import injectTheme from '../hoc/injectTheme';

class LoadingSpinner extends PureComponent {
  render() {
    const { className, size, sizeClassName, ...others } = this.props;

    const classNames = cx(theme['loading-spinner'], theme[sizeClassName], className);

    return <Box data-teamleader-ui="loading-spinner" className={classNames} {...others} />;
  }
}

LoadingSpinner.propTypes = {
  className: PropTypes.string,
};

export default injectTheme(theme)(LoadingSpinner);
