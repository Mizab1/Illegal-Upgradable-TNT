import { MCFunction, NBT, Selector, data, execute } from "sandstone";
import { self } from "../../Tick";

export const addGravity = MCFunction("custom_tnt/auxillary/gravity_tnt/add_gravity", () => {
  // Add the gravity to the TNT
  execute
    .as(
      Selector("@e", {
        type: "minecraft:armor_stand",
        tag: ["tnt.as", "is_primed"],
      })
    )
    .run(() => {
      data.merge.entity(self, {
        NoGravity: NBT.byte(0),
      });
    });
});
