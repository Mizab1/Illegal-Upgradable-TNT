import {
  MCFunction,
  NBT,
  Selector,
  effect,
  execute,
  fill,
  give,
  kill,
  particle,
  raw,
  rel,
  schedule,
  setblock,
  spreadplayers,
  summon,
  teleport,
  tellraw,
  time,
} from "sandstone";
import { self } from "../Tick";
import { fillRandom, genDiscOfBlock, randomIntFromInterval, randomWithDec } from "../Utils/Functions";
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

      // Dino TNT
      placeAndCreateFunction("give_dino_tnt_stable", "Dinosaur TNT: Stable", "dino.stable", 110003);
      placeAndCreateFunction("give_dino_tnt_risky", "Dinosaur TNT: Risky", "dino.risky", 120003);
      placeAndCreateFunction("give_dino_tnt_critical", "Dinosaur TNT: Critical", "dino.critical", 130003);

      // Magnetic TNT
      placeAndCreateFunction("give_magnetic_tnt_stable", "Magnetic TNT: Stable", "magnetic.stable", 110004);
      placeAndCreateFunction("give_magnetic_tnt_risky", "Magnetic TNT: Risky", "magnetic.risky", 120004);
      placeAndCreateFunction("give_magnetic_tnt_critical", "Magnetic TNT: Critical", "magnetic.critical", 130004);

      // Safari TNT
      placeAndCreateFunction("give_safari_tnt_stable", "Safari TNT: Stable", "safari.stable", 110005);
      placeAndCreateFunction("give_safari_tnt_risky", "Safari TNT: Risky", "safari.risky", 120005);
      placeAndCreateFunction("give_safari_tnt_critical", "Safari TNT: Critical", "safari.critical", 130005);

      // Twilight Forest TNT
      placeAndCreateFunction("give_twilight_tnt_stable", "Twilight Forest TNT: Stable", "twilight.stable", 110006);
      placeAndCreateFunction("give_twilight_tnt_risky", "Twilight Forest TNT: Risky", "twilight.risky", 120006);
      placeAndCreateFunction("give_twilight_tnt_critical", "Twilight Forest TNT: Critical", "twilight.critical", 130006);

      // Aquatic TNT
      placeAndCreateFunction("give_aquatic_tnt_stable", "Aquatic TNT: Stable", "aquatic.stable", 110007);
      placeAndCreateFunction("give_aquatic_tnt_risky", "Aquatic TNT: Risky", "aquatic.risky", 120007);
      placeAndCreateFunction("give_aquatic_tnt_critical", "Aquatic TNT: Critical", "aquatic.critical", 130007);

      // Ender TNT
      placeAndCreateFunction("give_ender_tnt_stable", "Ender TNT: Stable", "ender.stable", 110008);
      placeAndCreateFunction("give_ender_tnt_risky", "Ender TNT: Risky", "ender.risky", 120008);
      placeAndCreateFunction("give_ender_tnt_critical", "Ender TNT: Critical", "ender.critical", 130008);

      // Dragon TNT
      placeAndCreateFunction("give_dragon_tnt_stable", "Dragon TNT: Stable", "dragon.stable", 110009);
      placeAndCreateFunction("give_dragon_tnt_risky", "Dragon TNT: Risky", "dragon.risky", 120009);
      placeAndCreateFunction("give_dragon_tnt_critical", "Dragon TNT: Critical", "dragon.critical", 130009);
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
                fillRandom([-3, -3, -3], [3, -1, 3], "#aestd1:all_but_air", blocks);
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
          genDiscOfBlock(10, 90, -1, "#aestd1:all_but_air", blocks);

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
          genDiscOfBlock(15, 180, -1, "#aestd1:all_but_air", blocks, 3);

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

      // Dino TNT
      explosionHandler(
        "tnt.dino.stable",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:lava", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
        },
        () => {
          const markerEntityContext = Selector("@e", { type: "minecraft:armor_stand", tag: "tnt.dino.stable.marker" });

          // @ts-ignore
          particle("minecraft:dust", [0, 1, 0], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 1000);

          // Place a lot of blocks
          const blocks: Array<string> = [
            "minecraft:moss_block",
            "minecraft:mossy_cobblestone",
            "alexscaves:amber_monolith",
            "alexscaves:limestone",
          ]; // ! MODS USED
          // Number of layers
          genDiscOfBlock(20, 120, -1, "#aestd1:all_but_air", blocks);

          // Spawn tree marker
          for (let i = 1; i <= 8; i++)
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Invisible: NBT.byte(1),
              Tags: ["tnt.dino.stable.marker"],
              NoGravity: NBT.byte(1),
            });

          // Spread the marker
          spreadplayers(rel(0, 0), 4, 15, false, markerEntityContext);

          // Spawn trees
          execute
            .as(markerEntityContext)
            .at(self)
            .run(() => {
              raw(`place feature twilightforest:tree/canopy_tree ~ ~ ~`); // ! MODS USED
              kill(self);
            });

          // Spawn mods
          for (let i = 1; i <= 6; i++) {
            summon("alexscaves:subterranodon", rel(0, 0, 0), {
              Motion: [randomWithDec(), 0.8, randomWithDec()],
            }); // ! MODS USED
            summon("alexscaves:vallumraptor", rel(0, 0, 0), {
              Motion: [randomWithDec(), 0.8, randomWithDec()],
            }); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.dino.risky",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:lava", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 1);
          particle("minecraft:block", "alexscaves:volcanic_core", rel(0, 0.8, 0), [0.4, 0.4, 0.4], 0.1, 4); // ! MODS USED
        },
        () => {
          const markerEntityContext = Selector("@e", { type: "minecraft:armor_stand", tag: "tnt.dino.stable.marker" });

          // @ts-ignore
          particle("minecraft:dust", [0, 1, 0], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 1000);

          // Place a lot of blocks
          const blocks: Array<string> = ["minecraft:moss_block", "minecraft:mossy_cobblestone", "alexscaves:volcanic_core"]; // ! MODS USED
          genDiscOfBlock(30, 120, -1, "#aestd1:all_but_air", blocks);

          for (let i = 1; i <= 20; i++) {
            let x = Math.cos(randomIntFromInterval(-5, 5)) * i * 4;
            let z = Math.sin(randomIntFromInterval(-5, 5)) * i * 4;

            setblock(rel(x, 3, z), "alexscaves:volcanic_core");
            setblock(rel(x, 2, z), "alexscaves:volcanic_core");
            setblock(rel(x, 1, z), "alexscaves:volcanic_core");
            setblock(rel(x, 0, z), "alexscaves:volcanic_core");
          }

          // Spawn tree marker
          for (let i = 1; i <= 10; i++)
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Invisible: NBT.byte(1),
              Tags: ["tnt.dino.stable.marker"],
              NoGravity: NBT.byte(1),
            });

          // Spread the marker
          spreadplayers(rel(0, 0), 6, 25, false, markerEntityContext);

          // Spawn trees
          execute
            .as(markerEntityContext)
            .at(self)
            .run(() => {
              raw(`place feature twilightforest:tree/dead_canopy_tree ~ ~ ~`); // ! MODS USED
              kill(self);
            });

          // Spawn mods
          for (let i = 1; i <= 6; i++) {
            summon("alexscaves:grottoceratops", rel(0, 20, 0), { Tags: ["new"] }); // ! MODS USED
            summon("alexscaves:relicheirus", rel(0, 20, 0), { Tags: ["new"] }); // ! MODS USED
          }
          const newMob = Selector("@e", { tag: "new" });
          spreadplayers(rel(0, 0), 10, 20, false, newMob);
          execute.as(newMob).run.tag(self).remove("new");
        },
        null,
        null
      );
      explosionHandler(
        "tnt.dino.critical",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:lava", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 1);
          particle("minecraft:poof", rel(0, 0.8, 0), [0.1, 0.3, 0.1], 0.1, 3);
          particle("minecraft:block", "alexscaves:volcanic_core", rel(0, 0.8, 0), [0.4, 0.4, 0.4], 0.1, 4); // ! MODS USED
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [0, 1, 0], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 1000);

          // Spawn mods
          for (let i = 1; i <= 4; i++) {
            summon("alexscaves:tremorsaurus", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
          summon("alexscaves:luxtructosaurus", rel(0, 0, 0)); // ! MODS USED
        },
        null,
        null
      );

      // Magnetic TNT
      explosionHandler(
        "tnt.magnetic.stable",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "alexscaves:azure_neodymium_pillar", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2); // ! MODS USED
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [1, 0, 0], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 500);
          // @ts-ignore
          particle("minecraft:dust", [0, 0, 1], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 500);

          // Place a lot of blocks
          const blocks: Array<string> = ["alexscaves:azure_neodymium_pillar", "alexscaves:scarlet_neodymium_pillar"]; // ! MODS USED
          fillRandom([-5, -5, -5], [5, -1, 5], "#aestd1:all_but_air", blocks);

          // Spawn mods
          for (let i = 1; i <= 4; i++) {
            summon("alexscaves:ferrouslime", rel(0, 2, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexscaves:notor", rel(0, 2, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.magnetic.risky",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "alexscaves:azure_neodymium_pillar", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2); // ! MODS USED
          particle("minecraft:block", "alexscaves:scarlet_neodymium_pillar", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2); // ! MODS USED
        },
        () => {
          // @ts-ignore
          particle("minecraft:dust", [1, 0, 0], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 1000);
          // @ts-ignore
          particle("minecraft:dust", [0, 0, 1], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 1000);

          // Place a lot of blocks
          const blocks: Array<string> = [
            "alexscaves:azure_neodymium_pillar",
            "alexscaves:scarlet_neodymium_pillar",
            "alexscaves:block_of_azure_neodymium",
            "alexscaves:block_of_scarlet_neodymium",
          ]; // ! MODS USED
          fillRandom([-8, -5, -8], [8, -1, 8], "#aestd1:all_but_air", blocks);

          // Spawn mods
          for (let i = 1; i <= 4; i++) {
            summon("alexscaves:boundroid", rel(0, 2, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexscaves:teletor", rel(randomIntFromInterval(-1, 1), 2, randomIntFromInterval(-1, 1))); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.magnetic.critical",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "alexscaves:azure_neodymium_pillar", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2); // ! MODS USED
          particle("minecraft:block", "alexscaves:scarlet_neodymium_pillar", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2); // ! MODS USED
          // @ts-ignore
          particle("alexscaves:magnetic_caves_ambient", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 1); // ! MODS USED
        },
        () => {
          const markerEntityContext = Selector("@e", { type: "minecraft:armor_stand", tag: "tnt.magnetic.critical.marker" });

          // @ts-ignore
          particle("minecraft:dust", [1, 0, 0], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 1000);
          // @ts-ignore
          particle("minecraft:dust", [0, 0, 1], 3, rel(0, 0.8, 0), [10, 10, 10], 0.1, 1000);

          // Place a lot of blocks
          const blocks: Array<string> = [
            "alexscaves:azure_neodymium_pillar",
            "alexscaves:scarlet_neodymium_pillar",
            "alexscaves:block_of_azure_neodymium",
            "alexscaves:block_of_scarlet_neodymium",
            "alexscaves:scrap_metal",
            "alexscaves:scrap_metal_plate",
          ]; // ! MODS USED
          fillRandom([-10, -5, -10], [10, -1, 10], "#aestd1:all_but_air", blocks);

          // Spawn tesla bulb marker
          for (let i = 1; i <= 5; i++)
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Invisible: NBT.byte(1),
              Tags: ["tnt.magnetic.critical.marker"],
              NoGravity: NBT.byte(1),
            });

          // Spread the marker
          spreadplayers(rel(0, 0), 2, 10, false, markerEntityContext);

          // Spawn tesla bulb
          execute
            .as(markerEntityContext)
            .at(self)
            .run(() => {
              setblock(rel(0, 0, 0), "alexscaves:tesla_bulb"); // ! MODS USED
              kill(self);
            });

          // Spawn mods
          for (let i = 1; i <= 3; i++) {
            summon("alexscaves:boundroid", rel(0, 2, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexscaves:teletor", rel(randomIntFromInterval(-1, 1), 2, randomIntFromInterval(-1, 1))); // ! MODS USED
          }
          for (let i = 1; i <= 2; i++)
            summon("alexscaves:magnetron", rel(0, 2, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
        },
        null,
        null
      );

      // Safari TNT
      explosionHandler(
        "tnt.safari.stable",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:grass_block", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
        },
        () => {
          particle("minecraft:happy_villager", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Place a lot of blocks
          const blocks: Array<string> = ["minecraft:grass_block"];
          genDiscOfBlock(10, 45, -1, "#aestd1:all_but_air", blocks);
          genDiscOfBlock(10, 15, 0, "#aestd1:air", "minecraft:grass");

          // Spawn mods
          for (let i = 1; i <= 5; i++) {
            summon("alexsmobs:blue_jay", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:crow", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:gazelle", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:hummingbird", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:maned_wolf", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:sugar_glider", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:toucan", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.safari.risky",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:grass_block", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
          particle("minecraft:block", "minecraft:mossy_stone_bricks", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
        },
        () => {
          particle("minecraft:angry_villager", rel(0, 1, 0), [10, 2, 10], 0.1, 250);

          // Place a lot of blocks
          const blocks: Array<string> = ["minecraft:grass_block", "minecraft:mossy_stone_bricks", "minecraft:mossy_cobblestone"];
          genDiscOfBlock(20, 45, -1, "#aestd1:all_but_air", blocks);

          // Spawn mods
          for (let i = 1; i <= 4; i++) {
            summon("alexsmobs:elephant", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:gorilla", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:snow_leopard", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:rhinoceros", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:rattlesnake", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:kangaroo", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.safari.critical",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:grass_block", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
          particle("minecraft:block", "alexsmobs:leafcutter_ant_chamber", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
          particle("minecraft:block", "alexsmobs:bison_fur_block", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
        },
        () => {
          particle("minecraft:poof", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Place a lot of blocks
          const blocks: Array<string> = [
            "alexsmobs:bison_fur_block",
            "alexsmobs:leafcutter_ant_chamber",
            "alexsmobs:leafcutter_anthill",
            "minecraft:grass_block",
          ]; // ! MODS USED
          genDiscOfBlock(30, 45, -1, "#aestd1:all_but_air", blocks);

          // Spawn mods
          for (let i = 1; i <= 3; i++) {
            summon("alexsmobs:rhinoceros", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:elephant", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:gorilla", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:grizzly_bear", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:tiger", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:anaconda", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:crocodile", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:komodo_dragon", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("alexsmobs:centipede_head", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
        },
        null,
        null
      );

      // Twilight Forest TNT
      explosionHandler(
        "tnt.twilight.stable",
        100,
        () => {
          // @ts-ignore
          particle("twilightforest:firefly", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 1);
          particle("minecraft:flame", rel(0, 0.8, 0), [0.0, 0.1, 0.0], 0.1, 1);
        },
        () => {
          particle("minecraft:happy_villager", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Make a hole
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(3),
            CustomName: '{"text":"TNT","italic":false}',
          });
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Invisible: NBT.byte(1),
            Tags: ["tnt.twilight_stable.marker"],
            Marker: NBT.byte(1),
            NoGravity: NBT.byte(1),
          });

          // Fill the hole
          schedule.function(() => {
            execute
              .as(Selector("@e", { type: "armor_stand", tag: "tnt.twilight_stable.marker" }))
              .at(self)
              .run(() => {
                const blocks: Array<string> = ["minecraft:grass_block"]; // ! MOD USED
                fillRandom([-8, -3, -8], [8, -1, 8], "#aestd1:all_but_air", blocks);
                fill(rel(5, -1, 5), rel(-5, -5, -5), "minecraft:water replace #aestd1:air");

                // Spawn Mobs
                for (let i = 1; i <= 3; i++) {
                  summon("twilightforest:carminite_broodling", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:fire_beetle", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:hedge_spider", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:helmet_crab", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:swarm_spider", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:kobold", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                }

                kill(self);
              });
          }, "2t");
        },
        null,
        null
      );
      explosionHandler(
        "tnt.twilight.risky",
        100,
        () => {
          // @ts-ignore
          particle("twilightforest:firefly", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 1);
          particle("minecraft:soul_fire_flame", rel(0, 0.8, 0), [0.0, 0.1, 0.0], 0.1, 1);
        },
        () => {
          particle("minecraft:angry_villager", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Set the time to night
          time.set("night");

          // Make a hole
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(6),
            CustomName: '{"text":"TNT","italic":false}',
          });
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Invisible: NBT.byte(1),
            Tags: ["tnt.twilight_stable.marker"],
            Marker: NBT.byte(1),
            NoGravity: NBT.byte(1),
          });

          // Fill the hole
          schedule.function(() => {
            execute
              .as(Selector("@e", { type: "armor_stand", tag: "tnt.twilight_stable.marker" }))
              .at(self)
              .run(() => {
                const blocks: Array<string> = ["minecraft:grass_block", "minecraft:mossy_cobblestone"]; // ! MOD USED
                fillRandom([-10, -3, -10], [10, -1, 10], "#aestd1:all_but_air", blocks);
                fill(rel(5, -1, 5), rel(-5, -5, -5), "minecraft:water replace #aestd1:air");

                // Spawn Mobs
                for (let i = 1; i <= 3; i++) {
                  summon("twilightforest:king_spider", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:death_tome", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:yeti", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:skeleton_druid", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:minotaur", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                }
                summon("twilightforest:lich", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED

                kill(self);
              });
          }, "2t");
        },
        null,
        null
      );
      explosionHandler(
        "tnt.twilight.critical",
        100,
        () => {
          // @ts-ignore
          particle("twilightforest:ominous_flame", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 8); // ! MOD USED
          // @ts-ignore
          particle("twilightforest:snow_guardian", rel(0, 0.8, 0), [0.4, 0.4, 0.4], 0.1, 5);
          particle("minecraft:block", "minecraft:snow_block", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 4);
        },
        () => {
          particle("minecraft:angry_villager", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Set the time to night
          time.set("night");

          // Make a hole
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(6),
            CustomName: '{"text":"TNT","italic":false}',
          });
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Invisible: NBT.byte(1),
            Tags: ["tnt.twilight_stable.marker"],
            Marker: NBT.byte(1),
            NoGravity: NBT.byte(1),
          });

          // Fill the hole
          schedule.function(() => {
            execute
              .as(Selector("@e", { type: "armor_stand", tag: "tnt.twilight_stable.marker" }))
              .at(self)
              .run(() => {
                const blocks: Array<string> = ["minecraft:grass_block", "minecraft:mossy_cobblestone", "minecraft:snow_block"]; // ! MOD USED
                fillRandom([-15, -3, -15], [15, -1, 15], "#aestd1:all_but_air", blocks);
                fill(rel(6, -1, 6), rel(-6, -6, -6), "minecraft:water replace #aestd1:air");

                // Spawn Mobs
                for (let i = 1; i <= 3; i++) {
                  summon("twilightforest:carminite_ghastguard", rel(0, 1, 0), {
                    Motion: [randomWithDec(), 0.8, randomWithDec()],
                  }); // ! MODS USED
                  summon("twilightforest:carminite_golem", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:adherent", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:wraith", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                  summon("twilightforest:mist_wolf", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                }
                summon("twilightforest:hydra", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
                summon("twilightforest:ur_ghast", rel(0, 1, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED

                kill(self);
              });
          }, "2t");
        },
        () => {
          // Set the time to night
          time.set("night");
        },
        null
      );

      // Aquatic TNT
      explosionHandler(
        "tnt.aquatic.stable",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:water", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
          particle("minecraft:falling_water", rel(0, 0.8, 0), [0.5, 0.5, 0.5], 0.1, 4);
        },
        () => {
          particle("minecraft:falling_water", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Fill with water
          fill(rel(-8, -5, -8), rel(8, 0, 8), "minecraft:water replace #aestd1:all_but_air");

          // Spawn mods
          for (let i = 1; i <= 15; i++) {
            summon("alexscaves:lanternfish", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            summon("alexscaves:sea_pig", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            summon("alexscaves:trilocaris", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
          }
          for (let i = 1; i <= 8; i++) {
            summon("alexscaves:gossamer_worm", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            summon("alexscaves:tripodfish", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.aquatic.risky",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:water", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
          particle("minecraft:falling_water", rel(0, 0.8, 0), [0.5, 0.5, 0.5], 0.1, 4);
          particle("minecraft:flame", rel(0, 0.8, 0), [0.0, 0.1, 0.0], 0.1, 1);
        },
        () => {
          // Change the positional context
          execute.positioned(rel(0, -60, 0)).run(() => {
            // Make a cube of water
            for (let i = -20; i <= 20; i++) {
              fill(rel(-20, i, -20), rel(20, i, 20), "minecraft:water");
            }

            // Summon mobs
            for (let i = 1; i <= 25; i++) {
              summon("alexscaves:lanternfish", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            }
            for (let i = 1; i <= 6; i++) {
              summon("alexscaves:hullbreaker", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            }
            for (let i = 1; i <= 8; i++) {
              summon("alexscaves:deep_one", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
              summon("alexscaves:deep_one_knight", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
              summon("alexscaves:deep_one_mage", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            }

            // Teleport player
            teleport("@a", rel(0, 0, 0));

            // Give diving suit to the player
            give("@a", "alexscaves:diving_helmet", 1); // ! MODS USED
            give("@a", "alexscaves:diving_boots", 1); // ! MODS USED
            give("@a", "alexscaves:diving_chestplate", 1); // ! MODS USED
            give("@a", "alexscaves:diving_leggings", 1); // ! MODS USED
            raw(`give @p potion{Potion:"alexscaves:deepsight"} 4`); // ! MODS USED

            tellraw("@a", { text: "You've got a diving suit and deep vision potion!", color: "gold" });
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.aquatic.critical",
        100,
        () => {
          // @ts-ignore
          particle("minecraft:block", "minecraft:water", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
          particle("minecraft:block", "minecraft:snow_block", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 2);
          particle("minecraft:falling_water", rel(0, 0.8, 0), [0.5, 0.5, 0.5], 0.1, 4);
          particle("minecraft:flame", rel(0, 0.8, 0), [0.0, 0.1, 0.0], 0.1, 1);
          particle("minecraft:soul_fire_flame", rel(0, 0.8, 0), [0.0, 0.1, 0.0], 0.1, 1);
        },
        () => {
          // Change the positional context
          execute.positioned(rel(0, -60, 0)).run(() => {
            // Make a cube of water
            for (let i = -40; i <= 40; i++) {
              fill(rel(-40, i, -40), rel(40, i, 40), "minecraft:water");
            }

            // Summon mobs
            for (let i = 1; i <= 40; i++) {
              summon("alexscaves:lanternfish", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            }
            for (let i = 1; i <= 10; i++) {
              summon("alexscaves:hullbreaker", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
              summon("alexscaves:mine_guardian", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            }
            for (let i = 1; i <= 15; i++) {
              summon("alexscaves:deep_one", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
              summon("alexscaves:deep_one_knight", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
              summon("alexscaves:deep_one_mage", rel(0, -2, 0), { Motion: [randomWithDec(), 0.1, randomWithDec()] }); // ! MODS USED
            }

            // Teleport player
            teleport("@a", rel(0, 0, 0));

            // Give diving suit to the player
            give("@a", "alexscaves:diving_helmet", 1); // ! MODS USED
            give("@a", "alexscaves:diving_boots", 1); // ! MODS USED
            give("@a", "alexscaves:diving_chestplate", 1); // ! MODS USED
            give("@a", "alexscaves:diving_leggings", 1); // ! MODS USED

            give("@a", "alexscaves:submarine", 1); // ! MODS USED
            raw(`give @p potion{Potion:"alexscaves:deepsight"} 4`); // ! MODS USED

            tellraw("@a", { text: "You've got a diving suit and deep vision potion and submarine!", color: "gold" });
          });
        },
        null,
        null
      );

      // Ender TNT
      explosionHandler(
        "tnt.ender.stable",
        100,
        () => {
          particle("minecraft:portal", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 4);
        },
        () => {
          particle("minecraft:poof", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Fill blocks
          const blocks: Array<string> = ["minecraft:end_stone", "minecraft:end_stone_bricks", "cataclysm:polished_end_stone"]; // ! MOD USED
          fillRandom([-8, -5, -8], [8, -1, 8], "#aestd1:all_but_air", blocks);

          // Spawn mods
          for (let i = 1; i <= 15; i++) {
            summon("minecraft:enderman", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] });
            summon("cataclysm:endermaptera", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ender.risky",
        100,
        () => {
          particle("minecraft:portal", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 4);
          particle("minecraft:soul_fire_flame", rel(0, 0.8, 0), [0.0, 0.1, 0.0], 0.1, 1);
        },
        () => {
          particle("minecraft:poof", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Fill blocks
          const blocks: Array<string> = [
            "minecraft:end_stone",
            "minecraft:end_stone_bricks",
            "cataclysm:polished_end_stone",
            "cataclysm:chorus_stem",
          ]; // ! MOD USED
          fillRandom([-12, -5, -12], [12, -1, 12], "#aestd1:all_but_air", blocks);

          // Spawn mods
          for (let i = 1; i <= 15; i++) {
            summon("minecraft:enderman", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] });
          }
          for (let i = 1; i <= 2; i++) {
            summon("cataclysm:ender_golem", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] });
          }

          // Give items to every player
          give("@a", "minecraft:ender_pearl", 8);
          give("@a", "cataclysm:void_forge", 1); // ! MODS USED

          tellraw("@a", { text: "You've got enderpearls and a voidforge!", color: "gold" });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ender.critical",
        100,
        () => {
          particle("minecraft:portal", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 4);
          particle("minecraft:soul_fire_flame", rel(0, 0.8, 0), [0.0, 0.1, 0.0], 0.1, 2);
          particle("minecraft:block", "minecraft:end_stone", rel(0, 0.8, 0), [0.0, 0.1, 0.0], 0.1, 3);
        },
        () => {
          particle("minecraft:poof", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Fill blocks
          const blocks: Array<string> = [
            "minecraft:end_stone",
            "minecraft:end_stone_bricks",
            "cataclysm:polished_end_stone",
            "cataclysm:chorus_stem",
            "cataclysm:void_stone",
          ]; // ! MOD USED
          fillRandom([-12, -5, -12], [12, -1, 12], "#aestd1:all_but_air", blocks);

          // Spawn mods
          for (let i = 1; i <= 15; i++) {
            summon("minecraft:enderman", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] });
          }
          for (let i = 1; i <= 3; i++) {
            summon("cataclysm:ender_golem", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] });
          }
          summon("cataclysm:ender_guardian", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] });

          // Give items to every player
          give("@a", "minecraft:ender_pearl", 16);
          give("@a", "cataclysm:void_forge", 1); // ! MODS USED
          give("@a", "cataclysm:tidal_claws", 1); // ! MODS USED
          give("@a", "cataclysm:void_assault_shoulder_weapon", 1); // ! MODS USED

          tellraw("@a", { text: "You've got some weapons in your inventory!", color: "gold" });
        },
        null,
        null
      );

      // Dragon TNT
      explosionHandler(
        "tnt.dragon.stable",
        100,
        () => {
          particle("minecraft:block", "minecraft:grass_block", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 4);
        },
        () => {
          particle("minecraft:poof", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Fill blocks
          fill(rel(-6, -4, -6), rel(6, -1, 6), "minecraft:grass_block");

          // Spawn mods
          for (let i = 1; i <= 8; i++) {
            summon("iceandfire:hippocampus", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("iceandfire:hippogryph", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("iceandfire:amphithere", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.dragon.risky",
        100,
        () => {
          particle("minecraft:block", "minecraft:redstone_block", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 4);
        },
        () => {
          particle("minecraft:poof", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Fill blocks
          const blocks: Array<string> = ["minecraft:grass_block", "minecraft:red_terracotta"];
          fillRandom([-8, -4, -8], [8, -1, 8], "#aestd1:all_but_air", blocks);

          // Spawn mods
          for (let i = 1; i <= 8; i++) {
            summon("iceandfire:cockatrice", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("iceandfire:stymphalian_bird", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("iceandfire:amphithere", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.dragon.critical",
        100,
        () => {
          particle("minecraft:block", "minecraft:packed_ice", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 4);
          particle("minecraft:block", "minecraft:water", rel(0, 0.8, 0), [0.3, 0.3, 0.3], 0.1, 4);
        },
        () => {
          particle("minecraft:poof", rel(0, 1, 0), [10, 2, 10], 0.1, 500);

          // Fill blocks
          const blocks: Array<string> = ["minecraft:water", "minecraft:packed_ice"];
          genDiscOfBlock(15, 90, -1, "#aestd1:all_but_air", blocks, 2);

          // Spawn mobs
          for (let i = 1; i <= 8; i++) {
            summon("iceandfire:amphithere", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("iceandfire:cockatrice", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
            summon("iceandfire:stymphalian_bird", rel(0, 0, 0), { Motion: [randomWithDec(), 0.8, randomWithDec()] }); // ! MODS USED
          }
          for (let i = 1; i <= 3; i++) {
            summon("iceandfire:ice_dragon", rel(0, 0, 0), {
              Motion: [randomWithDec(), 0.8, randomWithDec()],
              AgeTicks: i * 1000000,
            }); // ! MODS USED
          }
        },
        null,
        null
      );
    });
});
