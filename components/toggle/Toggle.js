import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import theme from './theme.css';
import cx from 'classnames';

class Toggle extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['neutral', 'teal', 'ruby', 'mint', 'violet', 'gold', 'aqua']),
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    size: 'medium',
    color: 'neutral',
  };

  constructor () {
    super(...arguments);
    this.handleToggle = ::this.handleToggle;
  }

  handleToggle () {
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.checked, event);
    }
  };

  render () {
    const {
      checked,
      disabled,
      className,
      size,
      color
    } = this.props;

    const classNames = cx(
      theme['toggle'],
      className,
      theme[size],
      theme[color],
      {
        [theme['checked']]: checked,
        [theme['disabled']]: disabled,
      }
    );

    return (
      <label data-teamleader-ui="toggle" className={classNames}>
        <input
          className={theme.input}
          type="checkbox"
          checked={checked}
          onClick={this.handleToggle}
          readOnly
        />
        <span className={theme.track}>
          <span className={theme.thumb} />
        </span>
      </label>
    );
  }
}

export default Toggle;
export { Toggle };
