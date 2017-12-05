import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Box from '../box';
import cx from 'classnames';
import theme from './theme.css';

class StatusBullet extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(['mint', 'violet', 'ruby', 'gold', 'aqua', 'neutral']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };

  static defaultProps = {
    color: 'neutral',
    size: 'medium',
  };

  render() {
    const { children, className, color, size, ...others } = this.props;

    const classNames = cx(theme['bullet'], theme[color], theme[size], className);

    return (
      <Box className={classNames} element="span" {...others} data-teamleader-ui="status-bullet">
        <span className={theme['label']}>{children}</span>
      </Box>
    );
  }
}

export default StatusBullet;
