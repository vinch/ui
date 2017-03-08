import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { MENU } from '../identifiers.js';
import FontIcon from '../font_icon/FontIcon.js';

const factory = () => {
  class MenuItem extends Component {
    static propTypes = {
      caption: PropTypes.string,
      children: PropTypes.any,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      onClick: PropTypes.func,
      selected: PropTypes.bool,
      shortcut: PropTypes.string,
      theme: PropTypes.shape({
        caption: PropTypes.string,
        disabled: PropTypes.string,
        icon: PropTypes.string,
        menuItem: PropTypes.string,
        selected: PropTypes.string,
        shortcut: PropTypes.string,
      }),
    };

    static defaultProps = {
      className: '',
      disabled: false,
      selected: false,
    };

    handleClick = (event) => {
      if (this.props.onClick && !this.props.disabled) {
        this.props.onClick(event, this);
      }
    };

    render () {
      const {
        icon,
        caption,
        children,
        shortcut,
        selected,
        disabled,
        theme,
        ...others
      } = this.props;

      const className = classnames(
        theme.menuItem,
        {
          [theme.selected]: selected,
          [theme.disabled]: disabled,
        },
        this.props.className
      );

      return (
        <li {...others} data-teamleader-ui="menu-item" className={className} onClick={this.handleClick}>
          {icon ? <FontIcon value={icon} className={theme.icon} /> : null}
          <span className={theme.caption}>{caption}</span>
          {shortcut ? <small className={theme.shortcut}>{shortcut}</small> : null}
          {children}
        </li>
      );
    }
  }

  return MenuItem;
};

const MenuItem = factory();
export default themr(MENU)(MenuItem);
export { factory as menuItemFactory };
export { MenuItem };
