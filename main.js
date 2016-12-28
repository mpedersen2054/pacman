/*

List of JS features to build:

1) have JS display the world of brick/coin/pacman/empty
2) have the pacman move up/down


2 => BRICK
1 => COIN
0 => EMPTY

// VARIABLE DECLARATION
// FUNCTION DEFINITIONS
// CLICK HANDLER

 */

var world = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 3, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 3, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 4, 4, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2],
  [2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2],
  [2, 2, 2, 3, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 3, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
]

var pacman = {
  x: 1,
  y: 1,
  direction: 0, // -1=left, -2=up, 1=right, 2=down
  score: 0
}

var ghosts = {
  '0': {
    x: 13,
    y: 13
  },
  '1': {
    x: 14,
    y: 13
  },
  2: {
    x: 13,
    y: 14
  },
  3: {
    x: 14,
    y: 14
  }
}

function displayWorld() {
  var output = ''
  // each arr inside world arr
  for (var i = 0; i < world.length; i++) {
    output += '\n<div class="row">' // puts everything inside a row
    // each indv rows vals
    for (var j = 0; j < world[i].length; j++) {

      if (world[i][j] == 4) {
        output += '\n\t<div class="gate"></div>'
      }
      else if (world[i][j] == 3) {
        output += '\n\t<div class="big-coin"></div>'
      }
      else if (world[i][j] == 2) {
        output += '\n\t<div class="brick"></div>'
      }
      else if (world[i][j] == 1) {
        output += '\n\t<div class="coin"></div>'
      }
      else if (world[i][j] == 0) {
        output += '\n\t<div class="empty"></div>'
      }

    }
    output += '\n</div>' // close div.row
  }
  $('#world').html(output)
}

function displayPacman() {
  var $pacman = $('#pacman')
  updateBGDirection() // rotates bg-img based pacman.direction
  $pacman.css({'top': `${pacman.y * 20}px`})
  $pacman.css({'left': `${pacman.x * 20}px`})
}

function displayGhosts() {
  // console.log(ghosts['0'])
  $('.ghost-0').css({'top': `${ghosts['0'].y * 20}px`})
  $('.ghost-0').css({'left': `${ghosts['0'].x * 20}px`})

  $('.ghost-1').css({'top': `${ghosts['1'].y * 20}px`})
  $('.ghost-1').css({'left': `${ghosts['1'].x * 20}px`})

  $('.ghost-2').css({'top': `${ghosts['2'].y * 20}px`})
  $('.ghost-2').css({'left': `${ghosts['2'].x * 20}px`})

  $('.ghost-3').css({'top': `${ghosts['3'].y * 20}px`})
  $('.ghost-3').css({'left': `${ghosts['3'].x * 20}px`})
}



function displayScore() {
  $('.game-score').html(pacman.score)
}

// only used to show the time, the gameTick is
// every 3milli, we want this to show every sec
var time = 0
function showTime() {
  time++
  $('#time').html(time)
}

// updates the game every 3 milliseconds
function gameTick() {
  movePacman()
  moveGhosts()
}

function moveGhosts() {
  if (time > 5) {
    console.log('LET ME BE FREEEEEEE', time)
  }
}

function movePacman(keyCode) {

  // check if pacman is running into a well, if not move him in the direction hes going


  if (pacman.direction == -1 && world[pacman.y][pacman.x-1] !== 2) { // left
    pacman.x--
  }
  else if (pacman.direction == -2 && world[pacman.y-1][pacman.x] !== 2) { // up
    pacman.y--
  }
  else if (pacman.direction == 1 && world[pacman.y][pacman.x+1] !== 2) { // right
    pacman.x++
  }
  else if (pacman.direction == 2 && world[pacman.y+1][pacman.x] !== 2) { // down
    pacman.y++
  }

  // y is y-axis, moves up and down arrs in the arr of arrs
  // x is x-axis, moves up and down array (0...X)
  if (world[pacman.y][pacman.x] == 1) {
    world[pacman.y][pacman.x] = 0
    pacman.score += 10
    displayScore()
    displayWorld()
  }

  displayPacman()
}

// rotate #pacman bg-img based on pacman.direction
function updateBGDirection() {
  var $pacman = $('#pacman')

  if (pacman.direction == -1) {
    $pacman.css({
      '-moz-transform': 'rotate(180deg)',
      '-webkit-transform': 'rotate(180deg)'
    })
  }
  if (pacman.direction == -2) {
    $pacman.css({
      '-moz-transform': 'rotate(270deg)',
      '-webkit-transform': 'rotate(270deg)'
    })
  }
  if (pacman.direction == 1) {
    $pacman.css({
      '-moz-transform': 'rotate(360deg)',
      '-webkit-transform': 'rotate(360deg)'
    })
  }
  if (pacman.direction == 2) {
    $pacman.css({
      '-moz-transform': 'rotate(90deg)',
      '-webkit-transform': 'rotate(90deg)'
    })
  }
}


displayWorld()
displayPacman()
displayGhosts()
displayScore()

var _tick = setInterval(gameTick, 300)
var _time = setInterval(showTime, 1000)


$(document).keydown(function(e) {
  // update pacmans current direction based on key pressed
  if (e.keyCode == 37) {
    pacman.direction = -1
  }
  if (e.keyCode == 38) {
    pacman.direction = -2
  }
  if (e.keyCode == 39) {
    pacman.direction = 1
  }
  if (e.keyCode == 40) {
    pacman.direction = 2
  }

})
