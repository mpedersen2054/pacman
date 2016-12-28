Ghosts Logic:

3 modes:
1) chase : default, tries to move towards pacman
2) scatter : each ghost retreat to quadrant of map and camps
3) frightened : runs away from pacman, can be eaten. goes slower

changes between chase and scatter occur based on a timer, which is reset at beginning of a new level or a new life.

1st level scatter pattern:

Scatter for 7 seconds, then Chase for 20 seconds.
Scatter for 7 seconds, then Chase for 20 seconds.
Scatter for 5 seconds, then Chase for 20 seconds.
Scatter for 5 seconds, then switch to Chase mode permanently.

Target Tiles and Ghost movement

majority of the time each ghost has a specific target tile it's trying to reach, and its' behavior revolves around reaching that tile. (target tiles can and often are located in an inaccessable tile)

chase mode uses pacmans x,y as target tile
scatter mode uses a tile in a corner of the map for a ghost to try to reach
frightened mode ghosts psuedorandomly decide which turns to make at every corner

Ghosts only plan 1 step in advance when moving

whenever entering a new tile, ghost looks ahead to next tile and decides where it will go next. whenever a ghost is in a tile with only 2 exits (say - or + on X-axis) it will continue in its' current direction.

ghosts will NEVER reverse their current direction, unless they are changing modes



inflection pts ( where ghosts make decisions )

(
  to see if 1 object == to another, need to JSON.stringify each object
  ex)
  var a = {1:'one',2:'two'}
  var b = {1:'one',2:'two'}
  a == b // returns false

  var c = JSON.stringify(a)
  var d = JSON.stringify(b)
  c == d // returns true
)

[
  {x:1,y:6},
  {x:1,y:21},
  {x:5,y:1},
  {x:5,y:6},
  {x:5,y:9},
  {x:5,y:12},
  {x:5,y:15},
  {x:5,y:18},
  {x:5,y:21},
  {x:5,y:26},
  {x:8,y:6},
  {x:8,y:21},
  {x:11,y:12},
  {x:11,y:15},
  {x:14,y:6},
  {x:14,y:9},
  {x:14,y:18},
  {x:14,y:21},
  {x:17,y:9},
  {x:17,y:18},
  {x:20,y:6},
  {x:20,y:9},
  {x:20,y:18},
  {x:20,y:21},
  {x:23,y:6},
  {x:23,y:9},
  {x:23,y:12},
  {x:23,y:15},
  {x:23,y:18},
  {x:23,y:21},
  {x:26,y:3},
  {x:26,y:24},
  {x:29,y:12},
  {x:29,y:15}
]
