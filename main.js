
// LOAD IN 2D ARRAY FROM WORLD.JS
//
var _tick, _time

var game = {
  level: 1,
  speed: 300,
  lifes: 1
}

var pacman = {
  x: 1,
  y: 1,
  direction: 0, // -1=left, -2=up, 1=right, 2=down
  score: 0
}

var ghosts = {
  '0': { // pink
    x:          13,
    y:          11,
    direction:  -1,
    chase:      false,
    scatter:    false,
    frightened: false
  },
  '1': { // orange
    x:          14,
    y:          13,
    direction:  0,
    chase:      false,
    scatter:    false,
    frightened: false
  },
  2: { // blue
    x:          13,
    y:          14,
    direction:  0,
    chase:      false,
    scatter:    false,
    frightened: false
  },
  3: { // red
    x:          14,
    y:          14,
    direction:  0,
    chase:      false,
    scatter:    false,
    frightened: false
  }
}

/*
FUNCTIONS
 */

function displayWorld() {
  var output = ''
  var inflectionPts = []
  // each arr inside world arr
  for (var i = 0; i < world.length; i++) {
    output += '\n<div class="row">' // puts everything inside a row
    // each indv rows vals
    for (var j = 0; j < world[i].length; j++) {

      // for marker purposes
      if (world[i][j] == 5) {
        output += '\n\t<div class="hlight"></div>'
        inflectionPts.push({x: i, y: j})
      }

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

function checkIfCollision(pacmanCoords, ghost1Coords) {
  // need to turn coords into string because object
  // comparision in JS works like this:
  //

  if (pacmanCoords.x == ghost1Coords.x && pacmanCoords.y == ghost1Coords.y) {
    clearInterval(_tick)
    clearInterval(_time)
    gameOver()
  }
}

// SEE NOTES.MD FOR GHOST LOGIC
var inflectionPts = [{x:1,y:6},{x:1,y:21},{x:5,y:1},{x:5,y:6},{x:5,y:9},{x:5,y:12},{x:5,y:15},{x:5,y:18},{x:5,y:21},{x:5,y:26},{x:8,y:6},{x:8,y:21},{x:11,y:12},{x:11,y:15},{x:14,y:6},{x:14,y:9},{x:14,y:18},{x:14,y:21},{x:17,y:9},{x:17,y:18},{x:20,y:6},{x:20,y:9},{x:20,y:18},{x:20,y:21},{x:23,y:6},{x:23,y:9},{x:23,y:12},{x:23,y:15},{x:23,y:18},{x:23,y:21},{x:26,y:3},{x:26,y:24},{x:29,y:12},{x:29,y:15}
]

// pass in ghost index & current direction
function simpleAI(ghost, direction) {
  var path1, path2
  var possiblePaths = 0
  var _ghost = ghosts[ghost]
  var goingX = direction == -1 || direction == 1 // true if traveling on X-axis
  var goingY = direction == -2 || direction == 2 // true if traveling on Y-axis

  // if going in direction & hit a wall, see if up or down has a wall
  // if only 1 path, take it. if 2 paths choose 1 at random

  if (direction == -1) { // left
    path1 = world[_ghost.y-1][_ghost.x] !== 2 // up
    path2 = world[_ghost.y+1][_ghost.x] !== 2 // down
  }

  if (direction == -2) { // up
    path1 = world[_ghost.y][_ghost.x-1] !== 2
    path2 = world[_ghost.y][_ghost.x+1] !== 2
  }

  if (direction == 1) { // right
    path1 = world[_ghost.y-1][_ghost.x] !== 2
    path2 = world[_ghost.y+1][_ghost.x] !== 2
  }

  if (direction == 2) { // down
    path1 = world[_ghost.y][_ghost.x-1] !== 2
    path2 = world[_ghost.y][_ghost.x+1] !== 2
  }

  path1 ? possiblePaths++ : possiblePaths
  path2 ? possiblePaths++ : possiblePaths

  // check if current path is X or Y axis & check
  // if path1(bool checking if path availible) is True,
  // take that path, otherwise gen random # and take path
  if (possiblePaths < 2) {
    if (goingX) _ghost.direction = path1 ? -2 : 2
    if (goingY) _ghost.direction = path1 ? -1 : 1
  } else {
    var random = Math.ceil(Math.random() * possiblePaths)
    console.log('RANDOMMMM', random)
    if (goingX) _ghost.direction = (random == 1) ? 2 : -2
    if (goingY) _ghost.direction = (random == 1) ? 1 : -1
  }
}

function moveGhosts() {
  var $ghost1 = $('.ghost-1')
  var ghost1 = ghosts[0]

  // NO WALL IN CURRENT DIRECTION
  checkIfCollision({x:pacman.x,y:pacman.y},{x:ghost1.x,y:ghost1.y})

  if (ghost1.direction == -1 && world[ghost1.y][ghost1.x-1] !== 2) {
    ghost1.x--
  }
  else if (ghost1.direction == -2 && world[ghost1.y-1][ghost1.x] !== 2) {
    ghost1.y--
  }
  else if (ghost1.direction == 1 && world[ghost1.y][ghost1.x+1] !== 2) {
    ghost1.x++
  }
  else if (ghost1.direction == 2 && world[ghost1.y+1][ghost1.x] !== 2) {
    ghost1.y++
  }

  // HIT A WALL

  if (ghost1.direction == -1 && world[ghost1.y][ghost1.x-1] == 2) {
    simpleAI(0, -1)
  }
  else if (ghost1.direction == -2 && world[ghost1.y-1][ghost1.x] == 2) {
    simpleAI(0, -2)
  }
  else if (ghost1.direction == 1 && world[ghost1.y][ghost1.x+1] == 2) {
    simpleAI(0, 1)
  }
  else if (ghost1.direction == 2 && world[ghost1.y+1][ghost1.x] == 2) {
    simpleAI(0, 2)
  }

  // checkCollision twice? because if they are heading towards
  // each other sometimes they jump over the other and it skips setting off cIC
  checkIfCollision({x:pacman.x,y:pacman.y},{x:ghost1.x,y:ghost1.y})
  displayGhosts()
}

function getDistanceToTile(currTile, destTile) {
  var xDist, yDist

  if (destTile.x < currTile.x) {
    xDist = currTile.x - destTile.x
  }

  if (destTile.y < currTile.y) {
    yDist = currTile.y - destTile.y
  }

  // console.log('DISTANCE IN COORDS:::::', [xDist, yDist])
  return xDist + yDist
}

function movePacman(keyCode) {

  // check if pacman is running into a well, if not move him in the direction hes going
  //

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

function gameOver() {
  $('#meta').append(`<h5>GAME OVER!</h5>`)
  // clearInterval(_tick)
  // clearInterval(_time)
}


displayWorld()
displayPacman()
displayGhosts()
displayScore()

_tick = setInterval(gameTick, 300)
_time = setInterval(showTime, 1000)


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
