import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import theme from './theme.css';

class ProgressStep extends PureComponent {
  render() {
    const { label, active, completed, color } = this.props;
    const classNames = cx(theme['progress-step'], theme[color], {
      [theme['is-active']]: active,
      [theme['is-completed']]: completed,
    });
    return (
      <div className={classNames}>
        <label>{label}</label>
      </div>
    );
  }
}

ProgressStep.propTypes = {
  /** Color theme of the progress tracker. */
  color: PropTypes.oneOf(['neutral', 'mint', 'aqua', 'violet', 'teal', 'gold', 'ruby']),
  /** The label for the progress step */
  label: PropTypes.string.isRequired,
  /** Whether or not the step is active */
  active: PropTypes.bool.isRequired,
  /** Whether or not the step has been completed */
  completed: PropTypes.bool.isRequired,
};

ProgressStep.defaultProps = {
  color: 'neutral',
};

export default ProgressStep;
