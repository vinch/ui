import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/*
  Not really the outcome that I wanted (the WrappedComponents still have to apply the tintClassName),
  but might still be interesting: decoupled propType, defaultProp declaration and classname string construction
  Thought about maybe leveraging the CSS modules for this (as we import an object),
  but then we need to dynamically load CSS files
  (e.g.: WrappedComponent === LoadingSpinner => load ../components/loadingSpinner/theme.css)
*/

const injectTint = WrappedComponent => {
  return class extends PureComponent {
    static propTypes = {
      tint: PropTypes.oneOf(['lightest', 'light', 'normal', 'dark', 'darkest']),
    };

    static defaultProps = {
      tint: 'normal',
    };

    render() {
      const { tint, ...others } = this.props;
      return <WrappedComponent tintClassName={`is-${tint}`} {...others} />;
    }
  };
};

export default injectTint;
