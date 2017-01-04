
/*

@game
== init
== gameTick
== showTime
== displayScore
== displayWorld
== death
== checkIfWin
== checkIfCollision

@pacman
== displayPacman
== movePacman
== updateBGDirection

@ghosts
== displayGhosts
== releaseGhosts
== moveGhosts
== getDistanceToTile
== simpleAI

@templates
== startScreen
== intermediateScreen
== endgameScreen
== level1

 */

/*
bugs:
== sometimes one of the ghosts will get caught in the cage
== collision is a little janky
 */

var game = {
  level: 0,
  highestLevelAchieved: null,
  scoreToWin: null,
  speed: 300,
  time: 0,
  gameTickInterval: null, // set me in .init()
  gameTimeInterval: null,

  init: function() {

    // GAME OVER SCREEN
    if (game.level == -2) {
      $('body').html(templates.endgameScreen(game.highestLevelAchieved, pacman.score))
    }

    // INTERMEDIATE SCREEN (inbetween levels)
    if (game.level == -1) {
      $('body').html(templates.intermediateScreen(game.highestLevelAchieved))
    }

    // START SCREEN
    if (game.level == 0) {
      $('body').html(templates.startScreen())
      $('.start-btn').on('click', function() {
        game.level++
        game.init()
      })
    }

    // LEVEL 1
    if (game.level == 1) {
      $('body').html(templates.level1())

      // for each life pacman has append a
      // .live onto .game-lives
      var lives = ''
      for (var i = 0; i < pacman.lives; i++) {
        lives += `<li class="live"></li>`
      }
      $('.game-lives').append(lives)

      // to show on endgame-screen
      game.highestLevelAchieved = 1

      // initialize the game
      game.displayWorld()
      game.displayScore()
      pacman.displayPacman()
      ghosts.displayGhosts()

      // set the intervals for the game.time and .3 millisecond game tick
      game.gameTickInterval = setInterval(game.gameTick, game.speed)
      game.gameTimeInterval = setInterval(game.showTime, 1000)
    }

    // always append the github button to the DOM
    $('body').append(`
      <a href="#" class="gh-btn">
        <i class="fa fa-github-alt" aria-hidden="true"></i>
      </a>
    `)

  },

  gameTick: function() {
    game.checkIfWin()
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
    var coinsNum = 0

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
          coinsNum++
        }
        else if (world[i][j] == 0) {
          output += '\n\t<div class="empty"></div>'
        }
      }
      output += '\n</div>' // close div.row
    }

    // wont work if theres more than 1 levels
    if (!game.scoreToWin) game.scoreToWin = coinsNum * 10 // each coin 10 pts

    $('#world').html(output)
  },

  death: function() {
    // when pacman dies & he still has more than 1 life left
    // reset pacman & ghosts to starting pos and start game again
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
    // if no more lives left, show endgame-screen
    else {
      game.level = -2
      game.init()
    }
  },

  checkIfWin: function() {
    // console.log('checking if won!!!')
    if (pacman.score == game.scoreToWin) {
      clearInterval(game.gameTickInterval)
      clearInterval(game.gameTimeInterval)

      game.level = -1
      game.init()
    }
  },

  checkIfCollision: function(pacmanCoords, ghostCoords) {
    var pacmanCoords = pacman
    // var ghost1Coords = ghosts.ghosts['0']

    if (pacmanCoords.x == ghostCoords.x && pacmanCoords.y == ghostCoords.y) {
      clearInterval(game.gameTickInterval)
      clearInterval(game.gameTimeInterval)
      game.death()
    }
  }
}

var pacman = {
  x: 1,
  y: 1,
  direction: 0, // -1=left, -2=up, 1=right, 2=down
  score: 0,
  lives: 2,

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
    // rotate the pacman's bg img with
    // css when his direction changes
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
      toGetOut:   2,     // y + toGetOut to move ghost out of cage
      direction:  0,
      dumbAI:     false, // level 1 simpleAI
      chase:      false, // use pacman as target tile
      scatter:    false, // use quadrant as target tile
      frightened: false  // when pacman eats big-coin
    },
    '1': { // orange
      x:          14,
      y:          13,
      active:     false,
      toGetOut:   2,
      direction:  0,
      dumbAI:     false,
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
      dumbAI:     false,
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
    // iter will be +1 every 3 milliseconds
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

    ghosts.moveGhosts()
  },

  moveGhosts: function() {
    for (var i = 0; i < ghosts.activeGhosts.length; i++) {
      var ghost = ghosts.activeGhosts[i]

      game.checkIfCollision(pacman,ghost)

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
      if (goingX) _ghost.direction = (random == 1) ? 2 : -2
      if (goingY) _ghost.direction = (random == 1) ? 1 : -1
    }
  }
}

// templates to be called in game.init() for each level
var templates = {
  startScreen: function() {
    document.title = 'Pacman | Play me!'
    return `
      <div id="start-screen">
        <div class="first-row">
          <img src="images/animated_pacman.gif" alt="">
          <h1>Pacman</h1>
        </div>
        <div class="start-btn">Play!</div>
      </div>
    `
  },
  intermediateScreen: function(highestLevel) {
    document.title = 'Pacman | Play me!'
    return `
      <div id="intermediate-screen">
        <h1>Congratulations!</h1>
        <p>You beat level ${highestLevel}</p>
        <p>There is only 1 level for now, lol.</p>
        <p>The button below is supposed to send you to the next level, once I implement it...</p>
        <div class="next-level-btn">Next level</div>
      </div>
    `
  },
  endgameScreen: function(highestLevel, score) {
    document.title = 'Pacman | Game over'
    return `
      <div id="endgame-screen">
        <h1>Nice Try! Game Over!</h1>
        <p>You got to level ${highestLevel}!</p>
        <p>You collected a total of ${score} coins!</p>
        <p>refresh the browser window to play again...</p>
      </div>
    `
  },
  level1: function() {
    document.title = 'Pacman | Level 1'
    return `
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
