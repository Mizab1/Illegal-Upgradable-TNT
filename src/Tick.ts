import { MCFunction, Objective, Selector } from "sandstone";
import { addGravity } from "./CustomTnt/Private/AddGravityToTnt";
import { handler, setTntblock } from "./CustomTnt/Tick";
import { decrementFuseTime } from "./CustomTnt/Private/Fuse";
import { Fireball } from "./Objects/Fireball";
import { placementHandler } from "./CustomTnt/Private/ComputerHandler/PlacementHandler";
import { interactionHandler } from "./CustomTnt/Private/ComputerHandler/InteractionHandler";
import { decrementScheduleTimer } from "./CustomTnt/Private/ComputerHandler/ScheduleTimer";

const fuseTimeObj = Objective.create("fuse_time_obj", "dummy");
const rngObj = Objective.create("rng_obj", "dummy");
const privateObj = Objective.create("private_obj", "dummy");

export const fuseTime = fuseTimeObj("@s");

export const self = Selector("@s");

const tick = MCFunction(
  "tick",
  () => {
    // TNT related
    setTntblock();
    handler();
    decrementFuseTime();
    decrementScheduleTimer();
    addGravity();

    // Computer Related
    placementHandler();
    interactionHandler();

    // Dynamite
    // hitGround();

    // Disable slots of the Armor stand disguised as Custom TNT
    // teleportSlime();
    // spawnSlime();

    // Aux TNT functions

    // Fireball
    Fireball();
  },
  { runEachTick: true }
);

// Instructions
// summon text_display ~ ~-2 ~ {billboard:"vertical",alignment:"left",Tags:["instructions"],text:'[{"text":": Instructions to upgrade the TNTs :\\n","color":"gold"},{"text":"1. Place the TNT on the ground\\n","color":"white"},{"text":"2. Place the Laptop on top of the TNT\\n","color":"white"},{"text":"3. Right Click on the Laptop\\n","color":"white"},{"text":"4. Upgrade sequence will start","color":"white"}]'}
// Command to kill the mobs
// kill @e[type=!minecraft:player, type=!minecraft:armor_stand, type=!minecraft:item_frame]
// To Tp back to hub
// tp 186 78 -10
