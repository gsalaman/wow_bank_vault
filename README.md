# WOW Bank Vault program
MakerEdJam 2026 Bank Vault project code.

## High Level Overview
### Key Puzzle
There are two electronic components to the key puzzle:  
1) a light-up arcade-style button that lives in the hidden compartment  
2) an RGB-LED ring (size 16) that lights up (in fun patterns) when the button is pressed  

For our first iteration, pressing that button also starts the shape game.

### Shape Game
We've got a display with 4 shapes on it:
* Yellow Circle
* Green Square
* Blue Triangle
* Red Heart

This is backlight by a single RGB LED strip.

In addition, there are 4 "hand" symbols with those colors/shapes below this display.  These have capacitive touch sensors, specifically a copper plate connected to a Sparkfun capacitive touch breakout board.
This board translates the cap-touch signal into a logic signal:  1 means pressed, 0 means not pressed.  Each of these boards is connected to input pins on the microbit, and require 3.3v and ground.

Finally, we've got a solenoid lock connected to a 12v transistor circut, triggered by a microbit pin to open the spring-loaded vault when the signal goes high.


## Software Overview
We have two main states:
* Solving the key puzzle
* Solving the shapes puzzle

In the key puzzle state, we're waiting for the button in the key-compartment to be pressed.  Once pressed, the key puzzle led ring lights up, and then the shape game starts.

In the shape game, we randomly pick one and light up one shape.  When that shape is pressed, we flash that symbol, and then pick and light up another shape.  Once all four have been pressed, we open up the bank vault.  At this point, we go back to waiting for the key puzzle to be solved again.

## Hardware Interfaces
The overall microbit pinout can be found here:
[Microbit Pinout](https://github.com/gsalaman/wow_bank_vault/blob/master/microbit_pinout.md) 

We're using the Dawson LED translator board to supply power (5v), do voltage translations, and give us an easier pin breakout platform.

We've got an RGB LED strip to drive the "shape" symbols, and an RGB LED ring as our key game indicator.

Inside the key puzzle is a light-up arcade button.  We give 5v (always on) to this, as well as routing the wires to Pin 11 (button B)

The vault is driven by a 12V solenoid, triggered by a transistor circuit controlled by Microbit pin 8.

We're using capacitive touch plates with copper tape to drive the 4 symbol "buttons".  These are connnected to a sparkfun breakout board (AT42QT1010).
Each of those breakout boards needs 3.3v, Ground, and an pin to use as input:  1 means the sensor is pressed; 0 means "not pressed".

We've got a distribution board behind the touch symbols to simplify wiring to the capacitive touch board.  This board also contains the transistor circuit.
Schematic here:
[Distribution board](https://github.com/gsalaman/wow_bank_vault/blob/master/distribution_board.md)


# MakeCode Instructions

> Open this page at [https://gsalaman.github.io/wow_bank_vault/](https://gsalaman.github.io/wow_bank_vault/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/gsalaman/wow_bank_vault** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/gsalaman/wow_bank_vault** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
