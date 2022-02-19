import React, { useState, useEffect, useRef } from 'react';
import './style.scss';

const Solution = () => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const topRef = useRef(0);
  const leftRef = useRef(0);
  const movesRef = useRef(11);
  const [movesLeft, setMovesLeft] = useState(11);

  const isLeftGray = (leftPosition: number, topPosition: number) => {
    return (leftPosition === 2 && topPosition === 1) || (leftPosition === 2 && topPosition === 2) || (leftPosition === 2 && topPosition === 4);
  };

  const isTopGray = (leftPosition: number, topPosition: number) => {
    return (leftPosition === 0 && topPosition === 3) || (leftPosition === 1 && topPosition === 3) || (leftPosition === 3 && topPosition === 4);
  };

  const isRightGray = (leftPosition: number, topPosition: number) => {
    return (leftPosition === 2 && topPosition === 1) || (leftPosition === 2 && topPosition === 2) || (leftPosition === 2 && topPosition === 3);
  };

  const isBottomGray = (leftPosition: number, topPosition: number) => {
    return (
      (leftPosition === 0 && topPosition === 0) ||
      (leftPosition === 1 && topPosition === 0) ||
      (leftPosition === 3 && topPosition === 0) ||
      (leftPosition === 4 && topPosition === 0) ||
      (leftPosition === 0 && topPosition === 3) ||
      (leftPosition === 1 && topPosition === 3)
    );
  };

  const handleKeyDown = (event: any) => {
    if ((!(leftRef.current === 4 && topRef.current === 4) || movesLeft === 0) && movesRef.current !== 0) {
      switch (event.keyCode) {
        case 37:
          if (leftRef.current - 1 >= 0 && !isLeftGray(leftRef.current, topRef.current)) {
            setLeft(left => left - 1);
            leftRef.current = leftRef.current - 1;
          }
          break;
        case 38:
          if (topRef.current - 1 >= 0 && !isTopGray(leftRef.current, topRef.current)) {
            setTop(top => top - 1);
            topRef.current = topRef.current - 1;
          }
          break;
        case 39:
          if (leftRef.current + 1 <= 4 && !isRightGray(leftRef.current, topRef.current)) {
            setLeft(left => left + 1);
            leftRef.current = leftRef.current + 1;
          }
          break;
        case 40:
          if (topRef.current + 1 <= 4 && !isBottomGray(leftRef.current, topRef.current)) {
            setTop(top => top + 1);
            topRef.current = topRef.current + 1;
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (movesLeft !== 0) {
      setMovesLeft(prev => prev - 1);
      movesRef.current = movesRef.current - 1;
    }
  }, [top, left]);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyDown);
    return () => {
      document.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  return (
    <div className="puzzle">
      <div className="dot-box" style={{ top: `${top * 100}px`, left: `${left * 100}px` }}>
        <div className="dot"></div>
      </div>
      <div className="progress">
        <div>
          {((left === 4 && top === 4) || movesLeft === 0) && (
            <div className="result">{left === 4 && top === 4 && movesLeft !== 0 ? <p className="win">You Won</p> : <p className="lose">You Lose</p>}</div>
          )}
        </div>
        <p>Moves Left {movesLeft}</p>
      </div>

      <div className="start"></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div className="gray"></div>
      <div className="gray"></div>
      <div></div>
      <div className="gray"></div>
      <div className="gray"></div>

      <div className="gray"></div>
      <div className="gray"></div>
      <div></div>
      <div className="gray"></div>
      <div className="gray"></div>

      <div></div>
      <div></div>
      <div></div>
      <div className="gray"></div>
      <div className="gray"></div>

      <div className="gray"></div>
      <div className="gray"></div>
      <div></div>
      <div></div>
      <div className="last"></div>
    </div>
  );
};

export default Solution;
