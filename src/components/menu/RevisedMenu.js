import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.js';
import Popover from '../popover';

class Menu extends PureComponent {
  handleSelect = (item, event) => {
    const { onSelect } = this.props;
    const { value, onClick } = item.props;

    if (onSelect) {
      onSelect(value);
    }

    if (onClick) {
      event.persist();
      onClick(event);
    }
  };

  getItems = (children, selectable, selected) => {
    // Because React Hot Loader creates proxied versions of your components,
    // comparing reference types of elements won't work
    // https://github.com/gaearon/react-hot-loader/blob/master/docs/Known%20Limitations.md#checking-element-types
    const MenuItemType = <MenuItem />.type;

    return React.Children.map(children, item => {
      if (!item) {
        return item;
      }

      if (item.type === MenuItemType) {
        return React.cloneElement(item, {
          selected: typeof item.props.value !== 'undefined' && selectable && item.props.value === selected,
          onClick: this.handleSelect.bind(this, item),
        });
      } else {
        return React.cloneElement(item);
      }
    });
  };

  render() {
    const { children, selectable, selected, ...others } = this.props;
    return <Popover {...others}>{this.getItems(children, selectable, selected)}</Popover>;
  }
}

Menu.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  onHide: PropTypes.func,
  onSelect: PropTypes.func,
  onShow: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.any,
};

Menu.defaultProps = {
  active: false,
  selectable: true,
};

export default Menu;
