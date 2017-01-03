
/*

TODO:
1) make collision work for all ghosts
2) prog pacman lives feature (3 lives...)
3) prog make play again and next level screen
4) prog make gameover screen
5) style all intermediary screens
6) make eating big coin make ghosts frightened
9000) pac MANE?

 */

var game = {
  level: 0,
  speed: 300,
  // lives: 3,
  time: 0,
  // set in this.init()
  gameTickInterval: null,
  gameTimeInterval: null,

  init: function() {

    // START SCREEN
    if (game.level == 0) {
      var startScreenDOM = `
        <div id="start-screen">
          <div class="first-row">
            <img src="images/animated_pacman.gif" alt="">
            <h1>Pacman</h1>
          </div>
          <div class="start-btn">Play!</div>
        </div>
      `
      $('body').html(startScreenDOM)
      $('.start-btn').on('click', function() {
        game.level++
        game.init()
      })
    }

    // LEVEL 1
    if (game.level == 1) {
      var gameDOM = `
        <div id="container">
          <div id="world"></div>
          <div id="meta">
            <div id="level">
              Level <span class="game-level">1</span>
            </div>
            <div id="score">
              Score <span class="game-score">0</span>
            </div>
            <div id="time">
              Time <span class="game-time">0</span>
            </div>
            <div id="lives">
              Lives <ul class="game-lives"></ul>
            </div>
          </div>
          <div id="pacman"></div>
          <div class="ghost ghost-0"></div>
          <div class="ghost ghost-1"></div>
          <div class="ghost ghost-2"></div>
          <div class="ghost ghost-3"></div>
        </div>
      `

      $('body').html(gameDOM)

      var lives = ''
      for (var i = 0; i < pacman.lives; i++) {
        lives += `<li class="live"></li>`
      }
      $('.game-lives').append(lives)

      game.displayWorld()
      game.displayScore()
      pacman.displayPacman()
      ghosts.displayGhosts()

      game.gameTickInterval = setInterval(game.gameTick, game.speed)
      game.gameTimeInterval = setInterval(game.showTime, 1000)
    }

  },

  gameTick: function() {
    game.checkIfCollision()
    pacman.movePacman()
    ghosts.releaseGhosts()
  },

  showTime: function() {
    game.time++
    $('.game-time').html(game.time)
  },

  displayScore: function() {
    $('.game-score').html(pacman.score)
  },

  displayWorld: function() {
    var output = ''

    // each arr inside world arr
    for (var i = 0; i < world.length; i++) {
      output += '\n<div class="row">' // puts everything inside a row
      // each value of arr inside world arr
      for (var j = 0; j < world[i].length; j++) {

        // for marker purposes
        if (world[i][j] == 5) {
          output += '\n\t<div class="hlight"></div>'
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

  death: function() {
    var aa = $('#container').html()

    if (pacman.lives > 1) {
      pacman.lives--
      pacman.x = 1
      pacman.y = 1

      pacman.direction = 0

      ghosts.iter = 0
      ghosts.ghosts[0].x = 13
      ghosts.ghosts[0].y = 13

      ghosts.ghosts[1].x = 13
      ghosts.ghosts[1].y = 14

      ghosts.ghosts[2].x = 14
      ghosts.ghosts[2].y = 13

      ghosts.ghosts[3].x = 14
      ghosts.ghosts[3].y = 14
      ghosts.activeGhosts = []

      game.init()
    }
    else {
      console.log('END GAMEEEEE')
    }

    // $('#meta').html(`<h5>GAME OVER!</h5>`)
  },

  checkIfCollision: function(pacmanCoords, ghostCoords) {
    var pacmanCoords = pacman
    var ghost1Coords = ghosts.ghosts['0']

    if (pacmanCoords.x == ghost1Coords.x && pacmanCoords.y == ghost1Coords.y) {
      clearInterval(game.gameTickInterval)
      clearInterval(game.gameTimeInterval)
      game.death()
    }

    // if (ghost1Coords.x == pacman.x && ghost1Coords.y == pacman.y) {
    //   clearInterval(game.gameTickInterval)
    //   clearInterval(game.gameTimeInterval)
    //   game.death()
    // }
  }
}

var pacman = {
  x: 1,
  y: 1,
  direction: 0, // -1=left, -2=up, 1=right, 2=down
  score: 0,
  lives: 3,

  displayPacman: function() {
    var $pacman = $('#pacman')
    pacman.updateBGDirection() // rotates bg-img based pacman.direction
    $pacman.css({'top': `${pacman.y * 20}px`})
    $pacman.css({'left': `${pacman.x * 20}px`})
  },

  movePacman: function(keycode) {
    // check if pacman is running into a wall, if not move him in the direction hes going
    // y is y-axis, moves up and down arrs in the arr of arrs
    // x is x-axis, moves up and down array (0...X)
    game.checkIfCollision(pacman, ghosts.ghosts[0])

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

    game.checkIfCollision(pacman,ghosts[0])

    // if pacman runs over a coin, remove it from
    // the screen and increase his score by 10
    if (world[pacman.y][pacman.x] == 1) {
      world[pacman.y][pacman.x] = 0
      pacman.score += 10
      game.displayScore()
      game.displayWorld()
    }

    pacman.displayPacman()
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
  activeGhosts: [],
  iter: 0,

  ghosts: {
    '0': { // pink
      x:          13,
      y:          13,
      active:     false,
      toGetOut:   2,
      direction:  0,
      chase:      false,
      scatter:    false,
      frightened: false
    },
    '1': { // orange
      x:          14,
      y:          13,
      active:     false,
      toGetOut:   2,
      direction:  0,
      chase:      false,
      scatter:    false,
      frightened: false
    },
    '2': { // blue
      x:          13,
      y:          14,
      active:     false,
      toGetOut:   3,
      direction:  0,
      chase:      false,
      scatter:    false,
      frightened: false
    },
    '3': { // red
      x:          14,
      y:          14,
      active:     false,
      toGetOut:   3,
      direction:  0,
      chase:      false,
      scatter:    false,
      frightened: false
    }
  },

  displayGhosts: function() {
    $('.ghost-0').css({'top': `${ghosts.ghosts['0'].y * 20}px`})
    $('.ghost-0').css({'left': `${ghosts.ghosts['0'].x * 20}px`})

    $('.ghost-1').css({'top': `${ghosts.ghosts['1'].y * 20}px`})
    $('.ghost-1').css({'left': `${ghosts.ghosts['1'].x * 20}px`})

    $('.ghost-2').css({'top': `${ghosts.ghosts['2'].y * 20}px`})
    $('.ghost-2').css({'left': `${ghosts.ghosts['2'].x * 20}px`})

    $('.ghost-3').css({'top': `${ghosts.ghosts['3'].y * 20}px`})
    $('.ghost-3').css({'left': `${ghosts.ghosts['3'].x * 20}px`})
  },

  releaseGhosts: function() {
    var g1 = ghosts.ghosts[0], g2 = ghosts.ghosts[1]
        g3 = ghosts.ghosts[2], g4 = ghosts.ghosts[3]

    // increase the ghost iter every gameTick, which is used
    // in releaseGhosts to trigger ghosts to come out at diff times
    ghosts.iter++

    if (ghosts.iter == 9) {
      g1.active = true
      g1.y -= g1.toGetOut
      g1.direction = -1
      ghosts.activeGhosts.push(g1)
    }
    if (ghosts.iter == 27) {
      g2.active = true
      g2.y -= g2.toGetOut
      g2.direction = 1
      ghosts.activeGhosts.push(g2)
    }

    if (ghosts.iter == 45) {
      g3.active = true
      g3.y -= g1.toGetOut
      g3.direction = -1
      ghosts.activeGhosts.push(g3)
    }

    if (ghosts.iter == 60) {
      g4.active = true
      g4.y -= g4.toGetOut
      g4.direction = 1
      ghosts.activeGhosts.push(g4)
    }

    console.log('ACTIVE GHOSTS:  ', ghosts.activeGhosts)

    ghosts.moveGhosts()
  },

  moveGhosts: function() {
    for (var i = 0; i < ghosts.activeGhosts.length; i++) {
      var ghost = ghosts.activeGhosts[i]

      if (ghost.direction == -1 && world[ghost.y][ghost.x-1] !== 2) {
        ghost.x--
      }
      else if (ghost.direction == -2 && world[ghost.y-1][ghost.x] !== 2) {
        ghost.y--
      }
      else if (ghost.direction == 1 && world[ghost.y][ghost.x+1] !== 2) {
        ghost.x++
      }
      else if (ghost.direction == 2 && world[ghost.y+1][ghost.x] !== 2) {
        ghost.y++
      }


      // if the ghost hit a wall
      if (ghost.direction == -1 && world[ghost.y][ghost.x-1] == 2) {
        ghosts.simpleAI(i, -1)
      }
      else if (ghost.direction == -2 && world[ghost.y-1][ghost.x] == 2) {
        ghosts.simpleAI(i, -2)
      }
      else if (ghost.direction == 1 && world[ghost.y][ghost.x+1] == 2) {
        ghosts.simpleAI(i, 1)
      }
      else if (ghost.direction == 2 && world[ghost.y+1][ghost.x] == 2) {
        ghosts.simpleAI(i, 2)
      }

      // checkCollision twice? because if they are heading towards
      // each other sometimes they jump over the other and it skips setting off cIC
      game.checkIfCollision(pacman,ghost)
      ghosts.displayGhosts()
    }
  },

  getDistanceToTile: function(currTile, destTile) {
    var xDist, yDist

    if (destTile.x < currTile.x) {
      xDist = currTile.x - destTile.x
    }

    if (destTile.y < currTile.y) {
      yDist = currTile.y - destTile.y
    }

    return xDist + yDist
  },

  simpleAI: function(ghost, direction) {
    // console.log('hello simpleAI')
    var path1, path2
    var possiblePaths = 0
    var _ghost = ghosts.ghosts[ghost]
    var goingX = direction == -1 || direction == 1 // true if traveling on X-axis
    var goingY = direction == -2 || direction == 2 // true if traveling on Y-axis

    // if going in direction & hit a wall(2), see if up or down has a wall
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


$(function() {
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

})
