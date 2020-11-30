"use strict"

//phitonthel

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.board_arr = this.convertBoardStrToBoardArr()
    this.solved_board_string = ''
    this.countBacktrack = 0
    this.solvedSolutionCount = 0
    this.emptySlotSymbol = '.'
  }

  solve() {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (this.board_arr[row][column] == 0) {
          for (let numGuess = 1; numGuess < 10; numGuess++) {
            if (this.isPossible(row, column, numGuess)) {
              this.board_arr[row][column] = numGuess
              // UNCOMMENT JIKA INGIN MELIHAT VISUALISASINYA
              // if (this.solvedSolutionCount%200 == 0) {
              //   console.log('            >>>brute-force guessing!>>>');
              //   this.displaySolvedBoard(); sleep (300); console.clear();
              // }
              this.solvedSolutionCount ++
              this.solve()
              // if (this.solvedSolutionCount%200 == 0) {
              //   console.log('   <<<backtrack!<<<');
              //   this.displaySolvedBoard(); sleep (300); console.clear();
              // }
              this.board_arr[row][column] = Number(0)
              this.countBacktrack ++
            }
          }
          return
        }
      }
    }
    console.log('SOLVED BOARD!');
    // this.solvedSolutionCount ++ // --> uncomment to know the iteration
    this.displaySolvedBoard(); //sleep (500); -> uncomment to pause the output
  }

  displaySolvedBoard() {
    this.solved_board_string = this.convertBoardArrToBoardStr(this.board_arr)
    // this.solvedSolutionCount ++ // --> uncomment to know the iteration
    // console.log('iteration no', this.solvedSolutionCount); // --> uncomment to know the iteration
    console.log('Number of backtracks:' + this.countBacktrack);
    this.displayAdvanced(this.solved_board_string);
  }

  displayAdvanced(str) {
    console.log('str:', str);
    console.log('-----------------------');
    console.log(this.board_arr[0][0], this.board_arr[0][1], this.board_arr[0][2], '|',this.board_arr[0][3], this.board_arr[0][4], this.board_arr[0][5], '|',this.board_arr[0][6], this.board_arr[0][7], this.board_arr[0][8], '|');
    console.log(this.board_arr[1][0], this.board_arr[1][1], this.board_arr[1][2], '|',this.board_arr[1][3], this.board_arr[1][4], this.board_arr[1][5], '|',this.board_arr[1][6], this.board_arr[1][7], this.board_arr[1][8], '|');
    console.log(this.board_arr[2][0], this.board_arr[2][1], this.board_arr[2][2], '|',this.board_arr[2][3], this.board_arr[2][4], this.board_arr[2][5], '|',this.board_arr[2][6], this.board_arr[2][7], this.board_arr[2][8], '|');
    console.log('-----------------------');
    console.log(this.board_arr[3][0], this.board_arr[3][1], this.board_arr[3][2], '|',this.board_arr[3][3], this.board_arr[3][4], this.board_arr[3][5], '|',this.board_arr[3][6], this.board_arr[3][7], this.board_arr[3][8], '|');
    console.log(this.board_arr[4][0], this.board_arr[4][1], this.board_arr[4][2], '|',this.board_arr[4][3], this.board_arr[4][4], this.board_arr[4][5], '|',this.board_arr[4][6], this.board_arr[4][7], this.board_arr[4][8], '|');
    console.log(this.board_arr[5][0], this.board_arr[5][1], this.board_arr[5][2], '|',this.board_arr[5][3], this.board_arr[5][4], this.board_arr[5][5], '|',this.board_arr[5][6], this.board_arr[5][7], this.board_arr[5][8], '|');
    console.log('-----------------------');
    console.log(this.board_arr[6][0], this.board_arr[6][1], this.board_arr[6][2], '|',this.board_arr[6][3], this.board_arr[6][4], this.board_arr[6][5], '|',this.board_arr[6][6], this.board_arr[6][7], this.board_arr[6][8], '|');
    console.log(this.board_arr[7][0], this.board_arr[7][1], this.board_arr[7][2], '|',this.board_arr[7][3], this.board_arr[7][4], this.board_arr[7][5], '|',this.board_arr[7][6], this.board_arr[7][7], this.board_arr[7][8], '|');
    console.log(this.board_arr[8][0], this.board_arr[8][1], this.board_arr[8][2], '|',this.board_arr[8][3], this.board_arr[8][4], this.board_arr[8][5], '|',this.board_arr[8][6], this.board_arr[8][7], this.board_arr[8][8], '|');
    console.log('-----------------------');
  }

  isPossible(row, column, num) {
    let isRowPossible = this.checkHorizontal(row, column, num)
    let isColumnPossible = this.checkVertical(row, column, num)
    let is3x3Possible = this.check3x3(row, column, num)

    if (isRowPossible && isColumnPossible && is3x3Possible) {
      return true
    }
    return false
  }

  convertBoardStrToBoardArr() {
    let output = []
    for (let i = 0; i < 9; i++) {
      let outputLine = []
      for (let j = 0; j < 9; j++) {
        let index = (i*9)+j
        outputLine.push(this.board_string[index])
      }
      output.push(outputLine)
    }
    return output
  }

  convertBoardArrToBoardStr(arr) {
    let output = ''
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        output += arr[i][j]
      }
    }
    return output
  }

  // OLD METHOD TO DISPLAY THE BOARD INTO STR VALUE
  // TO DISPLAY THE UNSOLVED BOARD ONLY
  // I CHANGED THE CODE BELOW INTO displayAdvanced(str) TO RETURN THE OUTPUT IN STR AND NUMBER
  board(str) {
    console.log('str:', str);
    console.log('  display board:');
    let line = '-----------------------\n'
    let output = '' + line
    for (let i = 0; i < str.length; i++) {
      if (str[i] == 0) {
        output += ' ' + this.emptySlotSymbol
      } else {
        output += ' ' + str[i]
      }

      if ((i+1)%27 == 0) {
        output += '\n' + line
      }
      else if ((i+1)%9 == 0) {
        output += '\n'
      }
      else if ((i+1)%3 == 0) {
        output += ' |'
      }
    }
    return output
  }

  checkHorizontal(row, column, num) {
    for (let column = 0; column < 9; column++) {
      if (this.board_arr[row][column] == num) {
        return false
      }
    }
    return true
  }

  checkVertical(row, column, num) {
    for (let row = 0; row < 9; row++) {
      if (this.board_arr[row][column] == num) {
        return false
      }
    }
    return true
  }

  check3x3(row, column, num) {
    let rowG = (Math.floor(row/3))*3
    let columnG = (Math.floor(column/3))*3

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        if (this.board_arr[rowG+rowIndex][columnG+columnIndex] == num) {
          return false
        }
      }
    }
    return true
  }

}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e9; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
let boardArrInput = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt').toString().split("\r\n")

for (let i = 0; i < boardArrInput.length; i++) {
  const board_string = boardArrInput[i]
  let game = new Sudoku(board_string)
  console.log('UNSOLVED BOARD number:' + (i+1));
  // game.displayAdvanced(game.board_string)
  console.log(game.board(game.board_string))
  game.solve()
}