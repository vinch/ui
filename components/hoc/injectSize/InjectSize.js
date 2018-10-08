import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/*
  Not really the outcome that I wanted (the WrappedComponents still have to apply the sizeClassName),
  but might still be interesting: decoupled propType, defaultProp declaration and classname string construction
  Thought about maybe leveraging the CSS modules for this (as we import an object),
  but then we need to dynamically load CSS files
  (e.g.: WrappedComponent === LoadingSpinner => load ../components/loadingSpinner/theme.css)
*/

const injectSize = WrappedComponent => {
  return class extends PureComponent {
    static propTypes = {
      size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'fullscreen']),
    };

    static defaultProps = {
      size: 'medium',
    };

    render() {
      const { size, ...others } = this.props;
      return <WrappedComponent sizeClassName={`is-${size}`} {...others} />;
    }
  };
};

export default injectSize;
