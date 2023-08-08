// src/components/Tile.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants';

const Tile = ({ id, value }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TILE,
    item: { id, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const tileStyle = {
    backgroundColor: 'blue', // Change the background color to blue
    border: '1px solid black',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '36px',
  };

  return (
    <div
      className="cell"
      ref={drag}
      style={{
        ...tileStyle,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {value}
    </div>
  );
};

export default Tile;
