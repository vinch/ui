import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import theme from './theme.css';
import cx from 'classnames';
import omit from 'lodash.omit';
import Box, { omitBoxProps, pickBoxProps } from '../box';
import { TextBody, TextDisplay, TextSmall } from '../typography';

class Toggle extends PureComponent {
  handleToggle = event => {
    const { disabled, checked, onChange } = this.props;

    if (event.pageX !== 0 && event.pageY !== 0) {
      this.blur();
    }

    if (!disabled && onChange) {
      onChange(!checked, event);
    }
  };

  blur() {
    if (this.inputNode) {
      this.inputNode.blur();
    }
  }

  focus() {
    if (this.inputNode) {
      this.inputNode.focus();
    }
  }

  render() {
    const { checked, disabled, className, size, label, children, ...others } = this.props;

    const restProps = omit(others, ['onChange']);
    const boxProps = pickBoxProps(restProps);
    const inputProps = omitBoxProps(restProps);

    const classNames = cx(
      theme['toggle'],
      theme[`is-${size}`],
      {
        [theme['is-checked']]: checked,
        [theme['is-disabled']]: disabled,
      },
      className,
    );

    const TextElement = size === 'small' ? TextSmall : size === 'medium' ? TextBody : TextDisplay;

    return (
      <Box element="label" data-teamleader-ui="toggle" className={classNames} {...boxProps}>
        <input
          className={theme['input']}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onClick={this.handleToggle}
          ref={node => {
            this.inputNode = node;
          }}
          readOnly
          {...inputProps}
        />
        <span className={theme['track']}>
          <span className={theme['thumb']} />
        </span>
        {(label || children) && (
          <span className={theme['label']}>
            {label && (
              <TextElement element="span" color={disabled ? 'neutral' : 'teal'}>
                {label}
              </TextElement>
            )}
            {children}
          </span>
        )}
      </Box>
    );
  }
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  size: 'medium',
};

export default Toggle;
