# Web 3D Tetris
> [Click here](https://github.com/PKlempe/Web-3D-Tetris/archive/refs/heads/main.zip) to get [möllered](https://www.urbandictionary.com/define.php?term=m%C3%B6llered). 🤡

This little game has been developed for the course "GFX - Foundations of Computer Graphics" at the University of Vienna. The goal of this assignment was to create a simple 3D game so that students can get familiar with the basic concepts of Computer Graphics (*Vector & Matrix Calculation, 3D Modelling, Shading, etc.*) and WebGL.

**_For Controls, please see below._**

## Screenshots
### Perspective Viewing
| ![persp1](https://user-images.githubusercontent.com/49726903/129208972-fb42ec57-4f7a-4fc3-892d-99b17e6394df.png) | ![persp2](https://user-images.githubusercontent.com/49726903/129209027-a5962992-2015-4ac3-b16c-e6d7dcf3d48a.png) |
|---------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------:|

### Orthogonal Viewing
| ![ortho1](https://user-images.githubusercontent.com/49726903/129208766-9456f488-fac2-40c2-80f4-19639a8a454b.png) | ![ortho2](https://user-images.githubusercontent.com/49726903/129208923-1d162941-5c73-4d96-8878-808045afafc5.png) |
|---------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------:|
<br/>


## Controls ⌨️
* `cw` - clockwise
* `ccw` - counter clockwise

### Camera 🎥
#### Movement
| Key              | Description                               |
|------------------|-------------------------------------------|
|   <kbd>I</kbd>   | Rotate the camera ccw on the X-Axis around the center of the grid |
|   <kbd>K</kbd>   | Rotate the camera cw on the X-Axis around the center of the grid |
|   <kbd>J</kbd>   | Rotate the camera ccw on the Y-Axis around the center of the grid |
|   <kbd>L</kbd>   | Rotate the camera cw on the Y-Axis around the center of the grid |
|   <kbd>U</kbd>   | Rotate the camera ccw on the Z-Axis around the center of the grid |
|   <kbd>O</kbd>   | Rotate the camera cw on the Z-Axis around the center of the grid |

#### Zooming
> Only works with Perspective Viewing!

| Key              | Description                               |
|------------------|-------------------------------------------|
|   <kbd>+</kbd>   | Zoom In                                   |
|   <kbd>-</kbd>   | Zoom Out                                  |

#### Mouse Control
> The mouse needs to be moved over the Canvas element!

| Movement              | Description                               |
|------------------|-------------------------------------------|
|   ←🖱️   | Rotate the camera cw on the Y-Axis around the center of the grid |
|   🖱️→   | Rotate the camera ccw on the Y-Axis around the center of the grid |
<br/>


### Tetracubes 🧊
#### Movement
| Key              | Description                               |
|------------------|-------------------------------------------|
|   <kbd>🡅</kbd>   | Move the cube in the negative Z direction |
|   <kbd>🡇</kbd>   | Move the cube in the positive Z direction |
|   <kbd>🡄</kbd>   | Move the cube in the negative X direction |
|   <kbd>🡆</kbd>   | Move the cube in the positive X direction |
| <kbd>Space</kbd> | Let the cube drop down                    |

#### Rotation
| Key                           | Description                           	|
|-------------------------------|---------------------------------------	|
| <kbd>X</kbd>                  | Rotate the cube ccw around the X-Axis 	|
| <kbd>⇧</kbd> + <kbd>X</kbd> 	| Rotate the cube cw around the X-Axis  	|
| <kbd>Y</kbd>                  | Rotate the cube ccw around the Y-Axis 	|
| <kbd>⇧</kbd> + <kbd>Y</kbd>  	| Rotate the cube cw around the Y-Axis  	|
| <kbd>Z</kbd>                  | Rotate the cube ccw around the Z-Axis 	|
| <kbd>⇧</kbd> + <kbd>Z</kbd> 	| Rotate the cube cw around the Z-Axis  	|
#### Other
| Key                           | Description                           	|
|-------------------------------|---------------------------------------	|
| <kbd>P</kbd>                  | Pause / Unpause the game                |
| <kbd>G</kbd>                  | Toggle 3D grid                         	|
| <kbd>F</kbd>                  | Switch between Gouraud & Phong Shading  |
| <kbd>V</kbd>                  | Switch between Orthographic & Perspective Viewing  |
