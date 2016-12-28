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

function displayWorld(world) {
  var output = ''

  for (var i = 0; i < world.length; i++) { // each arr inside world arr
    output += '\n<div class="row">' // puts everything inside a row

    for (var j = 0; j < world[i].length; j++) { // each indv rows vals
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

  // console.log(output)
  $('#world').append(output)
}



$(function() {
  displayWorld(world2)
})
