import { MCFunction, NBT, Selector, execute, fill, kill, particle, rel, say, schedule, setblock, summon } from "sandstone";
import { self } from "../Tick";
import { TNT_PARENT_ENTITY, explosionHandler, placeAndCreateFunction } from "./Private/SetupGenerics";

export const setTntblock = MCFunction("custom_tnt/setblock", () => {
  execute
    .as(Selector("@e", { type: "minecraft:endermite", tag: "tnt.endermite" }))
    .at(self)
    .run(() => {
      // Creates the "Give TNT" function and does the processing if Custom TNT is placed
      placeAndCreateFunction("give_5x", "5x TNT", ["5x", "5x.stable"], 110001);
    });
});

export const handler = MCFunction("custom_tnt/handler", () => {
  execute
    .as(Selector("@e", { type: TNT_PARENT_ENTITY, tag: "tnt.as" }))
    .at(self)
    .run(() => {
      // Cycle through all the available TNT and pick the correct handler
      explosionHandler(
        "tnt.5x.stable",
        100,
        () => {
          // @ts-ignore
          particle("alexscaves:acid_bubble", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 2);
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [0, 1, 0], 1, rel(0, 0.8, 0), [2, 2, 2], 0.1, 1000);

          // Make a hole
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(3),
            CustomName: '{"text":"TNT","italic":false}',
          });
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Invisible: NBT.byte(1),
            Tags: ["tnt.acid.marker"],
            Marker: NBT.byte(1),
            NoGravity: NBT.byte(1),
          });

          // Fill the hole with acid
          // ! MOD USED
          schedule.function(() => {
            execute
              .as(Selector("@e", { type: "armor_stand", tag: "tnt.acid.marker" }))
              .at(self)
              .run(() => {
                const blocks: Array<string> = ["alexscaves:acidic_radrock", "alexscaves:radrock", "alexscaves:volcanic_core"];
                for (let i = -3; i <= 3; i++) {
                  for (let j = -3; j <= 3; j++) {
                    for (let k = -3; k <= 1; k++) {
                      execute
                        .positioned(rel(i, k, j))
                        .if.block(rel(0, 0, 0), "#aestd1:all_but_air")
                        .run(() => {
                          setblock(rel(0, 0, 0), blocks[Math.floor(Math.random() * blocks.length)]);
                        });
                    }
                  }
                }
                fill(rel(5, -1, 5), rel(-5, -5, -5), "alexscaves:acid replace #aestd1:air");
                kill(self);
              });
          }, "2t");
        },
        null,
        null
      );
    });
});
