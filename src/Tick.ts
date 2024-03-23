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
