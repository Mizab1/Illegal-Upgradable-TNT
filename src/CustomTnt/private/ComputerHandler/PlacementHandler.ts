// summon item_display ~ ~ ~ {item_display:"head",item:{id:"minecraft:endermite_spawn_egg",Count:1b,tag:{CustomModelData:100001}}}

import { NBT, Selector, SelectorClass, _, execute, kill, rel, summon } from "sandstone";
import { self } from "../../../Tick";

const laptopSpawnerEntity: SelectorClass<false, false> = Selector("@e", {
  type: "minecraft:endermite",
  tag: "tnt.laptop.spawner",
});

export const placementHandler = () => {
  // Check if the laptop spawner is spawned
  execute
    .as(laptopSpawnerEntity)
    .at(self)
    .run(() => {
      // Summon laptop item display
      summon("minecraft:item_display", rel(0, 0, 0), {
        Tags: ["tnt.laptop.display"],
        item_display: "head",
        item: {
          id: "minecraft:endermite_spawn_egg",
          Count: NBT.byte(1),
          tag: {
            CustomModelData: 100001,
          },
        },
      });

      // Summon the interaction entity
      summon("minecraft:interaction", rel(0, 0, 0), {
        width: NBT.byte(1),
        height: NBT.byte(1),
        response: NBT.byte(1),
        Tags: ["tnt.laptop.interaction"],
      });

      // Kill the spawner entity (self)
      kill(self);
    });
};
