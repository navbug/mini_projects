import React from 'react';
import Disk from './Disk';

const Tower = ({ disks, onDragStart, onDragOver, onDrop }) => {
  return (
    <div
      className="flex flex-col-reverse items-center justify-start w-40 h-60 mx-4 border-b-4 border-gray-800 bg-gray-200"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {disks.map((size, index) => (
        <Disk key={index} size={size} onDragStart={() => onDragStart(size)} />
      ))}
    </div>
  );
};

export default Tower;