import { MCFunction, NBT, Selector, effect, execute, fill, kill, particle, rel, schedule, setblock, summon } from "sandstone";
import { self } from "../Tick";
import { randomIntFromInterval, randomWithDec } from "../Utils/Functions";
import { TNT_PARENT_ENTITY, explosionHandler, placeAndCreateFunction } from "./Private/SetupGenerics";

export const setTntblock = MCFunction("custom_tnt/setblock", () => {
  execute
    .as(Selector("@e", { type: "minecraft:endermite", tag: "tnt.endermite" }))
    .at(self)
    .run(() => {
      // Creates the "Give TNT" function and does the processing if Custom TNT is placed

      // Acid TNT
      placeAndCreateFunction("give_acid_tnt_stable", "Acid TNT: Stable", "acid.stable", 110001);
      placeAndCreateFunction("give_acid_tnt_risky", "Acid TNT: Risky", "acid.risky", 120001);
      placeAndCreateFunction("give_acid_tnt_critical", "Acid TNT: Critical", "acid.critical", 130001);

      // Horror TNT
      placeAndCreateFunction("give_horror_tnt_stable", "Horror TNT: Stable", "horror.stable", 110002);
      placeAndCreateFunction("give_horror_tnt_risky", "Horror TNT: Risky", "horror.risky", 120002);
      placeAndCreateFunction("give_horror_tnt_critical", "Horror TNT: Critical", "horror.critical", 130002);
    });
});

export const handler = MCFunction("custom_tnt/handler", () => {
  execute
    .as(Selector("@e", { type: TNT_PARENT_ENTITY, tag: "tnt.as" }))
    .at(self)
    .run(() => {
      // Cycle through all the available TNT and pick the correct handler

      // Acid TNT
      explosionHandler(
        "tnt.acid.stable",
        100,
        () => {
          // @ts-ignore
          particle("alexscaves:acid_bubble", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 2); // ! MOD USED
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
          schedule.function(() => {
            execute
              .as(Selector("@e", { type: "armor_stand", tag: "tnt.acid.marker" }))
              .at(self)
              .run(() => {
                const blocks: Array<string> = ["alexscaves:acidic_radrock", "alexscaves:radrock", "alexscaves:volcanic_core"]; // ! MOD USED
                for (let i = -3; i <= 3; i++) {
                  for (let j = -3; j <= 3; j++) {
                    for (let k = -3; k <= -1; k++) {
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
      explosionHandler(
        "tnt.acid.risky",
        100,
        () => {
          // @ts-ignore
          particle("alexscaves:amber_explosion", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 1); // ! MOD USED
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [0, 1, 0], 1, rel(0, 0.8, 0), [2, 2, 2], 0.1, 1000);

          // Place a lot of blocks
          const blocks: Array<string> = [
            "alexscaves:acidic_radrock",
            "alexscaves:radrock",
            "alexscaves:volcanic_core",
            "alexscaves:acid",
          ]; // ! MODS USED
          // Number of layers
          for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 90; j++) {
              let x = Math.cos(j) * i;
              let z = Math.sin(j) * i;

              execute.if
                .block(rel(0, -1, 0), "#aestd1:all_but_air")
                .run.setblock(rel(x, -1, z), blocks[Math.floor(Math.random() * blocks.length)]);
            }
          }

          // Spawn nucleeper
          for (let i = 1; i <= 4; i++) {
            summon("alexscaves:nucleeper", rel(0, 0, 0), {
              // ! MOD USED
              Motion: [randomWithDec(), 0.8, randomWithDec()],
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.acid.critical",
        100,
        () => {
          // @ts-ignore
          particle("alexscaves:amber_explosion", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 1); // ! MOD USED
          // @ts-ignore
          particle("alexscaves:acid_bubble", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 2); // ! MOD USED
          particle("minecraft:flame", rel(0, 0.8, 0), [0.1, 0.5, 0.1], 0.05, 2); // ! MOD USED
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [0, 1, 0], 1, rel(0, 0.8, 0), [2, 2, 2], 0.1, 1000);

          // Summon nuclear bomb and marker
          summon("alexscaves:nuclear_explosion", rel(0, 0, 0));
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Invisible: NBT.byte(1),
            Tags: ["tnt.acid_critical.marker"],
            Marker: NBT.byte(1),
            NoGravity: NBT.byte(1),
          });

          // Place a lot of blocks
          const blocks: Array<string> = ["alexscaves:acidic_radrock", "alexscaves:radrock", "alexscaves:acid"]; // ! MODS USED
          for (let i = 1; i <= 15; i++) {
            for (let j = 1; j <= 180; j++) {
              let x = Math.cos(j) * i * 3;
              let z = Math.sin(j) * i * 3;

              execute.if
                .block(rel(0, -1, 0), "#aestd1:all_but_air")
                .run.setblock(rel(x, -1, z), blocks[Math.floor(Math.random() * blocks.length)]);
            }
          }

          // Fill the hole and place mobs
          schedule.function(() => {
            execute
              .as(Selector("@e", { type: "armor_stand", tag: "tnt.acid_critical.marker" }))
              .at(self)
              .run(() => {
                // Spawn Mobs
                for (let i = 1; i <= 4; i++) {
                  summon("alexscaves:nucleeper", rel(0, 0, 0), {
                    Motion: [randomWithDec(), 0.8, randomWithDec()],
                  });
                }
                summon("alexscaves:tremorzilla", rel(0, 0, 0), {
                  Motion: [randomWithDec(), 0.8, randomWithDec()],
                });

                // Kill marker
                kill(self);
              });
          }, "60t");
        },
        null,
        null
      );

      // Horror TNT
      explosionHandler(
        "tnt.horror.stable",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:red_concrete", rel(0, 0.8, 0), [0.4, 0.4, 0.4], 0.1, 10);
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [1, 0, 0], 3, rel(0, 0.8, 0), [5, 5, 5], 0.1, 1000);

          // Fill Block
          const blocks: Array<string> = [
            "minecraft:redstone_block",
            "minecraft:red_concrete",
            "minecraft:red_terracotta",
            "minecraft:red_wool",
            "minecraft:red_mushroom_block",
            "iceandfire:chared_dirt",
            "iceandfire:chared_dirt_path",
            "iceandfire:dragonscale_red",
          ]; // ! MODS USED
          for (let i = 1; i <= 20; i++) {
            for (let j = 1; j <= 180; j++) {
              let x = Math.cos(j) * i;
              let z = Math.sin(j) * i;

              execute.if
                .block(rel(0, -1, 0), "#aestd1:all_but_air")
                .run.setblock(rel(x, -1, z), blocks[Math.floor(Math.random() * blocks.length)]);
            }
          }
          for (let i = 1; i <= 20; i++) {
            let x = Math.cos(randomIntFromInterval(-5, 5)) * i;
            let z = Math.sin(randomIntFromInterval(-5, 5)) * i;

            setblock(rel(x, 3, z), "minecraft:smooth_red_sandstone");
            setblock(rel(x, 2, z), "minecraft:smooth_red_sandstone");
            setblock(rel(x, 1, z), "minecraft:smooth_red_sandstone");
            setblock(rel(x, 0, z), "minecraft:smooth_red_sandstone");
          }

          // Give darkness effect
          effect.give(Selector("@a", { distance: [Infinity, 20] }), "minecraft:darkness", 5);

          // Summon the bats
          for (let i = 1; i <= 10; i++) {
            summon("alexscaves:vesper", rel(randomIntFromInterval(-6, 6), 1, randomIntFromInterval(-6, 6))); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.horror.risky",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:red_concrete", rel(0, 0.8, 0), [0.4, 0.4, 0.4], 0.1, 10);
          particle("minecraft:falling_dust", "minecraft:red_concrete", rel(0, 0.2, 0), [0.6, 0.2, 0.6], 0.1, 10);
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [1, 0, 0], 3, rel(0, 0.8, 0), [5, 5, 5], 0.1, 1000);

          // Fill Block
          const blocks: Array<string> = [
            "alexscaves:galena",
            "alexscaves:metal_swarf",
            "alexscaves:packed_galena",
            "alexscaves:scrap_metal_plate",
            "alexscaves:galena_stairs[facing=east]",
            "alexscaves:galena_stairs[facing=west]",
          ]; // ! MODS USED
          for (let i = 1; i <= 20; i++) {
            for (let j = 1; j <= 180; j++) {
              let x = Math.cos(j) * i;
              let z = Math.sin(j) * i;

              execute.if
                .block(rel(0, -1, 0), "#aestd1:all_but_air")
                .run.setblock(rel(x, -1, z), blocks[Math.floor(Math.random() * blocks.length)]);
            }
          }
          for (let i = 1; i <= 20; i++) {
            let x = Math.cos(randomIntFromInterval(-5, 5)) * i;
            let z = Math.sin(randomIntFromInterval(-5, 5)) * i;

            setblock(rel(x, 3, z), "alexscaves:galena_pillar");
            setblock(rel(x, 2, z), "alexscaves:galena_pillar");
            setblock(rel(x, 1, z), "alexscaves:galena_pillar");
            setblock(rel(x, 0, z), "alexscaves:galena_pillar");
          }

          // Give darkness effect
          effect.give(Selector("@a", { distance: [Infinity, 20] }), "minecraft:darkness", 10);

          // Summon the mobs
          for (let i = 1; i <= 5; i++) {
            summon("alexscaves:gloomoth", rel(randomIntFromInterval(-6, 6), 1, randomIntFromInterval(-6, 6))); // ! MODS USED
            summon("alexscaves:underzealot", rel(randomIntFromInterval(-6, 6), 1, randomIntFromInterval(-6, 6))); // ! MODS USED
            summon("alexscaves:corrodent", rel(randomIntFromInterval(-6, 6), 1, randomIntFromInterval(-6, 6))); // ! MODS USED
          }
          for (let i = 0; i < 2; i++)
            summon("alexscaves:watcher", rel(randomIntFromInterval(-3, 3), 1, randomIntFromInterval(-3, 3)));
        },
        null,
        null
      );
      explosionHandler(
        "tnt.horror.critical",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:red_concrete", rel(0, 0.8, 0), [0.4, 0.4, 0.4], 0.1, 10);
          particle("minecraft:falling_dust", "minecraft:red_concrete", rel(0, 0.2, 0), [0.6, 0.2, 0.6], 0.1, 10);
          // @ts-ignore
          particle("alexscaves:fallout", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 10); // ! MOD USED
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [1, 0, 0], 3, rel(0, 0.8, 0), [5, 5, 5], 0.1, 1000);

          // Fill Block
          // Fill Block
          const blocks: Array<string> = [
            "alexscaves:thornwood_wood",
            "alexscaves:porous_coprolith",
            "alexscaves:peering_coprolith",
            "minecraft:blackstone",
            "iceandfire:dread_stone_tile",
            "iceandfire:dread_stone_bricks_mossy",
            "iceandfire:dread_stone_bricks_cracked",
          ]; // ! MODS USED
          for (let i = 1; i <= 40; i++) {
            for (let j = 1; j <= 240; j++) {
              let x = Math.cos(j) * i;
              let z = Math.sin(j) * i;

              execute.if
                .block(rel(0, -1, 0), "#aestd1:all_but_air")
                .run.setblock(rel(x, -1, z), blocks[Math.floor(Math.random() * blocks.length)]);
            }
          }

          // Give darkness effect
          effect.give(Selector("@a", { distance: [Infinity, 20] }), "minecraft:darkness", 10);

          // Summon mobs
          for (let i = 1; i <= 2; i++)
            summon("alexscaves:forsaken", rel(randomIntFromInterval(-6, 6), 1, randomIntFromInterval(-6, 6))); // ! MODS USED

          for (let i = 1; i <= 10; i++)
            summon("alexscaves:vesper", rel(randomIntFromInterval(-10, 10), 1, randomIntFromInterval(-10, 10))); // ! MODS USED
        },
        null,
        null
      );
    });
});
