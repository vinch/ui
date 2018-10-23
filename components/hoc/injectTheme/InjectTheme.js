import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const injectTheme = theme => WrappedComponent => {
  return class extends PureComponent {
    static propTypes = {
      /** The color of the component */
      color: PropTypes.PropTypes.oneOf(['aqua', 'gold', 'mint', 'neutral', 'ruby', 'teal', 'violet']),
      /** The size of the component */
      size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'fullscreen']),
      /** The tint of the component */
      tint: PropTypes.oneOf(['lightest', 'light', 'normal', 'dark', 'darkest']),
    };

    static defaultProps = {
      color: 'neutral',
      size: 'medium',
      tint: 'normal',
    };

    render() {
      const { color, size, tint, className, ...others } = this.props;

      const classNames = cx(theme[`is-${color}`], theme[`is-${size}`], theme[`is-${tint}`], className);

      return <WrappedComponent className={classNames} {...others} />;
    }
  };
};

export default injectTheme;
