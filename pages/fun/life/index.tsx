/*
Conway's Game of Life
Conway's Game of Life takes place on a two-dimensional board of square cells. Each cell is either dead or alive, and at each tick, the following rules apply:
    Any live cell with less than two live neighbors dies.
    Any live cell with two or three live neighbors remains living.
    Any live cell with more than three live neighbors dies.
    Any dead cell with exactly three live neighbors becomes a live cell.
A cell neighbors another cell if it is horizontally, vertically, or diagonally adjacent.
Implement Conway's Game of Life. It should be able to be initialized with a starting list of live cell coordinates and the number of steps it should run for.  You can represent a live cell with an asterisk (*) and a dead cell with a dot (.).

*/

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MainNav from "../../../components/navigation/MainNav";
import { ThemeContext } from "../../../components/context/ThemeContext";
import RangeSlider from "react-bootstrap-range-slider";
import Button from "react-bootstrap/Button";

export default function Life({}) {
  const theme = useContext(ThemeContext);
  const [size, setSize] = useState<number>(10);
  const [intervals, setIntervalCount] = useState<number>(10);
  const [running, setRunning] = useState(false);

  const Controls = () => {
    return (
      <div
        style={{
          paddingTop: 50,
          width: 500,
          margin: "auto",
          color: theme.textColor,
          display: "grid",
          gridTemplateColumns: `repeat(2, 1fr)`,
        }}
      >
        Size:{"       "}
        <RangeSlider
          value={size}
          onChange={(e) => setSize(+e.target.value)}
          min={3}
          max={100}
        />
        Intervals:{" "}
        <RangeSlider
          value={intervals}
          onChange={(e) => setIntervalCount(+e.target.value)}
          min={3}
          max={100}
        />
        <Button style={{ width: 100 }} onClick={() => setRunning(!running)}>
          {running ? "Stop" : "Start"}
        </Button>
      </div>
    );
  };

  useEffect(() => {
    setRunning(false);
  }, [size, intervals]);

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        height: "100vh",
      }}
    >
      <MainNav />
      <Controls />
      <Game size={size} theme={theme} intervals={intervals} running={running} />
    </div>
  );
}

const Game = ({ size, theme, intervals, running }) => {
  const [count, setCount] = useState<number>(1);

  //Random live and dead cells matrix
  const [cells, setCells] = useState<number[][]>(
    [...Array(size)].map(() =>
      [...Array(size)].map(() => Math.floor(Math.random() * 2))
    )
  );

  useEffect(() => {
    setCount(0);
    setCells(
      [...Array(size)].map(() =>
        [...Array(size)].map(() => Math.floor(Math.random() * 2))
      )
    );
  }, [size, intervals, running]);

  //Run once to start
  useEffect(() => {
    const interval = setInterval(() => {
      if (count < intervals && running) {
        setCount(count + 1);
        update();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cells]);

  const update = () => {
    //Create empty matrix for new values
    var newCells: number[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));

    //Loop over board and update cells in newCells
    for (var i: number = 0; i < size; i++) {
      for (var j: number = 0; j < size; j++) {
        var livingNeighbors = 0;
        var value = cells[i][j];
        //Row above
        if (i > 0) {
          for (var a: number = j - 1; a <= j + 1; a++) {
            if (cells[i - 1][a] === 1) {
              livingNeighbors++;
            }
          }
        }
        //Row below
        if (i < size - 1) {
          for (var a: number = j - 1; a <= j + 1; a++) {
            if (cells[i + 1][a] === 1) {
              livingNeighbors++;
            }
          }
        }
        //Same Row Left
        if (j > 0) {
          if (cells[i][j - 1] === 1) {
            livingNeighbors++;
          }
        }
        //Same Row Right
        if (j < size - 1) {
          if (cells[i][j + 1] === 1) {
            livingNeighbors++;
          }
        }
        //Any live cell with less than two live neighbors dies.
        if (value === 1 && livingNeighbors < 2) {
          newCells[i][j] = 0;
        }
        //Any live cell with two or three live neighbors remains living.
        else if (
          value === 1 &&
          (livingNeighbors === 2 || livingNeighbors === 3)
        ) {
          newCells[i][j] = 1;
        }
        //Any live cell with more than three live neighbors dies.
        else if (value === 1 && livingNeighbors > 3) {
          newCells[i][j] = 0;
        }
        //Any dead cell with exactly three live neighbors becomes a live cell.
        else if (value === 0 && livingNeighbors === 3) {
          newCells[i][j] = 1;
        }
      }
    }
    setCells(newCells);
  };

  const Board = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          width: 500,
          height: 500,
          margin: "auto",
          paddingTop: 10,
        }}
      >
        {cells.map((row) =>
          row.map((item) =>
            item === 1 ? (
              <div
                style={{
                  height: `${500 / size}px`,
                  width: `${500 / size}px`,
                  backgroundColor: "aqua",
                }}
              ></div>
            ) : (
              <div
                style={{
                  height: `${500 / size}px`,
                  width: `${500 / size}px`,
                  backgroundColor: "black",
                }}
              ></div>
            )
          )
        )}
      </div>
    );
  };

  const Display = () => {
    return (
      <div
        style={{
          color: theme.textColor,
          margin: "auto",
          paddingTop: 5,
          width: 500,
        }}
      >
        Interval: {count} out of {intervals}
        <br />
        Size: {size} x {size}
      </div>
    );
  };

  return (
    <div>
      <Display />
      <Board />
    </div>
  );
};
