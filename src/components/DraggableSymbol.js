// src/components/DraggableSymbol.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants';

const DraggableSymbol = ({ symbol }) => {
  const [, drag] = useDrag({
    type: ItemTypes.TILE,
    item: { symbol },
  });

  return (
    <div className="draggable-symbol" ref={drag}>
      {symbol}
    </div>
  );
};

export default DraggableSymbol;
