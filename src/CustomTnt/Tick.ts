import {
  MCFunction,
  MCFunctionInstance,
  NBT,
  Selector,
  _,
  data,
  execute,
  fill,
  gamerule,
  kill,
  particle,
  playsound,
  raw,
  rel,
  schedule,
  setblock,
  spreadplayers,
  summon,
  tp,
} from "sandstone";
import { self } from "../Tick";
import * as lodash from "lodash";
import {
  explosionHandler,
  placeAndCreateFunction,
} from "./private/SetupGenerics";
import { b, randomIntFromInterval } from "../Utils/Functions";
import { tpAhead } from "./Auxillary/InvertedTnt/TpAhead";
import { pushBackApi } from "../Utils/PushBackApi";

export const setTntblock = MCFunction("custom_tnt/setblock", () => {
  execute
    .as(Selector("@e", { type: "minecraft:endermite", tag: "tnt.endermite" }))
    .at(self)
    .run(() => {
      // Creates the "Give TNT" function and does the processing if Custom TNT is placed
      placeAndCreateFunction(
        "give_meteorite",
        "Meteorite TNT",
        "meteor",
        120001
      );
      placeAndCreateFunction("give_snow", "Snow TNT", "snow", 120002);
      placeAndCreateFunction("give_water", "Water TNT", "water", 120003);
      placeAndCreateFunction("give_ice", "Ice TNT", "ice", 120004);
      placeAndCreateFunction("give_arrow", "Arrow TNT", "arrow", 120005);
      placeAndCreateFunction("give_volcano", "Volcano TNT", "volcano", 120006);
      placeAndCreateFunction("give_gravity", "Gravity TNT", "gravity", 120007);
      placeAndCreateFunction("give_ghost", "Ghost TNT", "ghost", 120008);
      placeAndCreateFunction("give_ender", "Ender TNT", "ender", 120009);
      placeAndCreateFunction(
        "give_inverted",
        "Inverted TNT",
        "inverted",
        120010
      );

      // CustomTNT 0 Pack Merged
      placeAndCreateFunction("give_5x", "5x TNT", "5x", 110001);
      placeAndCreateFunction("give_10x", "10x TNT", "10x", 110002);
      placeAndCreateFunction("give_20x", "20x TNT", "20x", 110003);
      placeAndCreateFunction("give_house", "House TNT", "house", 110004);
      placeAndCreateFunction("give_mobs", "Mobs TNT", "animals", 110005);
      placeAndCreateFunction(
        "give_lightning",
        "Lightning Strike TNT",
        "lightning",
        110006
      );
      placeAndCreateFunction("give_fire", "Fire TNT", "fire", 110007);
      placeAndCreateFunction("give_nuclear", "Nuclear TNT", "nuclear", 110008);
      placeAndCreateFunction("give_warden", "Warden TNT", "warden", 110009);
      placeAndCreateFunction("give_big", "Big TNT", "big", 110010);
      placeAndCreateFunction("give_small", "Small TNT", "small", 110011);
      placeAndCreateFunction(
        "give_knockback",
        "Knockback TNT",
        "knockback",
        110013
      );
      placeAndCreateFunction("give_jerome", "Jerome TNT", "jerome", 110014);
      placeAndCreateFunction("give_tree", "Tree TNT", "tree", 110015);
      placeAndCreateFunction("give_wolf", "Angry Wolf TNT", "wolf", 110016);
      placeAndCreateFunction("give_bees", "Angry Bees TNT", "bees", 110017);
      placeAndCreateFunction("give_honey", "Honey TNT", "honey", 110018);
      placeAndCreateFunction("give_creeper", "Creeper TNT", "creeper", 110019);
    });
});

export const handler = MCFunction("custom_tnt/handler", () => {
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "tnt.as" }))
    .at(self)
    .run(() => {
      // Cycle through all the available TNT and pick the correct handler
      explosionHandler(
        "tnt.meteor",
        100,
        () => {
          for (let i = 0; i < 40; i++) {
            particle(
              "minecraft:falling_dust",
              "minecraft:red_concrete",
              rel(Math.sin(i) * 2, 1, Math.cos(i) * 2),
              [0, 0, 0],
              0,
              1,
              "force"
            );
          }
          particle(
            "minecraft:ash",
            rel(0, 0.8, 0),
            [0.1, 0.5, 0.1],
            0.1,
            50,
            "force"
          );
        },
        () => {
          raw(
            `summon fireball ~ ~100 ~ {ExplosionPower:6b,power:[0.0,-0.3,0.0],Item:{id:"minecraft:wooden_hoe",Count:1b,tag:{CustomModelData:100001}}}`
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.snow",
        100,
        () => {
          particle(
            "minecraft:snowflake",
            rel(0, 0.8, 0),
            [0.1, 0.5, 0.1],
            0.1,
            5,
            "force"
          );
          particle(
            "minecraft:block",
            "minecraft:blue_ice",
            rel(0, 0.8, 0),
            [0, 0.2, 0],
            0,
            4,
            "force"
          );
        },
        () => {
          // Square
          // for (let i = -6; i <= 6; i += 1) {
          //   for (let j = -6; j <= 6; j += 1) {
          //     fill(
          //       rel(i, 0, j),
          //       rel(i, -4, j),
          //       `minecraft:powder_snow replace #aestd1:all_but_air`
          //     );
          //   }
          // }

          // Circle
          for (let i = 1; i <= 8; i += 1) {
            for (let j = 0; j <= 50; j += 1) {
              // setblock(
              //   rel(
              //     Math.round(Math.sin(j) * i),
              //     0,
              //     Math.round(Math.cos(j) * i)
              //   ),
              //   `minecraft:snow[layers=${randomIntFromInterval(1, 5)}]`
              // );
              fill(
                rel(
                  Math.round(Math.sin(j) * i),
                  0,
                  Math.round(Math.cos(j) * i)
                ),
                rel(
                  Math.round(Math.sin(j) * i),
                  -4,
                  Math.round(Math.cos(j) * i)
                ),
                `minecraft:powder_snow replace #aestd1:all_but_air`
              );
            }
          }
          particle(
            "minecraft:snowflake",
            rel(0, 0.5, 0),
            [8, 8, 8],
            0.1,
            5000,
            "force"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.water",
        100,
        () => {
          particle(
            "minecraft:splash",
            rel(0, 0.8, 0),
            [0.1, 0.5, 0.1],
            0.1,
            25,
            "force"
          );
          particle(
            "minecraft:falling_water",
            rel(0, 0.8, 0),
            [0.5, 0.2, 0.5],
            0.1,
            10,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(4),
            CustomName: '{"text":"TNT","italic":false}',
          });
          summon("minecraft:marker", rel(0, 0, 0), {
            Tags: ["water_hole_marker"],
          });

          schedule.function(
            () => {
              execute
                .as(
                  Selector("@e", {
                    type: "minecraft:marker",
                    tag: "water_hole_marker",
                  })
                )
                .at(self)
                .run(() => {
                  fill(
                    rel(6, -1, 6),
                    rel(-6, -6, -6),
                    "minecraft:water replace minecraft:air"
                  );
                  particle(
                    "minecraft:splash",
                    rel(0, 0.8, 0),
                    [2, 0.1, 2],
                    0.1,
                    60,
                    "force"
                  );
                  kill(self);
                });
            },
            "5t",
            "append"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ice",
        100,
        () => {
          particle(
            "minecraft:block",
            "minecraft:blue_ice",
            rel(0, 0.8, 0),
            [0, 0.2, 0],
            0,
            4,
            "force"
          );
          particle(
            "minecraft:block",
            "minecraft:ice",
            rel(0, 0.8, 0),
            [0, 0.2, 0],
            0,
            4,
            "force"
          );
        },
        () => {
          // Circle Generation
          let ice: Array<string> = ["minecraft:ice", "minecraft:blue_ice"];

          for (let i = 1; i <= 8; i += 1) {
            for (let j = 0; j <= 50; j += 1) {
              setblock(
                rel(
                  Math.round(Math.sin(j) * i),
                  -1,
                  Math.round(Math.cos(j) * i)
                ),
                `${ice[Math.floor(Math.random() * ice.length)]}`
              );
            }
          }
          particle(
            "minecraft:block",
            "minecraft:ice",
            rel(0, 0.5, 0),
            [6, 0, 6],
            0.1,
            500,
            "force"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.arrow",
        100,
        () => {
          particle(
            "minecraft:crit",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          particle(
            "minecraft:item",
            "minecraft:arrow",
            rel(0, 1.3, 0),
            [0, 0.3, 0],
            0,
            4,
            "force"
          );
        },
        () => {
          // Square Generation
          for (let i = -10; i <= 10; i += 1) {
            for (let j = -10; j <= 10; j += 1) {
              summon(
                "minecraft:arrow",
                rel(i, randomIntFromInterval(30, 40), j)
              );
              summon(
                "minecraft:arrow",
                rel(i, randomIntFromInterval(60, 70), j),
                {
                  Potion: "minecraft:poison",
                }
              );
            }
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.volcano",
        100,
        () => {
          particle(
            "minecraft:block",
            "minecraft:magma_block",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          particle(
            "minecraft:flame",
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            4,
            "force"
          );
        },
        () => {
          // Circle Generation
          let volcanicBlocks: Array<string> = [
            "minecraft:magma_block",
            "minecraft:netherrack",
          ];

          for (let i = -10; i <= 10; i += 1) {
            for (let j = -10; j <= 10; j += 1) {
              fill(
                rel(i, -1, j),
                rel(i, -6, j),
                `${
                  volcanicBlocks[
                    Math.floor(Math.random() * volcanicBlocks.length)
                  ]
                } replace #aestd1:all_but_air`
              );
            }
          }

          for (let i = 0; i <= 10; i += 1) {
            // summon("minecraft:tnt", rel(Math.sin(i), 0.5, Math.cos(i)), {
            //   Fuse: 40,
            // });
            summon("minecraft:tnt", rel(Math.sin(i), 0.2, Math.cos(i)), {
              Fuse: 20,
            });
            summon("minecraft:tnt", rel(Math.sin(i), 0.8, Math.cos(i)), {
              Fuse: 20,
            });
          }

          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(3),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.gravity",
        100,
        () => {
          particle(
            "minecraft:portal",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          particle(
            "minecraft:reverse_portal",
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            4,
            "force"
          );
        },
        () => {
          spreadplayers(
            rel(0, 0),
            2,
            6,
            false,
            Selector("@e", {
              type: "#aestd1:living_base",
              distance: [Infinity, 50],
              limit: 15,
              sort: "nearest",
            })
          );
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 1,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(10),
            CustomName: '{"text":"TNT","italic":false}',
          });
          particle(
            "minecraft:portal",
            rel(0, 0.8, 0),
            [3, 3, 3],
            0,
            2000,
            "force"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ghost",
        100,
        () => {
          particle(
            "minecraft:block",
            "minecraft:black_concrete",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          // @ts-ignore
          particle(
            "minecraft:dust",
            [0, 0, 0],
            1,
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            4,
            "force"
          );
        },
        () => {
          summon("minecraft:block_display", rel(0, 0, 0), {
            transformation: {
              left_rotation: [
                NBT.float(0),
                NBT.float(0),
                NBT.float(0),
                NBT.float(1),
              ],
              right_rotation: [
                NBT.float(0),
                NBT.float(0),
                NBT.float(0),
                NBT.float(1),
              ],
              translation: [NBT.float(-2.5), NBT.float(0), NBT.float(-2.5)],
              scale: [NBT.float(5), NBT.float(5), NBT.float(5)],
            },
            block_state: { Name: "minecraft:black_concrete" },
            Tags: ["ghost_block_display"],
          });
          playsound(
            "minecraft:ambient.crimson_forest.mood",
            "master",
            "@a",
            rel(0, 0, 0)
          );
          schedule.function(
            () => {
              execute
                .as(
                  Selector("@e", {
                    type: "minecraft:block_display",
                    tag: "ghost_block_display",
                  })
                )
                .at(self)
                .run(() => {
                  kill(self);
                  particle(
                    // @ts-ignore
                    "minecraft:dust",
                    [0, 0, 0],
                    1,
                    rel(0, 0.8, 0),
                    [3, 3, 3],
                    0.1,
                    5000
                  );
                });
            },
            "5s",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ender",
        100,
        () => {
          particle(
            "minecraft:crimson_spore",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          particle(
            "minecraft:reverse_portal",
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            4,
            "force"
          );
        },
        () => {
          spreadplayers(
            rel(0, 0),
            5,
            20,
            false,
            Selector("@e", {
              type: "#aestd1:living_base",
              sort: "nearest",
              distance: [Infinity, 8],
            })
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.inverted",
        100,
        () => {
          particle(
            // @ts-ignore
            "minecraft:sonic_boom",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            1,
            "force"
          );
          particle(
            "minecraft:angry_villager",
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            1,
            "force"
          );
        },
        () => {
          summon("minecraft:marker", rel(0, 0, 0), {
            Tags: ["inverted_tnt_anchor"],
          });
          for (let i = 0; i <= 10; i += 1) {
            summon("minecraft:armor_stand", rel(Math.sin(i), 0, Math.cos(i)), {
              Tags: ["block_placer_aS_0", "block_placer"],
              Invisible: NBT.byte(1),
            });
            summon(
              "minecraft:armor_stand",
              rel(Math.sin(i), 0.5, Math.cos(i)),
              {
                Tags: ["block_placer_aS_30", "block_placer"],
                Invisible: NBT.byte(1),
              }
            );
            summon(
              "minecraft:armor_stand",
              rel(Math.sin(i), 1.5, Math.cos(i)),
              {
                Tags: ["block_placer_aS_60", "block_placer"],
                Invisible: NBT.byte(1),
              }
            );
          }
          execute
            .as(
              Selector("@e", {
                type: "minecraft:armor_stand",
                tag: "block_placer",
              })
            )
            .at(self)
            .run(() => {
              execute
                .facingEntity(
                  Selector("@e", {
                    type: "minecraft:marker",
                    tag: "inverted_tnt_anchor",
                  }),
                  "feet"
                )
                .run(() => {
                  tp(rel(0, 0, 0));
                });
              for (let i = 0; i < 13; i++) {
                tpAhead();
              }
              kill(self);
            });
        },
        null,
        null
      );

      // CustomTNT 0 Pack Merged
      explosionHandler(
        "tnt.5x",
        100,
        () => {
          particle(
            "minecraft:flame",
            rel(0, 0, 0),
            [0.2, 0.2, 0.2],
            0.1,
            10,
            "force"
          );
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
      explosionHandler(
        "tnt.10x",
        100,
        () => {
          particle(
            "minecraft:flame",
            rel(0, 0, 0),
            [0.3, 0.3, 0.3],
            0.1,
            10,
            "force"
          );
          raw(
            `particle dust 0.973 1.000 0.169 1 ~ ~0.8 ~ 0.5 0.5 0.5 1 10 force`
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(10),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.20x",
        100,
        () => {
          particle(
            "minecraft:flame",
            rel(0, 0, 0),
            [0.5, 0.5, 0.5],
            0.1,
            15,
            "force"
          );
          raw(`particle end_rod ~ ~1 ~ 0 0 0 0.1 1 force`);
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(15),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.house",
        100,
        () => {
          raw(
            `particle dust 0.302 0.722 1.000 1 ~0.3 ~0.8 ~0.3 0 0.5 0 0.2 15 force`
          );
          raw(
            `particle dust 0.302 0.722 1.000 1 ~-0.3 ~0.8 ~-0.3 0 0.5 0 0.2 15 force`
          );
          raw(
            `particle dust 0.302 0.722 1.000 1 ~0.3 ~0.8 ~-0.3 0 0.5 0 0.2 15 force`
          );
          raw(
            `particle dust 0.302 0.722 1.000 1 ~-0.3 ~0.8 ~0.3 0 0.5 0 0.2 15 force`
          );
        },
        () => {
          let markerTag: string = "house.marker";
          let houses: string[] = [
            "plains_armorer_house_1",
            "plains_butcher_shop_1",
            "plains_fletcher_house_1",
            "plains_masons_house_1",
            "plains_medium_house_2",
            "plains_small_house_1",
            "plains_tool_smith_1",
            "plains_weaponsmith_1",
          ];

          // Spawn and spread the house marker
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Tags: [markerTag, "house"],
          });

          // Spawn the house
          execute
            .as(
              Selector("@e", { type: "minecraft:armor_stand", tag: markerTag })
            )
            .at(self)
            .run(() => {
              raw(`particle minecraft:wax_on ~ ~ ~ 3 3 3 0 5000 force`);
              _.if(Selector("@s", { tag: "house" }), () => {
                setblock(
                  rel(0, -2, 0),
                  b("minecraft:structure_block[mode=load]", {
                    name: `houses/${houses[4]}`,
                    rotation: "NONE",
                    mirror: "NONE",
                    mode: "LOAD",
                    posX: -4,
                    posY: 2,
                    posZ: -5,
                  }),
                  "replace"
                );
                setblock(rel(0, -3, 0), "minecraft:redstone_block", "replace");
                kill(self);
              });
            });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.animals",
        100,
        () => {
          particle(
            "minecraft:cloud",
            rel(0, 1, 0),
            [0.1, 0.5, 0.1],
            0.1,
            15,
            "force"
          );
        },
        () => {
          for (let i = 0; i < 25; i++) {
            summon("minecraft:zombie", rel(0, 0, 0), {
              Tags: ["tnt.zombie"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
            summon("minecraft:creeper", rel(0, 0, 0), {
              Tags: ["tnt.creeper"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
            summon("minecraft:skeleton", rel(0, 0, 0), {
              Tags: ["tnt.skeleton"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
              HandItems: [{ id: "minecraft:bow", Count: NBT.byte(1) }, {}],
            });
            summon("minecraft:blaze", rel(0, 0, 0), {
              Tags: ["tnt.blaze"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
            summon("minecraft:enderman", rel(0, 0, 0), {
              Tags: ["tnt.enderman"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
            summon("minecraft:stray", rel(0, 0, 0), {
              Tags: ["tnt.stray"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
              HandItems: [{ id: "minecraft:bow", Count: NBT.byte(1) }, {}],
            });
            summon("minecraft:husk", rel(0, 0, 0), {
              Tags: ["tnt.husk"],
              Motion: [
                Math.random().toFixed(2),
                Math.random().toFixed(2),
                Math.random().toFixed(2),
              ],
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.lightning",
        100,
        () => {
          particle("minecraft:flash", rel(0, 1, 0), [1, 1, 1], 0, 2, "force");
        },
        () => {
          summon("minecraft:marker", rel(0, 0, 0), {
            Invisible: NBT.byte(1),
            Tags: ["lightning.marker"],
          });
          schedule.function(
            MCFunction("custom_tnt/auxillary/schedule_kill", () => {
              kill(
                Selector("@e", {
                  type: "minecraft:marker",
                  tag: "lightning.marker",
                })
              );
            }),
            "300t",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.fire",
        100,
        () => {
          particle(
            "minecraft:smoke",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            20,
            "force"
          );
        },
        () => {
          raw(
            `fill ~10 ~10 ~10 ~-10 ~-10 ~-10 minecraft:fire replace minecraft:air`
          );
          particle("minecraft:explosion", rel(0, 0, 0), [5, 5, 5], 0, 6_000);
        },
        null,
        null
      );
      explosionHandler(
        "tnt.nuclear",
        100,
        () => {
          particle(
            "minecraft:crimson_spore",
            rel(0, 0.8, 0),
            [0, 0, 0],
            0,
            20,
            "force"
          );
          particle(
            "minecraft:soul_fire_flame",
            rel(0, 0.8, 0),
            [0, 0, 0],
            0.1,
            5,
            "force"
          );
          raw(`particle angry_villager ~ ~1 ~ 0.5 0.5 0.5 1 1 force`);
        },
        () => {
          for (let i = -3; i <= 3; i++) {
            for (let j = -3; j <= 3; j++) {
              raw(
                `summon fireball ~${i * 10} ~-0.8 ~${
                  j * 10
                } {ExplosionPower:100b,power:[0.0,-1.0,0.0], CustomName: '{"text":"TNT","italic":false}',}`
              );
            }
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.warden",
        100,
        () => {
          raw(
            `particle falling_dust black_concrete ~ ~0.8 ~ 0.5 0.5 0.5 1 10 normal`
          );
          particle(
            "minecraft:smoke",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            20,
            "force"
          );
          raw(`particle sonic_boom ~ ~1 ~ 0.5 0.5 0.5 1 1 force`);
        },
        () => {
          summon("minecraft:warden", rel(0, 0, 0), {
            Brain: {
              memories: {
                '"minecraft:dig_cooldown"': { ttl: NBT.long(1200), value: {} },
                '"minecraft:is_emerging"': { ttl: NBT.long(134), value: {} },
              },
            },
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.big",
        100,
        () => {
          particle(
            "minecraft:cloud",
            rel(0, 1.2, 0),
            [0.2, 0.2, 0.2],
            0.1,
            5,
            "force"
          );
          particle(
            "minecraft:smoke",
            rel(0, 1.2, 0),
            [0.2, 0.2, 0.2],
            0.1,
            10,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(14),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.small",
        100,
        () => {
          particle(
            "minecraft:cloud",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            2,
            "force"
          );
          particle(
            "minecraft:smoke",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            5,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(2),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        () => {
          data.merge.entity(self, {
            ArmorItems: [
              {},
              {},
              {},
              {
                id: "minecraft:endermite_spawn_egg",
                Count: NBT.byte(1),
                tag: { CustomModelData: 110012 },
              },
            ],
          });
        },
        null
      );
      explosionHandler(
        "tnt.knockback",
        100,
        () => {
          particle(
            "minecraft:reverse_portal",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.1,
            10,
            "force"
          );
          particle(
            "minecraft:poof",
            rel(0, 0.8, 0),
            [0.2, 0.2, 0.2],
            0.5,
            2,
            "force"
          );
        },
        () => {
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Marker: NBT.byte(1),
            Tags: ["pushback.aS"],
          });
          pushBackApi();
        },
        null,
        null
      );
      explosionHandler(
        "tnt.jerome",
        100,
        () => {
          raw(
            `particle minecraft:block brown_concrete ~ ~0.8 ~ 0.3 0.3 0.3 1 15 force`
          );
          raw(
            `particle minecraft:block blue_concrete ~ ~0.8 ~ 0.3 0.3 0.3 1 15 force`
          );
        },
        () => {
          for (let i = 0; i < 15; i++) {
            summon("minecraft:zombie", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              CustomName: '{"text":"Jerome"}',
              DeathLootTable: "minecraft:bat",
              Silent: NBT.byte(1),
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.tree",
        100,
        () => {
          raw(
            `particle minecraft:block oak_leaves ~ ~0.8 ~ 0.3 0.3 0.3 1 5 force`
          );
          raw(
            `particle minecraft:block dark_oak_leaves ~ ~0.8 ~ 0.3 0.3 0.3 1 5 force`
          );
          raw(
            `particle minecraft:block birch_leaves ~ ~0.8 ~ 0.3 0.3 0.3 1 5 force`
          );
        },
        () => {
          for (let i = 0; i < 4; i++) {
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: ["tree.as", "tree.oak"],
              Invisible: NBT.byte(1),
            });
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: ["tree.as", "tree.birch"],
              Invisible: NBT.byte(1),
            });
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: ["tree.as", "tree.dark_oak"],
              Invisible: NBT.byte(1),
            });
            summon("minecraft:armor_stand", rel(0, 0, 0), {
              Tags: ["tree.as", "tree.acacia"],
              Invisible: NBT.byte(1),
            });
          }
          spreadplayers(
            rel(0, 0),
            4,
            13,
            false,
            Selector("@e", { type: "minecraft:armor_stand", tag: "tree.as" })
          );
          execute
            .as(
              Selector("@e", { type: "minecraft:armor_stand", tag: "tree.as" })
            )
            .at(self)
            .run(() => {
              execute.if
                .entity(Selector("@s", { tag: ["tree.oak"] }))
                .run.raw(`place feature minecraft:oak`);
              execute.if
                .entity(Selector("@s", { tag: ["tree.dark_oak"] }))
                .run.raw(`place feature minecraft:dark_oak`);
              execute.if
                .entity(Selector("@s", { tag: ["tree.birch"] }))
                .run.raw(`place feature minecraft:birch`);
              execute.if
                .entity(Selector("@s", { tag: ["tree.acacia"] }))
                .run.raw(`place feature minecraft:acacia`);
              kill(self);
            });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.wolf",
        100,
        () => {
          raw(
            `particle minecraft:angry_villager ~ ~0.8 ~ 0.3 0.3 0.3 1 4 force`
          );
        },
        () => {
          gamerule("universalAnger", true);
          for (let i = 0; i < 15; i++) {
            summon("minecraft:wolf", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              AngerTime: 19999980,
              DeathLootTable: "minecraft:bat",
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.bees",
        100,
        () => {
          raw(
            `particle minecraft:block honey_block ~ ~0.8 ~ 0.3 0.3 0.3 1 4 force`
          );
          raw(
            `particle minecraft:falling_nectar ~ ~0.8 ~ 0.3 0.3 0.3 1 20 force`
          );
        },
        () => {
          gamerule("universalAnger", true);
          for (let i = 0; i < 20; i++) {
            summon("minecraft:bee", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              AngerTime: 19999980,
              DeathLootTable: "minecraft:bat",
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.honey",
        100,
        () => {
          raw(
            `particle minecraft:block honey_block ~ ~0.8 ~ 0.3 0.3 0.3 1 2 force`
          );
          raw(
            `particle minecraft:falling_honey ~ ~0.8 ~ 0.5 0.5 0.5 1 4 force`
          );
        },
        () => {
          raw(
            `fill ~-5 ~-5 ~-5 ~5 ~5 ~5 minecraft:honey_block replace #aestd1:all_but_air`
          );
          // fill(rel(-6, -6, -6), rel(6, 6, 6), "minecraft:honey_block");
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.creeper",
        100,
        () => {
          raw(
            `particle minecraft:ambient_entity_effect ~ ~0.8 ~ 0.1 0.1 0.1 1 10 force`
          );
        },
        () => {
          for (let i = 0; i < 20; i++) {
            summon("minecraft:creeper", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              DeathLootTable: "minecraft:bat",
            });
          }
          for (let i = 0; i < 5; i++) {
            summon("minecraft:creeper", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              DeathLootTable: "minecraft:bat",
              powered: NBT.byte(1),
            });
          }
        },
        null,
        null
      );
    });
});
