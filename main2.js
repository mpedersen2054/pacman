
var game = {
  level: 1,
  speed: 500,
  lifes: 1,
  time: 0,
  // set in this.init()
  gameTickInterval: null,
  gameTimeInterval: null,

  init: function() {
    // game.displayWorld()
    // pacman.displayPacman()
    // ghosts.displayGhosts()
    // game.displayScore()

    // console.log(this)

    game.displayWorld()
    game.displayScore()
    pacman.displayPacman()
    ghosts.displayGhosts()

    game.gameTickInterval = setInterval(game.gameTick, game.speed)
    game.gameTimeInterval = setInterval(game.showTime, 1000)
  },

  gameTick: function() {
    // game.checkIfCollision()
    // pacman.movePacman()
    // ghosts.moveGhosts()

    game.checkIfCollision()
    pacman.movePacman()
    ghosts.moveGhosts()
    // clearInterval(game.gameTickInterval)
  },

  showTime: function() {
    game.time++
    $('#time').html(game.time)
  },

  displayScore: function() {
    $('.game-score').html(pacman.score)
  },

  displayWorld: function() {
    // console.log('hello displayWorld')
    var output = ''

    // each arr inside world arr
    for (var i = 0; i < world.length; i++) {
      output += '\n<div class="row">' // puts everything inside a row
      // each indv rows vals
      for (var j = 0; j < world[i].length; j++) {

        // for marker purposes
        if (world[i][j] == 5) {
          output += '\n\t<div class="hlight"></div>'
          // inflectionPts.push({x: i, y: j})
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
  },

  gameOver: function() {
    $('#meta').html(`<h5>GAME OVER!</h5>`)
  },

  checkIfCollision: function() {
    var pacmanCoords = pacman
    var ghost1Coords = ghosts['0']
    console.log(pacmanCoords, ghost1Coords)
    if (pacmanCoords.x == ghost1Coords.x && pacmanCoords.y == ghost1Coords.y) {
      clearInterval(_tick)
      clearInterval(_time)
      gameOver()
    }

    if (ghost1Coords.x == pacman.x && ghost1Coords.y == pacman.y) {
      clearInterval(_tick)
      clearInterval(_time)
      gameOver()
    }
  }
}

var pacman = {
  x: 1,
  y: 1,
  direction: 0, // -1=left, -2=up, 1=right, 2=down
  score: 0,

  displayPacman: function() {
    // console.log('hello displayPacman')
    var $pacman = $('#pacman')
    updateBGDirection() // rotates bg-img based pacman.direction
    $pacman.css({'top': `${pacman.y * 20}px`})
    $pacman.css({'left': `${pacman.x * 20}px`})
  },

  movePacman: function(keycode) {
    // console.log('hello movePacman')
    // check if pacman is running into a well, if not move him in the direction hes going
    //
    checkIfCollision(pacman,ghosts[0])

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

    checkIfCollision(pacman,ghosts[0])

    // y is y-axis, moves up and down arrs in the arr of arrs
    // x is x-axis, moves up and down array (0...X)
    if (world[pacman.y][pacman.x] == 1) {
      world[pacman.y][pacman.x] = 0
      pacman.score += 10
      displayScore()
      displayWorld()
    }

    displayPacman()
    // checkIfCollision(pacman,ghosts[0])
  },

  updateBGDirection: function() {
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
}

var ghosts = {
  inflectionPts: [],

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
  '2': { // blue
    x:          13,
    y:          14,
    direction:  0,
    chase:      false,
    scatter:    false,
    frightened: false
  },
  '3': { // red
    x:          14,
    y:          14,
    direction:  0,
    chase:      false,
    scatter:    false,
    frightened: false
  },

  displayGhosts: function() {
    // console.log('hello displayGhosts')
    // console.log(ghosts['0'])
    $('.ghost-0').css({'top': `${ghosts['0'].y * 20}px`})
    $('.ghost-0').css({'left': `${ghosts['0'].x * 20}px`})

    $('.ghost-1').css({'top': `${ghosts['1'].y * 20}px`})
    $('.ghost-1').css({'left': `${ghosts['1'].x * 20}px`})

    $('.ghost-2').css({'top': `${ghosts['2'].y * 20}px`})
    $('.ghost-2').css({'left': `${ghosts['2'].x * 20}px`})

    $('.ghost-3').css({'top': `${ghosts['3'].y * 20}px`})
    $('.ghost-3').css({'left': `${ghosts['3'].x * 20}px`})
  },

  moveGhosts: function() {
    console.log('hello moveGhosts')
    var $ghost1 = $('.ghost-1')
    var ghost1 = ghosts[0]

    // NO WALL IN CURRENT DIRECTION
    checkIfCollision(pacman,ghosts[0])

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
    checkIfCollision(pacman,ghosts[0])
    displayGhosts()
    // checkIfCollision(pacman,ghosts[0])
  },

  getDistanceToTile: function(currTile, destTile) {
    // console.log('hello getDistanceToTile')
    var xDist, yDist

    if (destTile.x < currTile.x) {
      xDist = currTile.x - destTile.x
    }

    if (destTile.y < currTile.y) {
      yDist = currTile.y - destTile.y
    }

    // console.log('DISTANCE IN COORDS:::::', [xDist, yDist])
    return xDist + yDist
  },

  simpleAI: function(ghost, direction) {
    // console.log('hello simpleAI')
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
}




game.init()

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
