# Proposal

I am planning on making a Minecraft like game. 

## Needs to have list

- 3d Objects yes
- Ability to move with keys WASD yes
- Pan camera with mouse yes
- Gravity and Collision (half fail (?))
- Use of WEBGL yes 

### Overworld map
- 3d noise terrain yes
- character moving around with WASD, camera with mouse-pointer, fov change yes
- breaks and place block (have not attempt)

### HUD/ GUI
- Inventory yes
- Arrow/direction yes
- Images/sounds failed (super laggy)


## Nice to have list
- Start/Dead (or creative mode)
- Shaders
- Smooth experience
- Import My Own Javascript Files To Make It Easy To See What Is Happening
- Multiplayer game with Socket.io

## Todo List

 1. Add a 3d box
 2. Make a Camera with movement
 3. Make multiple boxes
 4. Make a class that makes boxes
 5. Import other files
 6. use 2 p5 instances 2D and 3D.
 7. To increasee framerate, only load surface and chunk:
    - Surface:track the terrain and only display the first tier
    - Chunk: load 3x3 chunk from the center as the player,
    when player move to another chunk, deletes and load them. 
 8. Save blocks into text/json files (3d array box)
 9. Add a world generator terrain/images
 10. Add sounds
 11. Add field of view fovy
 

##### Where to see

* https://somethinggit.github.io/somethingGitsFinalPro/Main/
