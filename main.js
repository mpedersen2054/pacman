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

// var world = [
//   [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
//   [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//   [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
//   [2, 3, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 3, 2],
//   [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
//   [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//   [2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2],
//   [2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2],
//   [2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 4, 4, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
//   [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//   [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
//   [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
//   [2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2],
//   [2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2],
//   [2, 2, 2, 3, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 3, 2, 2, 2],
//   [2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2],
//   [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
//   [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
//   [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
//   [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
// ]
//
var world = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 3, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 3, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 5, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 5, 1, 1, 5, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 5, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 5, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 5, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 4, 4, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 2, 0, 0, 0, 0, 0, 0, 2, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 2, 2, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 1, 1, 2, 2, 5, 1, 1, 5, 1, 1, 5, 1, 1, 5, 1, 1, 5, 1, 1, 5, 2, 2, 1, 1, 1, 2],
  [2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2],
  [2, 2, 2, 3, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 3, 2, 2, 2],
  [2, 1, 1, 5, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 5, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
]

/*
VARIABLES
 */

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
  // console.dir(inflectionPts)
  // for (var inf in inflectionPts) {
  //   console.log(inflectionPts[inf])
  // }
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
  checkIfCollision()
}

function checkIfCollision() {
  // need to turn coords into string because object
  // comparision in JS works like this:
  // a={1:'one',2:'two'} b={1:'one',2:'two'} a==b // FALSE
  // a='{1:'one',2:'two'}' b='{1:'one',2:'two'}' // TRUE
  var pacmanCoords = JSON.stringify({ x: pacman.x, y: pacman.y })
  var ghost1Coords = JSON.stringify({ x: ghosts[0].x, y: ghosts[0].y })

  if (pacmanCoords == ghost1Coords) {
    console.log('====================================')
    console.log('============ END GAME ==============')
    console.log('====================================')
  }
}

// SEE NOTES.MD FOR GHOST LOGIC
var inflectionPts = [{x:1,y:6},{x:1,y:21},{x:5,y:1},{x:5,y:6},{x:5,y:9},{x:5,y:12},{x:5,y:15},{x:5,y:18},{x:5,y:21},{x:5,y:26},{x:8,y:6},{x:8,y:21},{x:11,y:12},{x:11,y:15},{x:14,y:6},{x:14,y:9},{x:14,y:18},{x:14,y:21},{x:17,y:9},{x:17,y:18},{x:20,y:6},{x:20,y:9},{x:20,y:18},{x:20,y:21},{x:23,y:6},{x:23,y:9},{x:23,y:12},{x:23,y:15},{x:23,y:18},{x:23,y:21},{x:26,y:3},{x:26,y:24},{x:29,y:12},{x:29,y:15}
]

function moveGhosts() {
  var $ghost1 = $('.ghost-1')
  var ghost1 = ghosts[0]

  // NO WALL IN CURRENT DIRECTION

  if (ghost1.direction == -1 && world[ghost1.y][ghost1.x-1] !== 2) {
    // console.log('moving left')
    ghost1.x--
  }
  else if (ghost1.direction == -2 && world[ghost1.y-1][ghost1.x] !== 2) {
    // console.log('moving up')
    ghost1.y--
  }
  else if (ghost1.direction == 1 && world[ghost1.y][ghost1.x+1] !== 2) {
    // console.log('moving right')
    ghost1.x++
  }
  else if (ghost1.direction == 2 && world[ghost1.y+1][ghost1.x] !== 2) {
    // console.log('moving down')
    ghost1.y++
  }

  // HIT A WALL

  if (ghost1.direction == -1 && world[ghost1.y][ghost1.x-1] == 2) {
    // console.log('HIT A WALL GOING LEFT')
    var lup = world[ghost1.y-1][ghost1.x] !== 2
    var ldown = world[ghost1.y+1][ghost1.x] !== 2
    var possiblePaths = 0
    lup ? possiblePaths++ : possiblePaths
    ldown ? possiblePaths++ : possiblePaths

    if (possiblePaths < 2) {
      // if lup==true set direction=-2, else direction=2
      ghost1.direction = lup ? -2 : 2
    } else {
      var random = Math.ceil(Math.random() * possiblePaths)
      ghost1.direction = (random == 1) ? 2 : -2
    }
  }
  else if (ghost1.direction == -2 && world[ghost1.y-1][ghost1.x] == 2) {
    // console.log('HIT A WALL GOING UP')
    var dleft = world[ghost1.y][ghost1.x-1] !== 2
    var dright = world[ghost1.y][ghost1.x+1] !== 2
    var possiblePaths = 0
    dleft ? possiblePaths++ : possiblePaths
    dright ? possiblePaths++ : possiblePaths

    if (possiblePaths < 2) {
      ghost1.direction = dleft ? -1 : 1
    } else {
      var random = Math.ceil(Math.random() * possiblePaths)
      ghost1.direction = (random == 1) ? -1 : 1
    }
  }
  else if (ghost1.direction == 1 && world[ghost1.y][ghost1.x+1] == 2) {
    var lup = world[ghost1.y-1][ghost1.x] !== 2
    var ldown = world[ghost1.y+1][ghost1.x] !== 2
    var possiblePaths = 0
    lup ? possiblePaths++ : possiblePaths
    ldown ? possiblePaths++ : possiblePaths

    if (possiblePaths < 2) {
      ghost1.direction = lup ? -2 : 2
    } else {
     var random = Math.ceil(Math.random() * possiblePaths)
     ghost1.direction = (random == 1) ? -2 : 2
    }
  }
  else if (ghost1.direction == 2 && world[ghost1.y+1][ghost1.x] == 2) {
    var dleft = world[ghost1.y][ghost1.x-1] !== 2
    var dright = world[ghost1.y][ghost1.x+1] !== 2
    var possiblePaths = 0
    dleft ? possiblePaths++ : possiblePaths
    dright ? possiblePaths++ : possiblePaths

    if (possiblePaths < 2) {
      ghost1.direction = dleft ? -1 : 1
    } else {
      var random = Math.ceil(Math.random() * possiblePaths)
      ghost1.direction = (random == 1) ? -1 : 1
    }
  }

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
