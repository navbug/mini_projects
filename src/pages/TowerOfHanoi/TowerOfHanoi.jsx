import React, { useState, useEffect } from "react";
import Tower from "./Tower";

const TowerOfHanoi = () => {
  const [numDisks, setNumDisks] = useState(3);
  const [towers, setTowers] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedDisk, setDraggedDisk] = useState(null);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    initializeTowers();
  }, [numDisks]);

  const initializeTowers = () => {
    const newTowers = [
      Array.from({ length: numDisks }, (_, i) => numDisks - i),
      [],
      [],
    ];
    setTowers(newTowers);
    setMoves(0);
    setHasWon(false);
  };

  const handleDiskNumChange = (e) => {
    const newNumDisks = parseInt(e.target.value);
    if (newNumDisks >= 3 && newNumDisks <= 8) {
      setNumDisks(newNumDisks);
    }
  };

  const checkWinCondition = (newTowers) => {
    if(newTowers[2].length === numDisks) {
      setHasWon(true);
    }
  }

  const handleDragStart = (disk, towerIndex) => {
    if (towers[towerIndex][towers[towerIndex].length - 1] === disk) {
      setIsDragging(true);
      setDraggedDisk({ disk, fromTower: towerIndex });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (toTower) => {
    if (isDragging && draggedDisk) {
      const { disk, fromTower } = draggedDisk;
      if (
        fromTower !== toTower &&
        (towers[toTower].length === 0 ||
          towers[toTower][towers[toTower].length - 1] > disk)
      ) {
        const newTowers = towers.map((tower, index) => {
          if (index === fromTower) {
            return tower.slice(0, -1);
          } else if (index === toTower) {
            return [...tower, disk];
          }
          return tower;
        });
        checkWinCondition(newTowers);
        setTowers(newTowers);
        setMoves(moves + 1);
      }
      setIsDragging(false);
      setDraggedDisk(null);
    }
  };

  const solve = () => {
    //Reset game first
    initializeTowers();
    
    const solveTowers = (n, source, auxiliary, target) => {
      if (n > 0) {
        solveTowers(n - 1, source, target, auxiliary);
        moveDisk(source, target);
        solveTowers(n - 1, auxiliary, source, target);
      }
    };

    const moveDisk = (fromTower, toTower) => {
      setTowers((prevTowers) => {
        const newTowers = prevTowers.map((tower) => [...tower]);
        const disk = newTowers[fromTower].pop();
        newTowers[toTower].push(disk);
        return newTowers;
      });
      setMoves((prevMoves) => prevMoves + 1);
    };

    const animateMove = (moves, index = 0) => {
      if (index < moves.length) {
        const [fromTower, toTower] = moves[index];
        moveDisk(fromTower, toTower);
        setTimeout(() => animateMove(moves, index + 1), 1000);
      }
    };

    const generateMoves = (n, source, auxiliary, target, moves = []) => {
      if (n > 0) {
        generateMoves(n - 1, source, target, auxiliary, moves);
        moves.push([source, target]);
        generateMoves(n - 1, auxiliary, source, target, moves);
      }
      return moves;
    };

    const moves = generateMoves(numDisks, 0, 1, 2);
    animateMove(moves);
  };

  const restart = () => {
    initializeTowers();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Tower of Hanoi</h1>
      <div className="mb-4">
        <label htmlFor="diskNum" className="mr-2">
          Number of Disks:
        </label>
        <input
          id="diskNum"
          type="number"
          min="3"
          max="8"
          value={numDisks}
          onChange={handleDiskNumChange}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="flex justify-center mb-8">
        {towers.map((tower, index) => (
          <Tower
            key={index}
            disks={tower}
            onDragStart={(disk) => handleDragStart(disk, index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          />
        ))}
      </div>
      <div className="mb-4">Moves: {moves}</div>
      <div>
        <button
          onClick={solve}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Solve
        </button>
        <button
          onClick={restart}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Restart
        </button>
      </div>
      {hasWon && (
        <div className="mt-8 text-2xl font-bold text-green-600 animate-bounce">
          Congratulations! You've won the game!
        </div>
      )}
    </div>
  );
};

export default TowerOfHanoi;
