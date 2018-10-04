import React, { PureComponent } from 'react';

const injectColor = WrappedComponent => {
  return class extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default injectColor;
