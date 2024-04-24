import { MCFunction, NBT, give } from "sandstone";
import { self } from "../../../Tick";
import { i } from "../../../Utils/Functions";

const giveLaptopSpawner = MCFunction("items/give_laptop", () => {
  give(
    self,
    i("minecraft:endermite_spawn_egg", {
      CustomModelData: 100001,
      EntityTag: { Silent: NBT.byte(1), NoAI: NBT.byte(1), Tags: ["tnt.laptop.spawner"] },
      display: {
        Name: `{"text":"Laptop","color":"green","italic":false}`,
      },
    })
  );
});
