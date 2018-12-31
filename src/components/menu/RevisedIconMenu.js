import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconMoreMediumOutline } from '@teamleader/ui-icons';
import IconButton from '../button/IconButton.js';
import RevisedMenu from './RevisedMenu.js';
import Box, { omitBoxProps, pickBoxProps } from '../box';

class IconMenu extends PureComponent {
  state = {
    active: false,
    anchorEl: null,
    selected: null,
  };

  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ anchorEl: this.buttonRef.current.buttonNode });
  }

  handleButtonClick = event => {
    this.setState({ active: !this.state.active });
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleMenuHide = () => {
    this.setState({ active: false });
    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  render() {
    const { active, anchorEl, selected } = this.state;
    const { children, icon, onEscKeyUp, onOverlayClick, onSelect, ...others } = this.props;

    const buttonIcon = icon || <IconMoreMediumOutline />;

    return (
      <Box data-teamleader-ui="icon-menu" {...pickBoxProps(others)}>
        <IconButton ref={this.buttonRef} icon={buttonIcon} onClick={this.handleButtonClick} />
        <RevisedMenu
          active={active}
          anchorEl={anchorEl}
          selected={selected}
          onOverlayClick={() => {
            onOverlayClick && onOverlayClick();
            this.handleMenuHide();
          }}
          onEscKeyUp={() => {
            onEscKeyUp && onEscKeyUp();
            this.handleMenuHide();
          }}
          onSelect={value => {
            onSelect && onSelect();
            this.setState({ selected: value });
            this.handleMenuHide();
          }}
          {...omitBoxProps(others)}
        >
          {children}
        </RevisedMenu>
      </Box>
    );
  }
}

IconMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  onHide: PropTypes.func,
  onSelect: PropTypes.func,
  onShow: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.any,
};

IconMenu.defaultProps = {
  className: '',
  selectable: false,
};

export default IconMenu;
