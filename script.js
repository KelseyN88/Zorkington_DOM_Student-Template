//CHECK TO MAKE SURE THIS PUSHED UP. LAST COMMIT 6/29 @ 1038PM "DEBUGGED COMMAND & CURRENTROOM ITEM ERRORS"

/* 
    TODO for students
        General Setup:
            - This object is framed for you to fill out the values to help customize your game.
            - This will alter the browser to display your game title. The "Quick Notes" modal will also detail your information along with the description (desc) of what your game is about. It is important to highlight key commands that you want the player to use.
            - The startingRoomDescription will display what the player sees upon coming to your project.

        Do NOT alter the name of this object.

        Both exports are required in order for this project to run.

        - index.html should be running in your browser through the build process.
            - use your browsers console throughout testing.
*/

export const gameDetails = {
  title: "Abandoned Barn",
  desc: `"Welcome to the world of mystery! Here are some quick rules & concepts... TO MOVE: Enter "move" followed by the room name. COMMANDS: "i" or "inventory" to view inventory, "view" to view current room, "inspect" to view items in the room. ITEM COMMANDS: enter "pickup" or "drop", followed by the item name.`,
  author: "Kelsey",
  cohort: "SBPT-May-2023",
  startingRoomDescription: `It's dark and raining. You're driving down the road when suddenly you smell something burning.
    You pull off onto a dirt road when you see smoke start to barrel out of the hood of your car. You need to get away from here! Next to you is a small knife and a flashlight.
    You notice an abandoned barn up ahead...maybe you can take cover there...`,
  playerCommands: [
    // replace these with your games commands as needed
    "move",
    "pickup",
    "drop",
    "inventory",
    "view",
    "inspect",
  ],
  // Commands are basic things that a player can do throughout the game besides possibly moving to another room. This line will populate on the footer of your game for players to reference.
  // This shouldn't be more than 6-8 different commands.
};

//==========================================================================================================================================================================

// Item Class
class Item {
  constructor(name, description, location, takeable) {
    (this.name = name),
      (this.description = description),
      (this.location = location);
    this.takeable = takeable;
  };
}; // end of Item class

// Items
let flashlight = new Item(
  "flashlight",
  "Its out of batteries, wont do me any good...",
  "car"
);
let knife = new Item(
  "knife",
  "A small pocket knife with a sharp edge...",
  "car",
  true
);
let rope = new Item(
  "rope",
  "This rope appears to be too frayed to be useful...",
  "barn"
);
let crowbar = new Item(
  "crowbar",
  "A sturdy crowbar could be used to pry something...",
  "barn",
  true
);
let mousetrap = new Item(
  "mousetrap",
  "This trap hasnt been set off yet, better not touch it...",
  "cellar"
);
let polaroid = new Item(
  "polaroid",
  "A polaroid picture of an old couple holding hands in their garden.. on the back is a handwritten date: '1997'...",
  "cellar",
  true
);
let hay = new Item(
  "hay",
  "Hay is for horses, what would I do with that...",
  "loft"
);
let matches = new Item(
  "matches",
  "A pack of matches, theres still some left!",
  "loft",
  true
);

// Item lookup Table
let itemLookup = {
  flashlight: flashlight, // cant use
  crowbar: crowbar,
  hay: hay, // cant use
  rope: rope, // cant use
  knife: knife,
  mousetrap: mousetrap, //cant use
  polaroid: polaroid,
  matches: matches,
};

// Room Class
class Room {
  constructor(name, description, items) {
    (this.name = name), (this.description = description), (this.items = items);
  }

  take(itemName) {
    const item = itemLookup[itemName];
    if (item && item.takeable) {
      const index = currentRoom.items.findIndex(
        (roomItem) => roomItem.name === itemName
        );
      if (index !== -1) {
        const removedItem = currentRoom.items.splice(index, 1)[0];
        playerInventory.push(removedItem);
        return `You picked up ${removedItem.name}: ${removedItem.description}`;
      } else {
        return `That item does not exist in this room.`;
      }
    } else if (item && !item.takeable) {
      return `${item.description}`;
    } else {
      return `That item does not exist.`;
    }
  };

  transition(newRoom) {
    const validTransitions = pathways[this.name];
    if (validTransitions.includes(newRoom)) {
      return newRoom;
    } else {
      return null;
    }
  };
}; // end of Room class

// Rooms
const car = new Room(
  "car",
  `You are in the car, you can get out and move to the old barn`,
  [flashlight, knife]
);
const barn = new Room(
  "barn",
  `You're on the main floor of the old barn, the moonlight shines through the rickety panels to illuminate the room just enough
    to see stairs to a loft or a dark opening that leads to the cellar.`,
  [crowbar, rope]
);
const cellar = new Room(
  "cellar",
  `You slowly creep down to the cellar... It's pretty scary down here! You might want to get back to the main floor of the barn.`,
  [mousetrap, polaroid]
);
const loft = new Room(
  "loft",
  `You climb the creeky ladder to the loft, It's dusty up here! You can move back down to the barn`,
  [hay, matches]
);

// Room Lookup Table
let roomLookup = {
  car: car,
  barn: barn,
  cellar: cellar,
  loft: loft,
};

// Some global variables:
let currentRoom = car;
let playerInventory = [];

// State Machine
const pathways = {
  car: ["barn"],
  barn: ["cellar", "loft"],
  loft: ["barn"],
  cellar: ["barn"],
};

// Command Lookup Table
let commandLookup = {
  inventory: ["i", "inventory"],
  use: ["use"],
  pickup: ["pickup", "grab"],
  drop: ["drop", "delete", "remove"],
  move: ["move", "go to", "move to"],
  view: ["view"],
  inspect: ["inspect"],
};

//=====================================================================

// DROPPING ITEMS - Adding items to room inventory (removing items from player inventory)
function leave(itemName) {
  const index = playerInventory.findIndex(
    (inventoryItem) => inventoryItem.name === itemName
  );
  if (index !== -1) {
    const removedItem = playerInventory.splice(index, 1)[0];
    currentRoom.items.push(removedItem);
    return `You dropped the ${removedItem.name}.`;
  } else {
    return `${itemName} is not in your inventory.`;
  }
};

export const domDisplay = (playerInput) => {
  // this must "return" a string not all code needs to be in this function
  /* 
        TODO: for students
        - This function must return a string. 
        - This will be the information that is displayed within the browsers game interface above the users input field.

        - This function name cannot be altered. 
        - "playerInput" is whatever text the user is typing within the input field in the browser after hitting the ENTER key.
            - test this out with a console log.

        What your player should be able to do (checklist):
            - move between rooms
            - view current room
            - pickup moveable items
                - there should be at least 2 items that cannot be moved.
            - view player inventory
        
        Stretch Goals:
            - drop items in "current room" (if a player picks up an item in one room and moves to another, they should be able to remove it from their inventory)
            - create win/lose conditions.
                - this could be a puzzle that may require an item to be within the players inventory to move forward, etc.

        HINTS:
            - consider the various methods that are available to use.
            - arrays are a great way to hold "lists".
            - You are not limited to just the exported function. Build additional functions and don't forget to hold the return within a variable.
            - Review notes!
                - Have them open as you build.
                - break down each problem into small chunks
                    - What is the process of picking up an item exactly? ex: Look. Pick from a list of items. Put into players list of items... 
    */

  // Your code here

  // Player input
  let inputArray = playerInput.split(" ");
  let command = inputArray[0];
  let item = inputArray.slice(1).join(" ");

  if (!playerInput === commandLookup) {
    return `I'm sorry, I don't know how to do that`
  }
  // FOR PICKING UP AN ITEM
  if (commandLookup.pickup.includes(command)) {
    let response = currentRoom.take(item);
    return response;
  };

  //MOVING ROOMS STATE FUNCTION
  if (commandLookup.move.includes(command)) {
    const newRoom = item; // reminder for myself: in this case item is the second part of the players input array
    const nextRoom = currentRoom.transition(newRoom);
    if (nextRoom) {
      currentRoom = roomLookup[nextRoom];
      return `You are in the ${nextRoom}: ${currentRoom.description}`;
    } else {
      return `I can't go that way, I'll try somewhere else...`;
    }
  };

  // VIEWING CURRENT ROOM
  if (commandLookup.view.includes(command)) {
    return currentRoom.description;
  };

  //  INSPECTING THE ROOM FOR ITEMS
  if (commandLookup.inspect.includes(command)) {
    if (currentRoom.items.length === 0) {
      return `There are no items to inspect in this room.`;
    } else {
      let itemsToInspect = currentRoom.items.map((item, i) => {
        return `${item.name}.`;
      });
      return `Items in this room: ${itemsToInspect.join("\n")}`;
    }
  };

  // DROPPING / LEAVING AN ITEM
  if (commandLookup.drop.includes(command)) {
    return leave(item);
  } else {
    null;
  };

  // CHECKING INVENTORY
  if (commandLookup.inventory.includes(command)) {
    if (commandLookup.inventory.includes(command)) {
      if (playerInventory.length > 0) {
        const items = playerInventory.map((item) => item.name).join(", ");
        return `Here is what I have currently: ${items}`;
      } else {
        return `My bag is empty.`;
      }
    } 
  }

  return `I'm sorry I don't know how to do that.`

}; // end of domDisplay function
