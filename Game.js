import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
import { route } from "@react-navigation/native";

export default function Game({
  navigation,
  single,
  setSingle,
  darkMode,
  setDarkMode,
  animation,
  setAnimation,
  soundEffects,
  setSoundEffects
}) {
  const [player, setPlayer] = useState("Player: X");
  
  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  if (single) {
    console.log("Single Player Mode");
  } else {
    console.log("Two player Mode");
  }


  let scores = {
    X: 1,
    O: -1,
    tie: 0,
  }

  const minimax = (newGrid,) => {
   let result = checkWinner(newGrid, "AI");

  };

  const aiPosition = (newGrid, depth, isMaximising) => {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === "") {
          newGrid[i][j] = "O";
          let score = minimax(grid,0, true);
          newGrid[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = [i, j];
          }
        }
      }
    }
    console.log("Best Move: " + bestMove);
    return bestMove;
  };

  const Press = (event, row, col) => {
    if (winState == true) {
      newGame();
      return;
    }

    if (single) {
      if (grid[row][col] === "") {
        console.log("Going in Player if statement");
        if (player === "Player: X") {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((r) => [...r]); // Copy grid
            newGrid[row][col] = "X";
            checkWinner(newGrid, "Player X");
            return newGrid;
          });
          setPlayer("Player: O");
        } else if (player === "Player: O") {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((r) => [...r]); // Copy grid
            newGrid[row][col] = "O";
            checkWinner(newGrid, "Player O");
            return newGrid;
          });
          setPlayer("Player: X");
        }
      } else {
        if (gridFull()) {
          console.log("Grid is full");
          reset();
        } else {
          console.log("Click another cell");
        }
      }
    } else {
      console.log("Robot Mode in else statement");
      if (grid[row][col] === "") {
        console.log("Going in AI if statement");
        setGrid((prev) => {
          const newGrid = prev.map((r) => [...r]);
          newGrid[row][col] = "X";
          checkWinner(newGrid, "Player");
          // now AI move
          const [r, c] = aiPosition(newGrid);
          // console.log("AI Move: " + r + " " + c);
          // newGrid[r][c] = "O";
          // checkWinner(newGrid, "AI");
          return newGrid;
        });
      } else {
        if (gridFull()) {
          console.log("Grid is full");
          reset();
        } else {
          console.log("Click another cell");
        }
      }

    }
  };

  const checkWinner = (newGrid, play) => {
    // console.log("Checking for winner");
    // Check
    // console.log(` Type of Grid: ${typeof newGrid}`);
    let winner = false;
    for (let i = 0; i < 3; i++) {
      // console.log(newGrid[i][0]);
      if (
        newGrid[i][0] !== "" &&
        newGrid[i][0] === newGrid[i][1] &&
        newGrid[i][1] === newGrid[i][2]
      ) {
        // console.log("Row win detected");
        winner = true;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        newGrid[0][i] !== "" &&
        newGrid[0][i] === newGrid[1][i] &&
        newGrid[1][i] === newGrid[2][i]
      ) {
        // console.log("Column win detected");

        winner = true;
      }
    }

    // Check diagonals
    if (
      newGrid[0][0] !== "" &&
      newGrid[0][0] === newGrid[1][1] &&
      newGrid[1][1] === newGrid[2][2]
    ) {
      console.log("Diagonal win detected");

      winner = true;
    }
    if (
      newGrid[0][2] !== "" &&
      newGrid[0][2] === newGrid[1][1] &&
      newGrid[1][1] === newGrid[2][0]
    ) {
      console.log("Diagonal win detected");
      winner = true;
    }

    if (winner) {
      return true;
    } else {
      return false;
    }
  };

  const gridFull = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === "") {
          return false;
        } else {
          // console.log("Grid is not full");
          // console.log(`Grid[${i}][${j}] = ${grid[i][j]}`);
        }
      }
    }
    return true;
  };

  const reset = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  const newGame = () => {
    reset();
    setPlayer("Player: X");
  };

  const Easy = () => {
    var list = [];
    var num = 0;
    for (let i = 0; i < 3; i++) {
      var rows = [];
      for (let j = 0; j < 3; j++) {
        var adjustcss = [];
        adjustcss.push(styles.box);

        if (i < 3 && j < 2) {
          adjustcss.push(styles.rightBorder);
        }
        if (j < 2 && i < 2) {
          adjustcss.push(styles.bottomBorder);
        }
        if (i == 0 && j == 2) {
          adjustcss.push(styles.bottomBorder);
        }
        if (i == 1 && j == 2) {
          adjustcss.push(styles.bottomBorder);
        }
        rows.push(
          <TouchableOpacity
            onPress={(event, row = i, col = j) => Press(event, row, col)}
          >
            <View style={adjustcss}>
              <Text style={styles.item}>{grid[i][j]}</Text>
            </View>
          </TouchableOpacity>
        );
        num += 1;
      }
      list.push(<Row keys={i}>{rows}</Row>);
      // console.log(list);
    }
    return list;
  };

  const goHome = () => {
    navigation.navigate("Home");
    reset();
  };

  const Row = ({ children }) => <View style={styles.row}>{children}</View>;

  return (
    <View key="24234" style={styles.container}>
      <Text key={2} style={styles.title}>
        Tic Tac Toe
      </Text>
      <View style={styles.playerAndGrid}>
        <Text style={styles.player}>{player}</Text>
        <View style={styles.grid}>
          <Easy key="3432"></Easy>
        </View>

        <TouchableOpacity onPress={newGame}>
          <Text key="43432432" style={[styles.title, styles.niceButton]}>
            New Game
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goHome}>
          <Text key="39843204" style={[styles.title, styles.niceButton]}>
            Go Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

















const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  niceButton: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "yellow",
  },

  playerAndGrid: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: -35,
  },
  player: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  grid: {},
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#3187A2",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 24,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "black",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  color: {
    backgroundColor: "red",
  },
  color2: {
    backgroundColor: "lightblue",
  },
  color3: {
    backgroundColor: "green",
  },
  test: {
    backgroundColor: "red",
  },
});
