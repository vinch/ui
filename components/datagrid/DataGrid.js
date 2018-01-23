import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Box from '../box';
import Cell from './Cell';
import HeaderCell from './HeaderCell';
import isComponentOfType from '../utils/is-component-of-type';
import FooterRow from './FooterRow';
import HeaderRow from './HeaderRow';
import BodyRow from './BodyRow';
import cx from 'classnames';
import omit from 'lodash.omit';
import theme from './theme.css';

class DataGrid extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    comparableId: PropTypes.any,
    selectable: PropTypes.bool,
    stickyFromLeft: PropTypes.number,
    stickyFromRight: PropTypes.number,
    onSelectionChange: PropTypes.func,
  };

  constructor() {
    super(...arguments);

    this.handleBodyRowSelectionChange = ::this.handleBodyRowSelectionChange;
    this.handleHeaderRowSelectionChange = ::this.handleHeaderRowSelectionChange;

    this.rowNodes = new Map();

    this.state = {
      selectedRows: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comparableId !== this.props.comparableId) {
      this.setState({
        selectedRows: [],
      });
    }
  }

  componentDidUpdate() {
    this.setCalculatedRowWidth();
  }

  handleHeaderRowSelectionChange(value) {
    const allBodyRowIndexes = React.Children.map(this.props.children, child => {
      if (isComponentOfType(BodyRow, child)) {
        return child.key;
      }
    });

    const selectedBodyRowIndexes = value ? allBodyRowIndexes : [];

    this.setState({
      selectedRows: selectedBodyRowIndexes,
    });

    this.props.onSelectionChange(selectedBodyRowIndexes);
  }

  handleBodyRowSelectionChange(rowIndex) {
    this.setState(prevState => {
      const selectedRows = prevState.selectedRows.includes(rowIndex)
        ? prevState.selectedRows.filter(row => row !== rowIndex)
        : [...prevState.selectedRows, rowIndex];

      this.props.onSelectionChange(selectedRows);

      return {
        ...prevState,
        selectedRows,
      };
    });
  }

  setCalculatedRowWidth() {
    const rowDOMNodes = [];
    let maxRowWidth = 0;

    Array.from(this.rowNodes.values())
      .filter(rowNode => rowNode != null)
      .forEach(rowNode => {
        const rowDOMNode = ReactDOM.findDOMNode(rowNode);
        const totalRowChildrenWidth = Array.from(rowDOMNode.children)
          .map(child => child.offsetWidth)
          .reduce((accumulatedChildWidth, currentChildWidth) => accumulatedChildWidth + currentChildWidth);

        maxRowWidth = maxRowWidth < totalRowChildrenWidth ? totalRowChildrenWidth : maxRowWidth;
        rowDOMNodes.push(rowDOMNode);
      });

    rowDOMNodes.forEach(rowDOMNode => (rowDOMNode.style.minWidth = `${maxRowWidth}px`));
  }

  render() {
    const { children, className, selectable, stickyFromLeft, stickyFromRight, ...others } = this.props;
    const { selectedRows } = this.state;

    const classNames = cx(theme['data-grid'], className);
    const rest = omit(others, ['comparableId', 'onSelectionChange']);

    const sectionLeftClassNames = cx(theme['section'], theme['is-sticky-left'], {
      [theme['has-blend-right']]: selectable || stickyFromLeft > 0,
      [theme['has-border-right']]: selectable || stickyFromLeft > 0,
    });

    return (
      <Box data-teamleader-ui="data-grid" className={classNames} {...rest}>
        {(selectable || stickyFromLeft > 0) && (
          <div className={sectionLeftClassNames}>
            {React.Children.map(children, child => {
              if (isComponentOfType(HeaderRow, child)) {
                return React.cloneElement(child, {
                  onSelectionChange: event => this.handleHeaderRowSelectionChange(event),
                  selected: selectedRows.length === children[1].length,
                  selectable,
                  sliceTo: stickyFromLeft > 0 ? stickyFromLeft : 0,
                });
              } else if (isComponentOfType(BodyRow, child)) {
                return React.cloneElement(child, {
                  onSelectionChange: () => this.handleBodyRowSelectionChange(child.key),
                  selected: selectedRows.indexOf(child.key) !== -1,
                  selectable,
                  sliceTo: stickyFromLeft > 0 ? stickyFromLeft : 0,
                });
              } else if (isComponentOfType(FooterRow, child)) {
                return React.cloneElement(child, {
                  preserveSelectableSpace: selectable,
                  sliceTo: stickyFromLeft > 0 ? stickyFromLeft : 0,
                });
              }
            })}
          </div>
        )}

        <div className={cx(theme['section'], theme['is-scrollable'])}>
          {React.Children.map(children, (child, key) => {
            return React.cloneElement(child, {
              sliceFrom: stickyFromLeft > 0 ? stickyFromLeft : 0,
              sliceTo: stickyFromRight > 0 ? -stickyFromRight : undefined,
              ref: rowNode => this.rowNodes.set(key, rowNode),
            });
          })}
        </div>

        {stickyFromRight > 0 && (
          <div className={cx(theme['section'], theme['has-blend-left'])}>
            {React.Children.map(children, child => {
              return React.cloneElement(child, {
                sliceFrom: -stickyFromRight,
              });
            })}
          </div>
        )}
      </Box>
    );
  }
}

DataGrid.HeaderRow = HeaderRow;
DataGrid.HeaderCell = HeaderCell;
DataGrid.BodyRow = BodyRow;
DataGrid.Cell = Cell;
DataGrid.FooterRow = FooterRow;

export default DataGrid;
