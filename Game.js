import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
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
  setSoundEffects,
}) {
  const [player, setPlayer] = useState("X");
  const [winState, setWinState] = useState(false);

  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);




  const Press = (event, row, col) => {
    // console.log(`Line 76: WinState: ${winState}`);
    if (winState == true) {
      console.log("Line 75: Game Over");
      newGame();
      return;
    }

    if (single) { // Two player mode 
      if (grid[row][col] === "") {
        console.log("Line 84: Going in Player if statement: " + player);
        if (player === "X") {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((r) => [...r]);
            newGrid[row][col] = "X";
            setWinState(checkWinner(newGrid, "X"));
            return newGrid;
          });
          setPlayer("Player: O");
        } else if (player === "Player: O") {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((r) => [...r]);
            newGrid[row][col] = "O";
            setWinState(checkWinner(newGrid, "O"));
            return newGrid;
          });
          setPlayer("X");
        }
      } else {
        if (gridFull(grid)) {
          console.log("Grid is full");
          newGame();
        } else {
          // console.log("Click another cell");
        }
      }
    } else { // Single player mode 
      if (grid[row][col] === "") {
        // console.log("Going in AI if statement");
        setGrid((prev) => {
          let newGrid = prev.map((r) => [...r]);
          newGrid[row][col] = "X";
          setWinState(checkWinner(newGrid, "X"));
          return newGrid;
        });
        console.log("Line 118: Player: X chooses: [" + row + ", " + col + "]");
        setPlayer("AI");
      } else {
        if (gridFull(grid)) {
          console.log("Grid is full");
          reset();
        } else {
          // console.log("Click another cell");
        }
      }
    }
  };

    let scores = {
      X: -1,
      O: 1,
      tie: 0,
    };

    const minimax = (minimaxGrid, depth, isMaximising) => {
      if (checkWinner(minimaxGrid, "X")) {
        return scores.X;
      } else if (checkWinner(minimaxGrid, "O")) {
        return scores.O;
      } else if (gridFull(minimaxGrid)) {
        return scores.tie;
      }
      let bestScore;

      if (isMaximising) {
        // AI's turn
        bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (minimaxGrid[i][j] === "") {
              minimaxGrid[i][j] = "O";
              let score = minimax(minimaxGrid, depth + 1, false); // False meaning it's the player's turn
              minimaxGrid[i][j] = "";
              bestScore = Math.max(score, bestScore);
            }
          }
        }
      } else {
        // This is finding the lowest score for Player's turn
        bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (minimaxGrid[i][j] === "") {
              minimaxGrid[i][j] = "X";
              let score = minimax(minimaxGrid, depth + 1, true); // True meaning it's the AI's turn
              minimaxGrid[i][j] = "";
              bestScore = Math.min(score, bestScore);
            }
          }
        }
      }
      return bestScore;
    };

  useEffect(() => {
    if (player === "AI") {
      console.log("Line 128(1): AI is playing");
      aiOutput();
      setPlayer("X");
    } else {
    }
  }, [player]);

    const aiPosition = (aiGrid) => {
      let bestScore = -Infinity;
      let bestMove = [0, 0];

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (aiGrid[i][j] === "") {
            console.log("Line 163: Choosing best move from non chosen space: [" + i + ", " + j + "]");
            aiGrid[i][j] = "O";
            let score = minimax(aiGrid, 0, false); 
            console.log("Line 167: Score: " + score);
            aiGrid[i][j] = "";
            if (score > bestScore) {
              bestScore = score;
              console.log("Line 169: Updating position to: [" + i + ", " + j + "] with score: " + score);
              // console.log("line: 63( i: " + i + " j: " + j + ")");
              bestMove = [i, j];
            }
          }
        }
      }
      console.log("Line 175: Best Move: " + bestMove);
      return bestMove;
    };

  const aiOutput = () => {
    setGrid((prev) => {
      let aiOutputGrid = prev.map((r) => [...r]); // Copy grid
      const [r, c] = aiPosition(aiOutputGrid); // Check winner is alresady in the aiPosition function
      aiOutputGrid[r][c] = "O";

      if (checkWinner(aiOutputGrid, "AI"))
      {
        console.log("Line 186: AI wins");

      }
      else{
        console.log("Line1 182: AI dosen't win");
      }
      setWinState(checkWinner(aiOutputGrid, "AI"));
      return aiOutputGrid;
    });
  };

function checkWinner(winnerGrid, player) {

  if(player == "AI"){
    player = "O";
  };
  // Rows, columns, diagonals
  for (let i = 0; i < 3; i++) {
    if (
      winnerGrid[i][0] === player &&
      winnerGrid[i][1] === player &&
      winnerGrid[i][2] === player
    )
      return true;
    if (
      winnerGrid[0][i] === player &&
      winnerGrid[1][i] === player &&
      winnerGrid[2][i] === player
    )
      return true;
  }
  if (
    winnerGrid[0][0] === player &&
    winnerGrid[1][1] === player &&
    winnerGrid[2][2] === player
  )
    return true;
  if (
    winnerGrid[0][2] === player &&
    winnerGrid[1][1] === player &&
    winnerGrid[2][0] === player
  )
    return true;

  return false;
}

  const gridFull = (checkingGrid) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (checkingGrid[i][j] === "") {
          return false;
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
    setWinState(false);
    reset();
    setPlayer("X");
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
      <Text key={2} style={[styles.title, styles.topTitle]}>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  topTitle: {
    marginTop: 50,
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
