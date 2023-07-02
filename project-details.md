# Added Stretch Goal Site Link:
https://funny-lamington-c38fad.netlify.app/

---

## gameDetails Object

This gameDetails object will display information for the player to read including
 - title of the game
 - game description and game controls neccessary for the player to play the game
 - starting room information so set the stage of where the player is starting 
 - exact commands the player is able to do to interact with rooms and items throughout the game  

---

## Item Class

This creates a structure or a blueprint that will be applied to all items created in the game. Each item will have a 
- item name
- item description
- which room the item is initially located
- whether or not the player is able to pick up the item and add to inventory

---

## Creating new items for game play

Creating the actual items themselves ranging from flashlight to stone for the player to interact with (pickup, drop, inspect, inventory). Each item has its own information based on the Item Class blueprint we created for items.
- item name
- item description
- which room the item is initially located
- true or false: whether or not the player is able to pick up the item and add to inventory

---

## Item lookup Table

The item lookup table is an easy way for us to refrence our items and their associated information. We can refrence the items without having to look through the entire item collection.

---

## Room Class
 creating a room blueprint that will apply the structure of all Rooms created. Each room will include
- room name
- room description
- items currently available in the room to interact with
- Whether the room is locked or not represented by a true or false value

### Methods on the room class:

### take method:
The take method will determine whether or not a player can take an item from the room and add it to their player inventory. If the item that a player inputs exists **AND** has a takeable value of true, then it will be removed from the current rooms inventory and added to the players inventory.
If the item is NOT takeable and has a takeable value of false, then the game will simply read off the items description stating why the item would not be useful for the player to pick up, and it will **not** add it to the players inventory it will stay in the room inventory.

## transition method:
The transition method will determine which rooms the player can move to and from. If the room the player wants to move to is a valid transition move, then the game will allow the player to move and it will read the description of the new room. Valid transitions are determined by the "pathways" object (refrenced later in this file.)
If the room the player wants to move to is not a valid transition, then the player will be given a message stating that they cannot go that way.

---

## Rooms
Creating the actual rooms themselves. car, barn, cellar, loft, and den are all rooms the player can move in and out of. Each room follows the room class blueprint we created for Rooms. Each room will have:
- room name
- room description
- items available to interact with in the room (room inventory)
- whether the room is locked or not represented by a true or false value

---

## Room lookup table
Like the item lookup table, the Room lookup table is an easy way for us to refrence our rooms and their associated information. We can refrence the rooms without having to look through the entire room collection.

---

## Global Variables
There are 2 global variables here:
- the starting "room" that the player begins the game in. In this case its the car. The value of currentRoom changes throughout the game.
- player inventory is available to the player to check what items they have picked up and currently have.

These global variables are global meaning they are not trapped in any functions or methods and we can call upon or refrence them from anywhere in our code.

---

## Pathways
This object lays out a map for valid transitions the player can make. For example: you can move from the car to the barn because the value of the car here is barn. but you cannot move from the loft to the car because the only value for loft is back to the barn. If the player tries to make an invalid move we have programed the game to give them an error telling them to try again.

---

## Command Lookup
These are all the player commands and the ways that they can type them into the input field. For example: the value of "inventory" is both typing out the full word "inventory" OR the player can type "i" because weve added that as another value of inventory command.

---

## Leave Function
This is a machine we can call on when a player wants to "drop" an item that is in their playerInventory. If the item exists in the player inventory then it will remove the item and leave it in the current room the player is in. Effectively adding it into the current rooms inventory. If the player tries dropping an item they do not have then the game will tell them that item is not in their inventory.

---

## domDisplay Function
This function holds all of what the player inputs into our game. it will check if what the player has input is a valid command (move, pickup, drop, view, inspect, inventory) and if it is then it will carry out the corresponding functionality:

### move
If the player inputs the command "move" and a valid room name then the current room becomes the next room and the player gets a message saying theyre in the new room and the description of that new room.

### view
If the player inputs the command "view" then the game will read off the description of the current room they are in.

### inspect
If the player inputs the word "inspect" then the game will name off all the items that are in the room they are currently in from the rooms inventory. If the room is empty it will say there are no items in this room.

### drop
If the player inputs the command "drop" then the game will carry out the code from the leave function refrenced earlier.

### inventory
If the player inputs the command "inventory" or "i" then the game will show the player all the items they have picked up and have currently in their player inventory. If the player inventory is empty then the game will say the players bag is empty.

---

## Not a command
If the player inputs a command that doesnt exist like "push" for example. then the game will return an error message saying "im sory i dont know how to do that"

