/*

List of JS features to build:

1) have JS display the world of brick/coin/pacman/empty
2) have the pacman move up/down


2 => BRICK
1 => COIN
0 => EMPTY

 */


var world1 = [
  [2,2,2,2,2,2,2,2,2,2],
  [2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2]
]

var world2 = [
  [2,2,2,2,2,2,2,2,2,2],
  [2,1,2,1,1,1,1,1,1,2],
  [2,1,2,1,1,1,1,1,1,2],
  [2,0,2,1,1,1,1,1,1,2],
  [2,0,2,1,1,1,1,1,1,2],
  [2,0,2,1,2,2,2,2,1,2],
  [2,0,2,1,2,1,1,1,1,2],
  [2,0,0,1,2,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2]
]

var pacman = {
  x: 20,
  y: 20
}

function displayWorld(world) {
  var output = ''

  // each arr inside world arr
  for (var i = 0; i < world.length; i++) {
    output += '\n<div class="row">' // puts everything inside a row

    // each indv rows vals
    for (var j = 0; j < world[i].length; j++) {
      if (world[i][j] == 2) {
        output += '\n\t<div class="brick"></div>'
      } else if (world[i][j] == 1) {
        output += '\n\t<div class="coin"></div>'
      } else if (world[i][j] == 0) {
        output += '\n\t<div class="empty"></div>'
      }
    }

    output += '\n</div>' // close div.row
  }

  $('#world').append(output)
}

function displayPacman() {
  console.log(pacman)
  $('#pacman').css({'top': `${pacman.y}px`})
  $('#pacman').css({'left': `${pacman.x}px`})
}

displayWorld(world2)
displayPacman()


$(document).keydown(function(e) {
  // left: 37, up: 38, right: 39, down: 40
  console.log(`pressed key ${e.keyCode}`)

  if (e.keyCode == 37) {
    pacman.x -= 20
  }
  else if (e.keyCode == 38) {
    pacman.y -= 20
  }
  else if (e.keyCode == 39) {
    pacman.x += 20
  }
  else if (e.keyCode == 40) {
    pacman.y += 20
  }

  displayPacman()

})
