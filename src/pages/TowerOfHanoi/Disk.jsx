import React, { memo } from 'react';

const Disk = memo(({ size, onDragStart }) => {
  const width = `${size * 10 + 20}%`;
  const backgroundColor = `hsl(${size * 30}, 70%, 50%)`;

  return (
    <div
      className="h-6 rounded-full cursor-move transition-all duration-300 ease-in-out"
      style={{ width, backgroundColor }}
      draggable
      onDragStart={onDragStart}
    ></div>
  );
});

export default Disk;