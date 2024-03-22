import { MCFunction, execute, Selector } from "sandstone";
import { fuseTime } from "../../Tick";
import { TNT_PARENT_ENTITY } from "./SetupGenerics";

/**
 * Ticking function for decrementing the fuse time after each time, called in the tick function
 */
export const decrementFuseTime = MCFunction("custom_tnt/decrement_fuse_time", () => {
  execute
    .as(
      Selector("@e", {
        type: TNT_PARENT_ENTITY,
        // tag: ["tnt.as", "!gravity_base"],
        tag: ["tnt.as"],
      })
    )
    .if(fuseTime.greaterThan(0))
    .run(() => {
      fuseTime.remove(1);
    });
});
