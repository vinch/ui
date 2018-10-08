import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/*
  Not really the outcome that I wanted (the WrappedComponents still have to apply the colorClassName),
  but might still be interesting: decoupled propType, defaultProp declaration and classname string construction
  Thought about maybe leveraging the CSS modules for this (as we import an object),
  but then we need to dynamically load CSS files
  (e.g.: WrappedComponent === LoadingSpinner => load ../components/loadingSpinner/theme.css)
*/

const injectColor = WrappedComponent => {
  return class extends PureComponent {
    static propTypes = {
      color: PropTypes.PropTypes.oneOf(['aqua', 'gold', 'mint', 'neutral', 'ruby', 'teal', 'violet']),
    };

    static defaultProps = {
      color: 'neutral',
    };

    render() {
      const { color, ...others } = this.props;
      return <WrappedComponent colorClassName={`is-${color}`} {...others} />;
    }
  };
};

export default injectColor;
