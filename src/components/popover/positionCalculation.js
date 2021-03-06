const ARROW_OFFSET = 7;
const POPUP_OFFSET = 12;

const POSITION_START = 'start';
const POSITION_CENTER = 'center';
const POSITION_END = 'end';

const DIRECTION_NORTH = 'north';
const DIRECTION_EAST = 'east';
const DIRECTION_SOUTH = 'south';
const DIRECTION_WEST = 'west';

const getElementPositionValues = element => {
  const { top, left, right, bottom } = element.getBoundingClientRect();

  return {
    top,
    left,
    right,
    bottom,
    centerY: top + (bottom - top) / 2,
    centerX: left + (right - left) / 2,
  };
};

const getElementDimensionValues = element => {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
};

const getVerticalDirectionPositionValues = ({
  direction,
  position,
  anchorPosition,
  popoverDimensions,
  inputOffsetCorrection,
}) => ({
  top: getVerticalDirectionPositionTopValue({
    direction,
    anchorPosition,
    popoverDimensions,
  }),
  arrowTop: getVerticalDirectionArrowPositionTopValue({ direction, popoverDimensions }),
  left: getVerticalDirectionPositionLeftValue({
    position,
    anchorPosition,
    popoverDimensions,
    inputOffsetCorrection,
  }),
  arrowLeft: getVerticalDirectionArrowPositionLeftValue({ position, popoverDimensions }),
});

const getHorizontalDirectionPositionValues = ({
  direction,
  position,
  anchorPosition,
  popoverDimensions,
  inputOffsetCorrection,
}) => ({
  top: getHorizontalDirectionPositionTopValue({
    position,
    anchorPosition,
    popoverDimensions,
    inputOffsetCorrection,
  }),
  arrowTop: getHorizontalDirectionArrowPositionTopValue({ position, popoverDimensions }),
  left: getHorizontalDirectionPositionLeftValue({ direction, anchorPosition, popoverDimensions }),
  arrowLeft: getHorizontalDirectionArrowPositionLeftValue({
    direction,
    anchorPosition,
    popoverDimensions,
  }),
});

const getPositionValues = ({ direction, position, anchorPosition, popoverDimensions, inputOffsetCorrection }) =>
  direction === DIRECTION_NORTH || direction === DIRECTION_SOUTH
    ? getVerticalDirectionPositionValues({
        direction,
        position,
        anchorPosition,
        popoverDimensions,
        inputOffsetCorrection,
      })
    : getHorizontalDirectionPositionValues({
        direction,
        position,
        anchorPosition,
        popoverDimensions,
        inputOffsetCorrection,
      });

// HORIZONTAL
const getHorizontalDirectionPositionTopValue = ({
  position,
  anchorPosition,
  popoverDimensions,
  inputOffsetCorrection,
}) => {
  switch (position) {
    case POSITION_CENTER:
      return anchorPosition.centerY - popoverDimensions.height / 2;
    case POSITION_START:
      return anchorPosition.top - POPUP_OFFSET * 0.75 - inputOffsetCorrection;
    case POSITION_END:
      return anchorPosition.bottom - popoverDimensions.height + POPUP_OFFSET * 0.75 + inputOffsetCorrection;
  }
};

const getHorizontalDirectionPositionLeftValue = ({ direction, anchorPosition, popoverDimensions }) =>
  direction === DIRECTION_WEST
    ? anchorPosition.left - popoverDimensions.width - POPUP_OFFSET
    : anchorPosition.right + POPUP_OFFSET;

const getHorizontalDirectionArrowPositionTopValue = ({ position, popoverDimensions }) => {
  switch (position) {
    case POSITION_CENTER:
      return popoverDimensions.height / 2 - ARROW_OFFSET;
    case POSITION_START:
      return ARROW_OFFSET * 2.35;
    case POSITION_END:
      return popoverDimensions.height - ARROW_OFFSET * 4.5;
  }
};

const getHorizontalDirectionArrowPositionLeftValue = ({ direction, popoverDimensions }) =>
  direction === DIRECTION_WEST ? popoverDimensions.width - ARROW_OFFSET : -ARROW_OFFSET;

// VERTICAL
const getVerticalDirectionPositionTopValue = ({ direction, anchorPosition, popoverDimensions }) =>
  direction === DIRECTION_NORTH
    ? anchorPosition.top - popoverDimensions.height - POPUP_OFFSET
    : anchorPosition.bottom + POPUP_OFFSET;

const getVerticalDirectionPositionLeftValue = ({
  position,
  anchorPosition,
  popoverDimensions,
  inputOffsetCorrection,
}) => {
  switch (position) {
    case POSITION_CENTER:
      return anchorPosition.centerX - popoverDimensions.width / 2;
    case POSITION_START:
      return anchorPosition.left - inputOffsetCorrection;
    case POSITION_END:
      return anchorPosition.right - popoverDimensions.width + inputOffsetCorrection;
  }
};

const getVerticalDirectionArrowPositionTopValue = ({ direction, popoverDimensions }) =>
  direction === DIRECTION_NORTH ? popoverDimensions.height - ARROW_OFFSET : -ARROW_OFFSET;

const getVerticalDirectionArrowPositionLeftValue = ({ position, popoverDimensions }) => {
  switch (position) {
    case POSITION_CENTER:
      return popoverDimensions.width / 2 - ARROW_OFFSET;
    case POSITION_START:
      return 2 * POPUP_OFFSET;
    case POSITION_END:
      return popoverDimensions.width - POPUP_OFFSET * 3;
  }
};

const isInViewport = ({ direction, anchorPosition, popoverDimensions }) => {
  switch (direction) {
    case DIRECTION_NORTH:
      return anchorPosition.top - popoverDimensions.height - POPUP_OFFSET > 0;
    case DIRECTION_SOUTH:
      return anchorPosition.bottom + popoverDimensions.height + POPUP_OFFSET < window.innerHeight;
    case DIRECTION_EAST:
      return anchorPosition.right + popoverDimensions.width + POPUP_OFFSET < window.innerWidth;
    case DIRECTION_WEST:
      return anchorPosition.left - popoverDimensions.width - POPUP_OFFSET > 0;
  }
};

const getOppositeDirection = direction => {
  switch (direction) {
    case DIRECTION_NORTH:
      return DIRECTION_SOUTH;
    case DIRECTION_SOUTH:
      return DIRECTION_NORTH;
    case DIRECTION_EAST:
      return DIRECTION_WEST;
    case DIRECTION_WEST:
      return DIRECTION_EAST;
  }
};

const getDirection = ({ direction, anchorPosition, popoverDimensions }) => {
  const inputDirectionRendersOnScreen = isInViewport({ direction, anchorPosition, popoverDimensions });
  const oppositeDirectionRendersOnScreen = isInViewport({
    direction: getOppositeDirection(direction),
    anchorPosition,
    popoverDimensions,
  });

  return !inputDirectionRendersOnScreen && oppositeDirectionRendersOnScreen
    ? getOppositeDirection(direction)
    : direction;
};

const isPositionPossible = (direction, position, anchorPosition, popoverDimensions) =>
  direction === DIRECTION_NORTH || direction === DIRECTION_SOUTH
    ? isVerticalDirectionPositionPossible(position, anchorPosition, popoverDimensions)
    : isHorizontalDirectionPositionPossible(position, anchorPosition, popoverDimensions);

const isVerticalDirectionPositionPossible = (position, anchorPosition, popoverDimensions) => {
  switch (position) {
    case POSITION_CENTER:
      return (
        anchorPosition.centerY + popoverDimensions.height / 2 < window.innerHeight &&
        anchorPosition.centerY - popoverDimensions.height / 2 > 0
      );
    case POSITION_START:
      return anchorPosition.top + popoverDimensions.height < window.innerHeight;
    case POSITION_END:
      return anchorPosition.bottom - popoverDimensions.height > 0;
  }
};

const isHorizontalDirectionPositionPossible = (position, anchorPosition, popoverDimensions) => {
  switch (position) {
    case POSITION_CENTER:
      return (
        anchorPosition.centerX + popoverDimensions.width / 2 < window.innerWidth &&
        anchorPosition.centerX - popoverDimensions.width / 2 > 0
      );
    case POSITION_START:
      return anchorPosition.left + popoverDimensions.width < window.innerWidth;
    case POSITION_END:
      return anchorPosition.right - popoverDimensions.width > 0;
  }
};

const getOppositePosition = direction => {
  switch (direction) {
    case POSITION_START:
      return POSITION_END;
    case POSITION_END:
      return POSITION_START;
  }
};

const getPosition = ({ direction, position, anchorPosition, popoverDimensions }) => {
  if (isPositionPossible(position, anchorPosition, popoverDimensions)) {
    return position;
  }

  switch (position) {
    case POSITION_CENTER:
      return isPositionPossible(POSITION_START, anchorPosition, popoverDimensions)
        ? POSITION_START
        : isPositionPossible(POSITION_END, anchorPosition, popoverDimensions)
          ? POSITION_END
          : position;
    default:
      return isPositionPossible(POSITION_CENTER, anchorPosition, popoverDimensions)
        ? POSITION_CENTER
        : getOppositePosition(position);
  }
};

const getMaxHeightValue = ({ direction, anchorPosition }) => {
  switch (direction) {
    case DIRECTION_NORTH:
      return anchorPosition.top - POPUP_OFFSET * 2;
    case DIRECTION_SOUTH:
      return window.innerHeight - anchorPosition.bottom - POPUP_OFFSET * 2;
  }
};

export const calculatePositions = (anchorEl, popoverEl, inputDirection, inputPosition, inputOffsetCorrection) => {
  const anchorPosition = getElementPositionValues(anchorEl);
  const popoverDimensions = getElementDimensionValues(popoverEl);

  const direction = getDirection({ direction: inputDirection, anchorPosition, popoverDimensions });
  const position = getPosition({ direction, position: inputPosition, anchorPosition, popoverDimensions });

  return {
    maxHeight: getMaxHeightValue({
      direction,
      anchorPosition,
    }),
    ...getPositionValues({
      direction,
      position,
      anchorPosition,
      popoverDimensions,
      inputOffsetCorrection,
    }),
  };
};
