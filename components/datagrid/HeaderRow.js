import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import HeaderCell from './HeaderCell';
import Checkbox from '../checkbox';
import cx from 'classnames';
import theme from './theme.css';

class HeaderRow extends PureComponent {
  render() {
    const {
      className,
      checkboxSize,
      children,
      numSelectedRows,
      sliceFrom,
      sliceTo,
      onSelectionChange,
      selected,
      selectable,
      ...others
    } = this.props;

    const childrenArray = Array.isArray(children) ? children : [children];
    const childrenSliced = childrenArray.slice(sliceFrom, sliceTo);
    const classNames = cx(theme['header-row'], className);

    console.log(`${numSelectedRows} selected`);

    return (
      <Row backgroundColor="neutral" className={classNames} data-teamleader-ui="datagrid-header-row" {...others}>
        {selectable && (
          <HeaderCell align="center" flex="min-width">
            <Checkbox checked={selected} onChange={onSelectionChange} size={checkboxSize} />
          </HeaderCell>
        )}
        {childrenSliced}
      </Row>
    );
  }
}

HeaderRow.propTypes = {
  checkboxSize: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  children: PropTypes.any,
  numSelectedRows: PropTypes.number,
  onSelectionChange: PropTypes.func,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  sliceFrom: PropTypes.number,
  sliceTo: PropTypes.number,
};

HeaderRow.defaultProps = {
  numSelectedRows: 0,
};

export default HeaderRow;
