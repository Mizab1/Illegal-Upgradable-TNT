import { MCFunction, Objective, Selector } from "sandstone";
import { AddGravity } from "./CustomTnt/Private/AddGravityToTnt";
import { handler, setTntblock } from "./CustomTnt/Tick";
import { decrementFuseTime } from "./CustomTnt/Private/Fuse";
import { Fireball } from "./Objects/Fireball";

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
    AddGravity();

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
