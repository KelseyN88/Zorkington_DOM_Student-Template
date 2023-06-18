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
    title: 'Abandoned Barn',
    desc: 'Welcome to the world of mystery... here are some quick rules & concepts... To Move: enter move and room name Commands: i or inventory to view inventory. Item Commands: enter inspect, pickup, look, followed by item name',
    author: 'Kelsey',
    cohort: 'SBPT-May-2023',
    startingRoomDescription: `Its dark and raining. Youre driving down the road when suddenly you smell something burning,
    you pull off onto a dirt road when you see smoke start to barrel out of the hood of your car. You need to get away from there!
    You notice an abandoned barn up ahead...maybe you can take cover there?`,
    playerCommands: [
        // replace these with your games commands as needed
        'inspect', 'inventory', 'look', 'pickup','drop', 'move', 'view'
    ]
    // Commands are basic things that a player can do throughout the game besides possibly moving to another room. This line will populate on the footer of your game for players to reference. 
    // This shouldn't be more than 6-8 different commands.
}

//==========================================================================================================================================================================


let playerInventory = []

// State Machine
const pathways = {
    car: ["barn"],
    barn: ["cellar", "loft"],
    loft: ["barn"],
    cellar: ["barn"]
}

// Command Lookup Table
let commandLookup = {
    inventory: ["i", "inventory"],
    use: ["use"],
    pickup: ["pickup", "grab"],
    drop: ["drop", "delete", "remove"],
    move: ["move", "go to"],
    view: ["view"]
}



//=====================================================================
// Item Class
class Item {
    constructor(name, description, location, takeable) {
        this.name = name,
        this.description = description,
        this.location = location
        this.takeable = takeable
    }

    dropItem() {
        //should remove from personal inventory and add to room inventory
    }

    viewInventory() {
        //should pull up a list of items in personal inventory
    }

    takeable() {
        if (this.takeable) {
            // index of array slice & .push to player inventory
            return ` You picked up ${this.name}.`
        } else {
            return `${this.description}`
        }
    }

}


//=============================================================================

// Room Class
class Room {
    constructor(name, description, items, inventory) {
        this.name = name,
        this.description = description,
        this.items = items,
        this.inventory = []
    }

    addItem(item) { // adding items to room inventory

    }

}


// Items
let flashlight =  new Item("flashlight", "Its out of batteries...", "car", false)
let knife = new Item("knife", "a small pocket knife with a sharp edge...", "car", true)
let rope =  new Item("rope", "This rope appears to be too frayed to be useful...", "barn", false)
let crowbar = new Item("crowbar", "A sturdy crowbar could be used to pry something...", "barn", true)
let mousetrap = new Item("mousetrap", "this trap hasnt been set off yet, better not touch it...", "cellar", false)
let polaroid =  new Item("polaroid", "A polaroid picture of an older couple holding hands in their garden.. on the back is a handwritten date '1997'...", "cellar", true)
let hay =  new Item("hay", "hay is for horses...", "loft", false)
let matches = new Item("matches", "A pack of matches, theres still some left!", "loft", true)

// Rooms
const car = new Room("car", "You are in the car, you can get out and go to the old barn", [flashlight, knife])
const barn = new Room("barn", "Youre on the main floor of the old barn, the moonlight shines through the rickety panels to illuminate the room just enough to see stairs to a loft or a dark opening that leads to the cellar.", [crowbar, rope])
const cellar = new Room("cellar", "You slowly creep down to the cellar... its pretty scary down here!", [mousetrap, polaroid])
const loft = new Room("loft", "You climb the creeky ladder to the loft, its dusty up here!", [hay, matches])

// Room Lookup Table
let roomLookup = {
    car: car,
    barn: barn,
    cellar: cellar,
    loft: loft
}

// Item lookup Table
let itemLookup = {
    flashlight: flashlight, // cant use
    crowbar: crowbar,
    hay: hay, // cant use
    rope: rope, // cant use
    knife: knife,
    mousetrap: mousetrap, //cant use
    polaroid: polaroid,
    matches: matches
}

// Your code here

//create takeable item thing

export const domDisplay = (playerInput) => { // this must "return" a string not all code needs to be in this function
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
   

    while (true) {
        let currentRoom = car

    let inputArray = playerInput.split(" ")
    let command = inputArray[0]
    let thing = inputArray[1]

    if (commandLookup.pickup.includes(command)) {
    //  return Item.takeable()

    } else {
        return `Whoops, I dont know how to do that...`
    }

    }





} // end domDisplay function
