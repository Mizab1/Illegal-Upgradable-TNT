import { MCFunction, NBT, Selector, execute, particle, rel, summon } from "sandstone";
import { self } from "../Tick";
import { TNT_PARENT_ENTITY, explosionHandler, placeAndCreateFunction } from "./private/SetupGenerics";

export const setTntblock = MCFunction("custom_tnt/setblock", () => {
  execute
    .as(Selector("@e", { type: "minecraft:endermite", tag: "tnt.endermite" }))
    .at(self)
    .run(() => {
      // Creates the "Give TNT" function and does the processing if Custom TNT is placed
      placeAndCreateFunction("give_5x", "5x TNT", "5x", 110001);
    });
});

export const handler = MCFunction("custom_tnt/handler", () => {
  execute
    .as(Selector("@e", { type: TNT_PARENT_ENTITY, tag: "tnt.as" }))
    .at(self)
    .run(() => {
      // Cycle through all the available TNT and pick the correct handler
      explosionHandler(
        "tnt.5x",
        100,
        () => {
          particle("minecraft:flame", rel(0, 0, 0), [0.2, 0.2, 0.2], 0.1, 10, "force");
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(7),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        null,
        null
      );
    });
});
