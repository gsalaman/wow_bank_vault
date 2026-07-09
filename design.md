# High Level Overview

## Key Puzzle
There are two electronic components to the key puzzle:
1) an arcade-style button that lives in the hidden compartment.  This button lights up with 5v.
2) an RGB-LED ring (size 16) that lights up (in fun patterns) when the button is pressed.

For our first iteration, pressing the button also starts the shape game.

## Shape Game
We've got a display with 4 shapes on it:
* Yellow Circle
* Green Square
* Blue Triangle
* Red Heart

This is backlight by a single RGB LED strip.

In addition, there are 4 "hand" symbols with those colors/shapes below this display.  These have capacitive touch sensors, specifically a copper plate connected to a Sparkfun capacitive touch breakout board.
This board translates the cap-touch signal into a logic signal:  1 means pressed, 0 means not pressed.  Each of these boards is connected to input pins on the microbit, and require 3.3v and ground.

Finally, we've got a solenoid lock connected to a 12v transistor circut, triggered by a microbit pin to open the spring-loaded vault when the signal goes high.
